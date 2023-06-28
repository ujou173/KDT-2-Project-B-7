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

interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      <SocketContext.Provider value={{chatSocket, moveSocket, serverSocket}}>
        <Routes>
          <Route path='/main' element={<Main />} />
          <Route path='/entry' element={<EntryCanvas />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </SocketContext.Provider>
    </>
  )
}

export default App;