import React from 'react';
import Canvas from './canvas/canvas'

type App = (props: Props) => JSX.Element
interface Props {}

const App: App = () => {
  return (
    <>
      <h1>hello world</h1>
      <Canvas />
    </>
  )
}

export default App