import React from 'react';

type App = (props: Props) => JSX.Element
interface Props {}

const App: App = () => {
  return (
    <>
      <h1>hello world</h1>
    </>
  )
}

export default App