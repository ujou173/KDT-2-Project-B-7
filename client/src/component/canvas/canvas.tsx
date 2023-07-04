import React, { ReactNode, useContext } from 'react';
import './canvas.css'
import { UserCharacter } from './character/userCharacter'
import { MultiplayerUser } from './character/multiplayer'
import { MultiplayerData } from './character/charType';
import { Field } from './field/field'
import { keydownHandler, keyupHandler } from './event/keyboard'
import { io, Socket } from 'socket.io-client'
import { useLocation, Location, useNavigate, NavigateFunction } from 'react-router-dom'

// type
interface Props {};

// component
const canvasComp: React.FC<Props> = () => {
  // variable management
  const main = document.querySelector<HTMLDivElement>('.main');
  const navigate: NavigateFunction = useNavigate();
  const canvasElement = React.useRef<HTMLCanvasElement>(null);
  const nickName = React.useRef<string>(useLocation().state.nickName);
  const color = React.useRef<string>(useLocation().state.color);
  const serverSocketRef = React.useRef<Socket | null>(null);
  const moveSocketRef = React.useRef<Socket | null>(null);
  const [ field, setField ] = React.useState<Field>()
  const [ onlineUsers, setOnlineUsers ] = React.useState<{[nickName: string] : MultiplayerUser}>({});
  const [ ctx, setCtx ] = React.useState<CanvasRenderingContext2D | null>(null)
  const [ user, setUser ] = React.useState<UserCharacter | null>(null);

  // is ingame setting
  React.useEffect(()=>{
    const root = document.getElementById('root');
    root?.classList.add('isIngame');
    document.title = 'welcome CSS!'

    // isIngame clean-up code
    return () => {
      root?.classList.remove('isIngame');
    }
  }, [])


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

  const resizeCanvas = React.useCallback(()=>{
    if (!canvasElement.current || !main) return;
    canvasElement.current.width = main.clientWidth;
    canvasElement.current.height = main.clientHeight;
  }, [main?.clientWidth, main?.clientHeight])

  // create context
  React.useEffect(()=>{
    if (canvasElement.current === null) return;
    setCtx(canvasElement.current.getContext('2d'));
    resizeCanvas();
  }, [canvasElement.current])

  // field
  React.useEffect(()=>{
    if (!canvasElement.current || !ctx) return;
    setField(new Field(canvasElement.current, ctx, {x: 1200, y: 500}))
  }, [ctx])

  // ===================================================================




  // user ==============================================================

  // init my character
  React.useEffect(()=>{
    if (!canvasElement.current || !ctx || !moveSocketRef.current || !field) return;
    setUser(new UserCharacter({
      canvas: canvasElement.current,
      ctx,
      id: nickName.current,
      position: {
        x: canvasElement.current.width / 2,
        y: canvasElement.current.height / 2,
      },
      color: color.current,
      moveSocket: moveSocketRef.current,
      field: field
    }))
  }, [ctx, field, resizeCanvas])

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

      // canvas background
      if (canvasElement.current === null || ctx === null || user === null) return;
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvasElement.current.width, canvasElement.current.height);

      // field
      field?.drawField();

      ctx.save();
      
      // multiplayer
      if (Object.keys(onlineUsers).length > 0) {
        Object.values(onlineUsers).forEach((element: MultiplayerUser): void => {
          element.update();
        })
      }

      // user player
      user.update()
      
      ctx.restore();

    }
    animation();
  }, [user, onlineUsers, field])

  // ======================================================================




  // event management =======================================================

  // resize event
  React.useEffect(()=>{
    const handleResize = () => {
      resizeCanvas();
    }
    addEventListener('resize', handleResize);
    // clean-up code
    return () => {
      removeEventListener('resize', handleResize);
    }
  }, [resizeCanvas])

  // keyboard event
  React.useEffect(()=>{
    if (user === null) return;
    addEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
    addEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    return (): void=>{
      removeEventListener('keydown', (e: KeyboardEvent): void => {keydownHandler(e, user)});
      removeEventListener('keyup', (e: KeyboardEvent): void => {keyupHandler(e, user)});
    }
  }, [user, onlineUsers])

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
        setOnlineUsers(prevUsers => ({...prevUsers, [userNickname]: newUser}))
      }
      if (user && newUser) {
        user.onlineUsers = {
          ...onlineUsers,
          [userNickname]: newUser
        }
      }
    });

    // prev users
    moveSocketRef.current?.on('prevUsers', (data: MultiplayerData[]) => {
      data.forEach(element => {
        const newUser: MultiplayerUser | undefined = newMuiltiCharacter(element);
        if (newUser) {
          setOnlineUsers(prevUsers => ({...prevUsers, [element.id]: newUser}))
        }
        if (user && newUser) {
          user.onlineUsers = {
            ...onlineUsers,
            [element.id]: newUser
          }
        }
      })
    });

    // muliplayer
    moveSocketRef.current?.on('moveCharacter', (data: {id: string, position: MultiplayerData['position']}) => {
      const target: MultiplayerUser = onlineUsers[data.id]
      target.positionUpdate(data.position)
      const update: {[nickName: string]: MultiplayerUser} = {
        ...onlineUsers,
        [data.id]: target
      }
      setOnlineUsers(update);
      if (user) {
        user.onlineUsers = {
          ...onlineUsers,
          [data.id]: target
        }
      }
    })

    // exit user
    moveSocketRef.current?.on('exitUser', (target: string) => {
      const prevUsers: {[nickName: string]: MultiplayerUser} = {...onlineUsers};
      delete prevUsers[target];
      if (user) {
        delete user.onlineUsers[target];
      }
      setOnlineUsers(prevUsers)
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
  }, [user, ctx, onlineUsers])

  // ========================================================================

  return (
    <>
      <canvas ref={canvasElement} className='canvas'></canvas>
    </>
  )
}

export default canvasComp