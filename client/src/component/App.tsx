import React from 'react';

type Element = (props: Props) => JSX.Element
interface Props {}

const App: Element = () => {
  return (
    <h1>hello world</h1>
  )
}

export default App