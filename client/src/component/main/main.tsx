import React from 'react';
import Canvas from '../canvas/canvas';
import Chat from '../chat/chat';
import StatusBar from '../statusBar/statueBar'
import './main.css';

interface Props {}

const Main: React.FC<Props> = () => {
  const [ isChat, setIsChat ] = React.useState<boolean>(false);

  return (
    <div className="main">
      <Canvas isChat={isChat} />
      <Chat isChat={isChat} />
      <StatusBar isChat={isChat} setIsChat={setIsChat} />
    </div>
  )
}
export default Main;