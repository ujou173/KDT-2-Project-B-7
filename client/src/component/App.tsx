import React from 'react';
import Canvas from './canvas/canvas';
import EntryCanvas from './entryCanvas/entryCanvas';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './home/home'

interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      <Routes>
        <Route path='/main' element={<Canvas />} />
        <Route path='/entry' element={<EntryCanvas />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  )
}

export default App