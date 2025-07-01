/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import logo from './logo.svg';
import './App.css';

function App() { //함수형컴포넌트
 
  {/* 주석: JSX 
    -<태그>...</태그>
    -className : HTML class속성이라고 보면 됨 / .자바스크립트에서 class가 예약어임
    */}
    const myName = "dongGon";
    const naver = {
      name : "네이버",
      url : "https://www.naver.com/"
    }
  return (
   <div className="APP">
      <h1 style={{ color: "white", backgroundColor: "black" }}>
        HELLO,{myName}</h1>
        <a href={naver.url} target="_blank" rel="noreferrer">{naver.name}</a>
        
    </div>
  );
}

export default App;
