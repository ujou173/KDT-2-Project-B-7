import React from 'react';
import Main from './main/main'
import EntryCanvas from './entryCanvas/entryCanvas';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './home/home';
import { io, Socket } from "socket.io-client";

const serverSocket: Socket = io();
const chatSocket: Socket = io('/chat');
const moveSocket: Socket = io('/character-move');

export const SocketContext = React.createContext({chatSocket, moveSocket, serverSocket});
export const socketIDContext = React.createContext<string>("");

interface Props {}
const App: React.FC<Props> = () => {
  // get socketID
  const [ socketID, setSocketID ] = React.useState<string>("");
  React.useEffect(()=>{
    serverSocket.emit('enterUser', 'Entering User');
  }, [])
  React.useEffect(()=>{
    serverSocket.on('yourID', (data: string) => {
      setSocketID(data);
    })
  }, [])
  return (
    <>
      <SocketContext.Provider value={{chatSocket, moveSocket, serverSocket}}>
        <socketIDContext.Provider value={socketID}>
          <Routes>
            <Route path='/main' element={<Main />} />
            <Route path='/entry' element={<EntryCanvas />} />
            <Route path='/' element={<Home />} />
          </Routes>
        </socketIDContext.Provider>
      </SocketContext.Provider>
    </>
  )
}

export default App;