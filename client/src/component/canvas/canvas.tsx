import React, { ReactNode, useContext } from 'react';
import './canvas.css'
import { Player } from './character/character'
import { field } from './field/field'
import { keydownHandler, keyupHandler } from './event/keyboard'
import { io, Socket } from 'socket.io-client'
import { useLocation, Location, useNavigate, NavigateFunction } from 'react-router-dom'

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
  const nickName = React.useRef<string>(useLocation().state.nickName);
  const serverSocketRef = React.useRef<Socket | null>(null);
  const moveSocketRef = React.useRef<Socket | null>(null);
  const [ color ] = React.useState<string>(useLocation().state.color);
  const [ ctx, setCtx ] = React.useState<CanvasRenderingContext2D | null>(null)
  const [ user, setUser ] = React.useState<Player | null>(null);
  const [ onlineUser, setOnlineUser ] = React.useState<onlinePlayer[]>([]);
  
  // function
  // serverSocket connect
  React.useEffect(()=>{
    serverSocketRef.current = io();
    moveSocketRef.current = io('/character-move');
    return ()=>{
      serverSocketRef.current?.emit('outConnect', 'outCanvas')
      moveSocketRef.current?.emit('outConnect', 'outCanvas')
    }
  }, [])

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
    if (canvasElement.current === null || ctx === null || moveSocketRef.current === null) return;
    setUser(new Player({
      canvas: canvasElement.current,
      ctx: ctx,
      position: {
        x: 0,
        y: 0
      },
      color,
      moveSocket: moveSocketRef.current
    }))
  }, [ctx])

  // Player online
  React.useEffect(()=>{
    if (user === null) return;
    serverSocketRef.current?.emit('enterUser', {id: nickName.current, position: user.position});
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
          element.info.multiPlayer();
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
  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp