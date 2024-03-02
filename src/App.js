import logo from './logo.svg';
import './App.css';
import Planets from './components/Planets';
import Pagination from './components/Pagination';

function App() {
  return (
    <div className="App container mx-auto">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header> */}
      <Planets/>
    </div>
  );
}

export default App;
