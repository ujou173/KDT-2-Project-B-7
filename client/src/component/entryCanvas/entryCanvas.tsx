import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { SocketContext } from '../App'

interface Props {}
const EntryCanvas: React.FC<Props> = () => {
  // navigator
  const navigate: NavigateFunction = useNavigate();
  
  // formElement select
  const formElement = React.useRef<HTMLFormElement>(null);
  
  // input's value
  const [ nickName, setNickName ] = React.useState<string>("");
  const [ color, setColor ] = React.useState("red");
  const { serverSocket } = React.useContext(SocketContext)
  
  // input -> onChange handler
  const nickNameHandle: (e: React.ChangeEvent<HTMLInputElement>) => void = React.useCallback(e=>{
    setNickName(e.target.value)
  }, [formElement])
  const colorHandle: (e: React.ChangeEvent<HTMLSelectElement>) => void = React.useCallback(e=> {
    setColor(e.target.value)
  }, [formElement])
  
  // form -> onSubmit handler
  const submitHandler: (e: React.FormEvent<HTMLFormElement>) => void = React.useCallback(e => {
    e.preventDefault();
    if (nickName === "") {
      alert('공백 문자는 닉네임으로 입력할 수 없습니다.')
      return;
    }

    serverSocket.removeAllListeners('checkNickName');

    serverSocket.emit('checkNickName', nickName);
    serverSocket.on('checkNickName', (data: boolean) => {
      if (data === false) {
        navigate('/main', {state: {nickName, color}})
      } else {
        alert('중복된 닉네임 입니다.')
      }
    })
  }, [nickName, color])
  
  return (
    <>
      <form ref={formElement} onSubmit={submitHandler}>
        <fieldset>
          <legend>
            캐릭터 설정
          </legend>
          닉네임 설정 : <input type="text" maxLength={12} onChange={nickNameHandle} value={nickName} /><br />
          플레이어 색상 설정 : <select onChange={colorHandle}>
            <option value="red">빨강</option>
            <option value="blue">파랑</option>
            <option value="yellow">노랑</option>
            <option value="green">초록</option>
          </select>
        </fieldset>
        <input type="submit" value="전송" />
      </form>
    </>
  )
}

export default EntryCanvas