import React from 'react';
import './chat.css'

interface ChatProps {
  isChat: boolean
}
const Chat: React.FC<ChatProps> = ({isChat}) => {
  const chat = React.useRef<HTMLDivElement>(null)
  React.useEffect(()=>{
    // if (!isChat && chat.current) {
      // chat.current.style.display = 'none'
    // } else if (isChat && chat.current) {
      // chat.current.style.display = 'block'
    // }
  }, [isChat])
  return (
    <div className='chat' ref={chat}>

    </div>
  )
}
export default Chat;