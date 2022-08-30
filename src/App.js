import NavBar from './components/NavBar'
import { Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import TweetPage from './components/TweetPage';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className='container-fluid'>
      <Routes>
        <Route path='/login' element = {<Login />}/>
        <Route path='/register' element = {<Register />}/>
        <Route path='/tweets' element = {<TweetPage />}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
