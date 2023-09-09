import React, {useEffect} from 'react'
import { axiosClient } from './utils/axiosConfig';
import axios from 'axios';
import { Home, Landing } from './pages';
import { 
  BrowserRouter as Router,
  Routes, 
  Route
} from 'react-router-dom'

function App() {

  useEffect(() => {

    let fetchData = async () => {

      axiosClient.get('/').then((response) => console.log(response.data))
    }

  
    fetchData()

  }, [])

  return (
    <div className='min-h-screen text-white'>
      <Router>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path='/home' element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
