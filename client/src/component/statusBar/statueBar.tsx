import React, { SetStateAction } from 'react';
import './statusBar.css'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

interface StatusBarProps {
  isChat: boolean,
  setIsChat: React.Dispatch<SetStateAction<boolean>>
}
const StatusBar: React.FC<StatusBarProps> = ({isChat, setIsChat}) => {
  const color = React.useRef<string>(useLocation().state.color);
  const nickName = React.useRef<string>(useLocation().state.nickName);
  const navigate = React.useRef<NavigateFunction>(useNavigate())
  const chatToggle = React.useState<boolean>(true);
  const chat = document.querySelector('.chat');

  const toggleChat = React.useCallback(()=>{
    setIsChat(!isChat);
  }, [isChat])

  React.useEffect(()=>{
    if (chat) {
      if (isChat) {
        chat.classList.add('active');
      } else {
        chat.classList.remove('active');
      }
    }
  }, [isChat])

  return (
    <div className='statusBar'>
      <div className='userInfo'>
        <div className='characterColor' style={{backgroundColor: color.current}}></div>
        <div className='nickname' style={{border: '3px solid '+color.current}}>{nickName.current}</div>
      </div>
      <div className='button'>
        <button onClick={toggleChat}>채팅</button>
        <button onClick={()=>{navigate.current('/')}}>나가기</button>
      </div>
    </div>
  )
}
export default StatusBar;