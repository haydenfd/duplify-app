import React from 'react'
import { 
  Home, 
  Landing, 
  NotFound,
  Guide,
} from './Pages';

import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'

import { Layout } from './Components';

export function App() {
  return (
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
  );
}
