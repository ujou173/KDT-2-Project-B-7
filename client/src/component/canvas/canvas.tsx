import React, { ReactNode, useContext } from 'react';
import './canvas.css'
import { Player } from './character/character'
import { field } from './field/field'
import { keydownHandler, keyupHandler } from './event/keyboard'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../index'

// component
interface Props {};
const canvasComp: React.FC<Props> = () => {
  // variable management
  const canvasElement = React.useRef<HTMLCanvasElement>(null);
  const [ ctx, setCtx ] = React.useState<CanvasRenderingContext2D | null>(null)
  const [ user, setUser ] = React.useState<Player | null>(null);
  const { chatSocket, moveSocket }: {chatSocket: Socket, moveSocket: Socket} = useContext(SocketContext)
  
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
      moveSocket,
      chatSocket
    }))
  }, [ctx])

  // animation
  React.useEffect(()=>{
    const animation: () => void = function() {
      requestAnimationFrame(animation);
      if (canvasElement.current === null || ctx === null || user === null) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasElement.current.width, canvasElement.current.height);
      user.update()
    }
    animation();
  }, [user])

  // test
  const eventSubmit = React.useCallback(()=>{
    if (user === null) return;
    moveSocket.emit('enterUser', {x: user.position.x, y:user.position.y})
  }, [user])
  const listenEnterUser: (data:string) => void = React.useCallback((data: string)=>{
    console.log(data);
  }, [user])

  // event management
  React.useEffect(()=>{
    if (user === null) return;
    addEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
    addEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    moveSocket.on('enterUser', listenEnterUser)
    return (): void=>{
      removeEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
      removeEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    }
  }, [user])

  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
      <button onClick={eventSubmit}>위치 전송</button>
    </>
  )
}

export default canvasComp