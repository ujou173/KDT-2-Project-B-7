import React from 'react';
import Canvas from './canvas/canvas';
import EntryCanvas from './entryCanvas/entryCanvas';
import { Routes, Route, Link } from 'react-router-dom';

interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      <Routes>
        <Route path='/main' element={<Canvas />} />
        <Route path='/entry' element={<EntryCanvas />} />
      </Routes>
    </>
  )
}

export default App