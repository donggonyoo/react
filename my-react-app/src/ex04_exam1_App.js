/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';
import { useState } from 'react';

function App() { 
  const [message, setMessage] = useState(''); // 상태 추가

  const handleClick = () => {
    setMessage(message + '안녕하세요'); // 상태에 텍스트 추가
  };

  return (
    <div id="msg">
      <div>{message}</div> {/* 상태를 기반으로 텍스트 표시 */}
      <button onClick={handleClick}>안녕하세요 button</button>
    </div>
  );
}

export default App;