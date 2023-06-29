import React from 'react';
import Main from './main/main'
import EntryCanvas from './entryCanvas/entryCanvas';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './home/home';
import { io, Socket } from "socket.io-client";

interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      <Routes>
        <Route path='/main' element={<Main />} />
        <Route path='/entry' element={<EntryCanvas />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App;