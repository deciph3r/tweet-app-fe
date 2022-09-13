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
      <div style={{ paddingTop: '70px' }}>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
      <div className='container pt-4'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <Routes>
              <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path='/register' element={<Register />} />
              <Route path='/tweets' element={<TweetPage />} />
              <Route path='/all-users' element={<AllUsers />} />
              <Route path='/forgot' element={<ChangePassword setIsLoggedIn={setIsLoggedIn} />} />
            </Routes>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
