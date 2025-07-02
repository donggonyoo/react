/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import Hello from './component/hello';
import Header from './component/Header';
import Day from './component/Day';
import DayList from './component/DayList';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import NotFoundPage from './component/NotFoundPage';
/*
리액트 라우팅 기능을 위한 설정
리액트 라우팅 : URL요청 별 다른 컴포넌트호출
 */
function App() {
  return (
    <BrowserRouter>{/*BrowserRouter : 최상위 라우팅 컴포넌트*/}
    <div className="App">       
      <Header/>
      <Routes>{/*Routes : Route컴포넌트의 부모 컴포넌트 */}        
        <Route path="/" element={<DayList/>}/>{/*요청 시 DayList컴포넌트 조회 */}
        <Route path="/day/:day" element={<Day/>}/>{/*요청 시 Day컴포넌트 조회  /day/:day -> ex) local.../day/xxx */}
        <Route path="*" element={<NotFoundPage/>}/>{/*페이지가없는경우 */}
      </Routes>    
    </div>
    </BrowserRouter>
  );
}

export default App;
