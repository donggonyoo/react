import logo from './logo.svg';
import './App.css';
import Head from './components/Head';
import BoardList from "./components/board/BoardList"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import BoardForm from './components/board/BoardForm';

function App() {
  return (
    <div className="App">
      <Head/>
      <BrowserRouter>
      <Routes>
        <Route path="/board/boardList/:boardid" element={<BoardList/>}/>  {/*:boardid : 입력값*/}
        <Route path="/board/boardForm/:boardid" element={<BoardForm/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
