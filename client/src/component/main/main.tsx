import React from 'react';
import Canvas from '../canvas/canvas';
import Chat from '../chat/chat';
import StatusBar from '../statusBar/statueBar'
import './main.css';

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <div className="main">
      <Canvas />
      {/* <Chat /> */}
      {/* <StatusBar /> */}
    </div>
  )
}
export default Main;