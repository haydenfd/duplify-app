import React from 'react'
import { Home, Landing } from './pages';
import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'
import {NextUIProvider} from "@nextui-org/react";
import { Guide } from './pages/Guide';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/Layout';

function App() {

  return (
    <NextUIProvider>
        <div className='min-h-screen text-white'>
          <Router>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route element={<Layout />} >
                <Route path='/home' element={<Home />}/>
                <Route path='/guide' element={ <Guide />} />
              </Route>
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
    </NextUIProvider>      
  );
}

export default App;
