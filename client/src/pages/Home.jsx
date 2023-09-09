import React, {useState} from 'react'
import { Nav } from '../components/Nav'

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')

  return (
    <div className='text-center'>
        <Nav/>
        <div className='mt-10 text-5xl font-bold'>
            Home
        </div>
        <input type='text' placeholder='Enter a playlist URL'
        value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
        className='p-2 rounded-md w-3/5 mt-10 text-black text-xl font-semibold border-4 border-black' />
        <button className='bg-white text-green-500' onClick={() => console.log(searchInput)}>Button</button>
    </div>
  )
}
