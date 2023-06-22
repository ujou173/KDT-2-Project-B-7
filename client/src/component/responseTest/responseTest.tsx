import React, { Dispatch, SetStateAction } from 'react';

// component
interface Props {}
type responseTest = (props: Props) => JSX.Element
const responseTest: responseTest = () => {
  // variable 생성
  const [ data, setData ]: [ string, Dispatch<SetStateAction<string>> ] = React.useState("")

  // data request
  const request: () => Promise<void> = async () => {
    const serverResponse: string = await (await fetch('/test')).json()
    setData(serverResponse)
  }
  return (
    <>
      <button type="button" onClick={request}>요청</button>
      <p>{data !== "" && data}</p>
    </>
  )
}

export default responseTest;