import React, { ReactNode, useContext } from 'react';
import './canvas.css'
import { UserCharacter } from './character/userCharacter'
import { MultiplayerUser } from './character/multiplayer'
import { MultiplayerData } from './character/charType';
import { field } from './field/field'
import { keydownHandler, keyupHandler } from './event/keyboard'
import { io, Socket } from 'socket.io-client'
import { useLocation, Location, useNavigate, NavigateFunction } from 'react-router-dom'

// type
interface Props {};

// component
const canvasComp: React.FC<Props> = () => {
  // variable management
  const canvasElement = React.useRef<HTMLCanvasElement>(null);
  const nickName = React.useRef<string>(useLocation().state.nickName);
  const color = React.useRef<string>(useLocation().state.color);
  const serverSocketRef = React.useRef<Socket | null>(null);
  const moveSocketRef = React.useRef<Socket | null>(null);
  const [ onlineUsers, setOnlineUsers ] = React.useState<MultiplayerUser[]>([]);
  const [ ctx, setCtx ] = React.useState<CanvasRenderingContext2D | null>(null)
  const [ user, setUser ] = React.useState<UserCharacter | null>(null);

  // socket connect ================================================

  React.useEffect(()=>{
    serverSocketRef.current = io();
    moveSocketRef.current = io('/character-move');
    return ()=>{
      serverSocketRef.current?.emit('outConnect', 'outCanvas')
      moveSocketRef.current?.emit('outConnect', 'outCanvas')
    }
  }, [])

  // ===============================================================




  // canvas setup ===========================================

  // create context
  React.useEffect(()=>{
    if (canvasElement.current === null) return;
    setCtx(canvasElement.current.getContext('2d'));
  }, [canvasElement.current])

  // field
  React.useEffect(()=>{
    if (canvasElement.current === null || ctx === null) return;
    field(canvasElement.current, ctx);
  }, [ctx])

  // ===================================================================




  // user ==============================================================

  // init my character
  React.useEffect(()=>{
    if (canvasElement.current === null || ctx === null || moveSocketRef.current === null) return;
    setUser(new UserCharacter({
      canvas: canvasElement.current,
      ctx,
      id: nickName.current,
      position: {
        x: 0,
        y: 0
      },
      color: color.current,
      moveSocket: moveSocketRef.current
    }))
  }, [ctx])

  // create multiplayer user
  const newMuiltiCharacter: (payload: MultiplayerData) => MultiplayerUser | undefined = React.useCallback((payload)=>{
    console.log('페이로드 : ', payload);
    console.log(`내가 보이면 실행된거야 캔버스 : ${canvasElement.current}, ctx: ${ctx}`)
    if (canvasElement.current === null || ctx === null) return;
    console.log('내가 보이면 성공했을까?')
    return new MultiplayerUser({
      canvas: canvasElement.current,
      ctx,
      id: payload.id,
      color: payload.color,
      position: payload.position
    });
  }, [canvasElement, ctx])

  // get users
  // const getUsers = React.useCallback(()=>{
  //   console.log(onlineUsers);
  // }, [])
  React.useEffect(()=>{
    console.log(onlineUsers);
  }, [onlineUsers])

  // ==================================================================




  // animation ==========================================================

  React.useEffect(()=>{
    const animation: () => void = function() {
      requestAnimationFrame(animation);
      if (canvasElement.current === null || ctx === null || user === null) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasElement.current.width, canvasElement.current.height);
      user.update()
      
      // multiplayer
      if (onlineUsers.length > 0) {
        onlineUsers.forEach((element: MultiplayerUser) => {
          element.update();
        })
      }
    }
    animation();
  }, [user])

  // ======================================================================




  // event management =======================================================

  // keyboard event
  React.useEffect(()=>{
    if (user === null) return;
    addEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
    addEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    return (): void=>{
      removeEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
      removeEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    }
  }, [user])

  // Player online
  React.useEffect(()=>{
    if (user === null) return;
    serverSocketRef.current?.emit('enterUser', {id: nickName.current, position: user.position, color: color.current});
  }, [user])

  // socket event
  React.useEffect(()=>{
    // enter user
    serverSocketRef.current?.on('enterUser', (payload: MultiplayerData) => {
      console.log('누군가 들어왔다');
      const newUser: MultiplayerUser | undefined = newMuiltiCharacter(payload);
      if (newUser) {
      //   let updateArray: MultiplayerUser[]
      //   if (onlineUsers.length === 0) {
      //     updateArray = [newUser]
      //   } else {
      //     updateArray = [...onlineUsers, newUser]
      //   };
      //   setOnlineUsers(updateArray);
        setOnlineUsers(prevUsers => [...prevUsers, newUser])
      }
    });

    // muliplayer
    // React.useEffect(()=>{
      // moveSocketRef.current?.on('moveCharacter')
    // })

    // clean-up event
    return () => {
      serverSocketRef.current?.removeAllListeners('enterUser');
    }
  }, [])

  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
      {/* <button onClick={getUsers}>누구 있어</button> */}
    </>
  )
}

export default canvasComp