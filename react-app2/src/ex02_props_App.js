import logo from './logo.svg';
import './App.css';
import Hello from './component/hello';

function App() {
  return (
    <div className="App">
      <h3>props : Properties , 속성</h3>
        <Hello age="10" /> {/*속성값의 자료형 : 문자열 */}
        <Hello age={20} /> {/*속성값의 자료형 : 숫자형 */}
        <Hello age={30} />
    </div>
  );
}

export default App;
