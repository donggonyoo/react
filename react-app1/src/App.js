/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';
import { useState } from 'react'; /* React 함수형 컴포넌트에서 상태(state)를 선언하고 관리하는 방법 */

function App() { 
  const [msg,setMsg] = useState(''); //훅(useState)의 초기값 : '';

  const handleClick = () => {
   let a = document.querySelector("#txt").value;
   setMsg(msg + a+"\n\n"); //setMsg : msg를 설정하기위함
   document.querySelector("#txt").value = ''; //설정완료시 입력값은 초기화
  };

  return (
    <div id="msg">{msg} {/*<-- 여기에 입력값을 쌓는거임 */}
      <input type='text' id="txt" placeholder='입력하세요' onKeyDown={enter}/>
      <button onClick={handleClick} > button</button>
    </div>
  );

  function enter(e){  /*enter키를 누르면 handleClick함수가실행 */
    if( e.keyCode === 13){ 
      handleClick();
    }
  }
}

export default App;