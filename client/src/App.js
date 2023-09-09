import React, {useEffect} from 'react'
import { axiosClient } from './utils/axiosConfig';
import axios from 'axios';

function App() {

  useEffect(() => {

    let fetchData = async () => {

      axiosClient.get('/').then((response) => console.log(response.data))
    }

  

    fetchData()

  }, [])

  return (
    <div className='min-h-screen bg-primaryGray text-white'>
      <h1 className="text-3xl font-bold">Hayden</h1>
    </div>
  );
}

export default App;
