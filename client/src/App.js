import React from 'react'
import { Home, Landing } from './pages';
import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'
import {NextUIProvider} from "@nextui-org/react";
import { Guide } from './pages/Guide';

function App() {

  return (
    <NextUIProvider>
        <div className='min-h-screen text-white'>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path='/home' element={<Home />}/>
              <Route path='/guide' element={ <Guide />} />
            </Routes>
          </Router>
        </div>
    </NextUIProvider>      
  );
}

export default App;
