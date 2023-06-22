import React from 'react';
import ResponseTest from './responseTest/responseTest'

type App = (props: Props) => JSX.Element
interface Props {}

const App: App = () => {
  return (
    <>
      <h1>hello world</h1>
      <ResponseTest />
    </>
  )
}

export default App