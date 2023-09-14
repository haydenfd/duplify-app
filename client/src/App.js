import React, {useEffect, useState} from 'react'
import { axiosClient } from './utils/axiosConfig';
import { Home, Landing } from './pages';
import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'
import { Account } from './pages/Account';
import { UserProfileContext } from './context';
import {NextUIProvider} from "@nextui-org/react";

function App() {

  const [userProfile, setUserProfile] = useState({})

  return (
    <NextUIProvider>
      <UserProfileContext.Provider value={userProfile}>
        <div className='min-h-screen text-white'>
          <Router>
            <Routes>
              <Route path="/landing" element={<Landing />} />
              <Route path='/home' element={<Home />}/>
              <Route path='/account' element={<Account />} /> 
            </Routes>
          </Router>
        </div>
      </UserProfileContext.Provider>
    </NextUIProvider>      
  );
}

export default App;
