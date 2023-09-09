import React, {useEffect} from 'react'
import { axiosClient } from './utils/axiosConfig';
import axios from 'axios';
import { Landing } from './pages';

function App() {

  useEffect(() => {

    let fetchData = async () => {

      axiosClient.get('/').then((response) => console.log(response.data))
    }

  

    fetchData()

  }, [])

  return (
    <div className='min-h-screen text-black'>
      <Landing />
    </div>
  );
}

export default App;
