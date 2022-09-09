import NavBar from './components/NavBar'
import { Route, Routes } from "react-router-dom";
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import TweetPage from './components/TweetPage';
import { useEffect, useState } from 'react';
import AllUsers from './components/AllUsers';
import ChangePassword from './components/ChangePassword';
import { getAccessToken } from './service.ts'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    getAccessToken();
    const t = setInterval(getAccessToken, 540000);
    return (() => clearInterval(t))
  }, [])

  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className='container-fluid main'>
        <Routes>
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/tweets' element={<TweetPage />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/forgot' element={<ChangePassword setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
