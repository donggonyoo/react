/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import logo from './logo.svg';
import './App.css';
import Hello from './components/Hello';

function App() { 
  const handleClick=()=>{
    console.log("안녕하세요")
  }
  const handleChange=(e)=>{ {/*입력받은값 : e.target .value */}
    console.log(e.target.value);
  }
  return(
      <div style={{textAlign:'center',marginTop:'50px'}}>
        <button onClick={handleClick}>인사하기</button><br/>
        <button onClick={()=>console.log("두번쨰인사")}>2.인사하기</button> {/*익명클래스활용*/}
        <br/>
        <input type="text" onChange={handleChange}/>
      </div>
  );
  
}

export default App;
