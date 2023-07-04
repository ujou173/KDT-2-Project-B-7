import React, { ChangeEvent } from 'react';
import './chat.css';
import { useLocation } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { v4 } from 'uuid'

interface ChatProps {
  isChat: boolean
}
const Chat: React.FC<ChatProps> = ({isChat}) => {

  const chatSocket = React.useRef<Socket | null>(null);
  const nickName = React.useRef<string>(useLocation().state.nickName);
  const chatBox = React.useRef<HTMLDivElement>(null)
  const chat = React.useRef<HTMLDivElement>(null);
  const [ chatMSG, setChatMSG ] = React.useState<string>('');
  const [ MSGLog, setMSGLog ] = React.useState<{id: string, msg: string, sender: string}[]>([]);

  // chat socket connect
  React.useEffect(()=>{
    chatSocket.current = io('/chat')
    
    // cleant-up code
    return () => {
      chatSocket.current?.emit('outConnect', 'outChat')
    }
  }, [])

  // enter socket server
  React.useEffect(()=>{
    if (!chatSocket.current) return;
    chatSocket.current.emit('enterUser', nickName.current);
  }, [])

  // chat socket event
  React.useEffect(()=>{
    // enter user event
    chatSocket.current?.on('enterUser', (log: {id: string, msg: string, sender: 'server'}) => {
      setMSGLog((prevMSG: {id: string, msg: string, sender: string}[]) => [...prevMSG, log])
    })

    // exit user event
    chatSocket.current?.on('exitUser', (log: {id: string, msg: string, sender: 'server'}) => {
      setMSGLog((prevMSG: {id: string, msg: string, sender: string}[]) => [...prevMSG, log])
    })

    // chatting event
    chatSocket.current?.on('chat', (data: { id: string, msg: string, sender: string }) => {
      setMSGLog((prevMSG: { id: string, msg: string, sender: string }[]) => [...prevMSG, data])
    })

    // clean-up code
    return () => {
      chatSocket.current?.removeAllListeners('chat');
      chatSocket.current?.removeAllListeners('enterUser');
      chatSocket.current?.removeAllListeners('exitUser');
    }
  }, [chatSocket.current, setMSGLog])

  // chatBox auto scroll
  React.useEffect(()=>{
    if (chatBox.current) {
      chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }
  }, [chatBox.current?.children.length])

  // chat send event
  const sendMSG = React.useCallback(()=>{
    if (!chatSocket.current) return;
    chatSocket.current.emit('chat', {id: v4(), msg: chatMSG, sender: nickName.current});
  }, [chatMSG])

  // handle event
  function handleChatValue(e: React.ChangeEvent<HTMLInputElement>) {
    setChatMSG(e.target.value);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (chatMSG !== '') {
      sendMSG();
      setChatMSG('');
    }
  }

  // chat toggle
  React.useEffect(()=>{
    if (!isChat && chat.current) {
      chat.current.style.right = '-100%'
      chat.current.style.transition = '0.5s cubic-bezier(0, 0.85, 0.49, 1.02) 0s'
    } else if (isChat && chat.current) {
      chat.current.style.right = '0'
    }
  }, [isChat])

  return (
    <div className='chat' ref={chat}>
      <div><h1>Chat</h1></div>
      <div>
        <div className='chatBox' ref={chatBox}>
          {MSGLog.map((element: {id: string, msg: string, sender: string}) => {
            if (element.sender === nickName.current) {
              return (
                <div  key={element.id} className='myChat'>
                  <p>{element.msg}</p>
                </div>
              )
            } else if (element.sender === 'server') {
              return (
                <div  key={element.id} className='serverChat'>
                  <p>{element.msg}</p>
                </div>
              )
            } else {
              return (
                <div key={element.id} className='otherChat'>
                  <h4>{element.sender}</h4>
                  <p>{element.msg}</p>
                </div>
              )
            }
          })}
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type='text' onChange={handleChatValue} placeholder='채팅 입력' value={chatMSG} />
          <input type='submit' value='전송' />
        </form>
      </div>
    </div>
  )
}
export default Chat;