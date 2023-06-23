import React from 'react';
import Canvas from './canvas/canvas'

async function onClickHandle(): Promise<string> {
  let result = '';
  const request: string = await (await fetch('/api')).json()
  result += request;
  return result
}

interface Props {}
const App: React.FC<Props> = () => {
  return (
    <>
      <h1>hello world</h1>
      <Canvas />
      <button onClick={onClickHandle}>클릭</button>
    </>
  )
}

export default App