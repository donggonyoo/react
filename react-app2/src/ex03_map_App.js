import logo from './logo.svg';
import './App.css';
import Hello from './component/hello';
import Header from './component/Header';
import Day from './component/Day';
import DayList from './component/DayList';

function App() {
  return (
    <div className="App">
       
      <Header/>
      <DayList/><br/>
      <Day/>
      <br/>    
    </div>
  );
}

export default App;
