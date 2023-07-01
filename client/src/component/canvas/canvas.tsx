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
  const navigate: NavigateFunction = useNavigate();
  const canvasElement = React.useRef<HTMLCanvasElement>(null);
  const nickName = React.useRef<string>(useLocation().state.nickName);
  const color = React.useRef<string>(useLocation().state.color);
  const serverSocketRef = React.useRef<Socket | null>(null);
  const moveSocketRef = React.useRef<Socket | null>(null);
  const [ onlineUsers, setOnlineUsers ] = React.useState<{[nickName: string] : MultiplayerUser}>({});
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
    if (canvasElement.current === null || ctx === null) return;
    return new MultiplayerUser({
      canvas: canvasElement.current,
      ctx,
      id: payload.id,
      color: payload.color,
      position: payload.position
    });
  }, [ctx])

  // ==================================================================




  // animation ==========================================================

  React.useEffect(()=>{
    const animation: () => void = function() {
      requestAnimationFrame(animation);
      if (canvasElement.current === null || ctx === null || user === null) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasElement.current.width, canvasElement.current.height);
      
      // multiplayer
      if (Object.keys(onlineUsers).length > 0) {
        Object.values(onlineUsers).forEach((element: MultiplayerUser): void => {
          element.update();
        })
      }

      // user player
      user.update()
    }
    animation();
  }, [user, onlineUsers])

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
    moveSocketRef.current?.emit('enterUser', {id: nickName.current, position: user.position, color: color.current});
  }, [user])

  // socket event
  React.useEffect(()=>{
    // enter user
    moveSocketRef.current?.on('enterUser', (payload: MultiplayerData) => {
      const userNickname: string = payload.id
      const newUser: MultiplayerUser | undefined = newMuiltiCharacter(payload);
      if (newUser) {
        setOnlineUsers(prevUsers => ({...prevUsers, newUser}))
      }
    });

    // prev users
    moveSocketRef.current?.on('prevUsers', (data: MultiplayerData[]) => {
      data.forEach(element => {
        const newUser: MultiplayerUser | undefined = newMuiltiCharacter(element);
        if (newUser) {
          setOnlineUsers(prevUsers => ({...prevUsers, [element.id]: newUser}))
        }
      })
    });

    // muliplayer
    moveSocketRef.current?.on('moveCharacter', (data: {id: string, position: MultiplayerData['position']}) => {
      const target = onlineUsers[data.id]
      target.positionUpdate(data.position)
      const update = {
        ...onlineUsers,
        [data.id]: target
      }
      setOnlineUsers(update);
    })

    // exit user
    moveSocketRef.current?.on('exitUser', (target: string) => {

    });

    // server offline
    serverSocketRef.current?.on('disconnect', () => {
      moveSocketRef.current?.emit('outConnect', 'outCanvas')
      moveSocketRef.current?.disconnect();
      alert('서버와 접속이 끊어졌습니다.');
      navigate('/');
    });
    moveSocketRef.current?.on('disconnect', () => {
      serverSocketRef.current?.emit('outConnect', 'outCanvas')
      serverSocketRef.current?.disconnect();
      navigate('/');
    });

    // socket event - clean-up event
    return () => {
      moveSocketRef.current?.removeAllListeners('enterUser');
      moveSocketRef.current?.removeAllListeners('prevUsers');
      moveSocketRef.current?.removeAllListeners('moveCharacter');
      moveSocketRef.current?.removeAllListeners('exitUser');
      moveSocketRef.current?.removeAllListeners('disconnect');
      serverSocketRef.current?.removeAllListeners('disconnect');
    }
  }, [ctx, onlineUsers])

  // test
  React.useEffect(()=>{
    serverSocketRef.current?.on('test', (data: any) => {
      console.log(`서버소켓 테스트 데이터 : ${data}`)
    })
    moveSocketRef.current?.on('test', (data: any) => {
      console.log(`무브소켓 테스트 데이터 : ${data}`)
    })
    
    // test - clean-up event
    return () => {
      serverSocketRef.current?.removeAllListeners('test');
      moveSocketRef.current?.removeAllListeners('test');
    }
  }, [moveSocketRef.current, serverSocketRef.current])

  // test
  React.useEffect(()=>{
    console.log(onlineUsers)
  }, [onlineUsers])

  // ========================================================================

  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp