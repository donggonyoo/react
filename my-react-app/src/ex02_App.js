/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
import './App.css';
import Hello from './components/Hello';
import World from './components/World';

function App() { //함수형컴포넌트
  return(
    <div>
      <Hello/>
      <World/>
     <div className='box'>Hello</div>
    </div>
  );
}

export default App;
