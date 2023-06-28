import React, { ReactNode, useContext } from 'react';
import './canvas.css'
import { Player } from './character/character'
import { field } from './field/field'
import { keydownHandler, keyupHandler } from './event/keyboard'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../App'
import { useLocation, Location } from 'react-router-dom'

// type
interface Props {};
interface onlinePlayer {
  id: string,
  info: Player
}

// component
const canvasComp: React.FC<Props> = () => {
  // variable management
  const canvasElement = React.useRef<HTMLCanvasElement>(null);
  const [ nickName ] = React.useState<string>(useLocation().state.nickName);
  const [ color ] = React.useState<string>(useLocation().state.color);
  const [ ctx, setCtx ] = React.useState<CanvasRenderingContext2D | null>(null)
  const [ user, setUser ] = React.useState<Player | null>(null);
  const { chatSocket, moveSocket, serverSocket } = useContext(SocketContext)
  const [ onlineUser, setOnlineUser ] = React.useState<onlinePlayer[]>([]);
  
  // function
  // canvas.context setup
  React.useEffect(()=>{
    if (canvasElement.current === null) return;
    setCtx(canvasElement.current.getContext('2d'));
  }, [canvasElement.current])

  // field
  React.useEffect(()=>{
    if (canvasElement.current === null || ctx === null) return;
    field(canvasElement.current, ctx);
  }, [ctx])

  // new Player setup
  React.useEffect(()=>{
    if (canvasElement.current === null || ctx === null) return;
    setUser(new Player({
      canvas: canvasElement.current,
      ctx: ctx,
      position: {
        x: 0,
        y: 0
      },
      color,
      moveSocket
    }))
  }, [ctx])

  // Player online
  React.useEffect(()=>{
    if (user === null) return;
    serverSocket.emit('enterUser', {id: nickName, info: user.position});
  }, [user])

  // test
  React.useEffect(()=>{
    serverSocket.on('enterUserResult', data => {
      console.log(data)
      if (data === 'success') {
        serverSocket.emit('getOnline', '줘')
        serverSocket.on('getOnline', _data => {
          console.log(_data)
        })
      }
    })
    return ()=>{
      serverSocket.removeAllListeners('enterUserResult')
      serverSocket.removeAllListeners('getOnline')
    }
  }, [user])

  // animation
  React.useEffect(()=>{
    const animation: () => void = function() {
      requestAnimationFrame(animation);
      if (canvasElement.current === null || ctx === null || user === null) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasElement.current.width, canvasElement.current.height);
      user.update()

      // multiplayer
      if (onlineUser.length > 0) {
        onlineUser.forEach((element: onlinePlayer) => {
          element.info.update();
        })
      }
    }
    animation();
  }, [user])

  // event management
  React.useEffect(()=>{
    if (user === null) return;
    addEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
    addEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    return (): void=>{
      removeEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
      removeEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    }
  }, [user])

  serverSocket.on('disconnect', ()=>{
    serverSocket.emit('outUser', nickName);
  })
  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp