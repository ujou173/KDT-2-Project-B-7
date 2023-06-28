import React from 'react';
import Canvas from '../canvas/canvas'
import './main.css'

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <div className="main">
      <Canvas />
    </div>
  )
}
export default Main;