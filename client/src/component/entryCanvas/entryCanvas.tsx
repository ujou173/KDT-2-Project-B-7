import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';

interface Props {}
const EntryCanvas: React.FC<Props> = () => {
  // navigator
  const navigate: NavigateFunction = useNavigate();
  // formElement select
  const formElement = React.useRef<HTMLFormElement>(null);
  // input's value
  const [ nickName, setNickName ] = React.useState<string>("");
  // input -> onChange handler
  const nickNameHandle: (e: React.ChangeEvent<HTMLInputElement>) => void = React.useCallback(e=>{
    setNickName(e.target.value)
  }, [formElement])
  // form -> onSubmit handler
  const submitHandler: (e: React.FormEvent<HTMLFormElement>) => void = React.useCallback(e => {
    e.preventDefault();
    navigate('/main', {state: {nickName}})
  }, [nickName])
  return (
    <>
      <form ref={formElement} onSubmit={submitHandler}>
        <fieldset>
          <legend>
            사용할 닉네임을 입력하세요
          </legend>
          <input type="text" maxLength={12} onChange={nickNameHandle} value={nickName} />
        </fieldset>
        <input type="submit" value="전송" />
      </form>
    </>
  )
}

export default EntryCanvas