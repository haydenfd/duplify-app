import React from 'react'
import { axiosClient } from '../utils/axiosConfig'

export const Landing = () => {

    const handleLoginClick = async () => {
        // axiosClient.get('authorize').then(() => {
            console.log('Hayden')
        // })
    }
  return (
    <div className='min-h-screen text-center flex flex-col'>
        <h1 className='font-bold text-5xl'>LANDING</h1>
        <button 
        className='mt-10 p-2 border-b-green-600 bg-green-600 w-[150px] mx-auto rounded-md text-white font-semibold'
        onClick={() => handleLoginClick()}
        >
            LOGIN</button>
    </div>
  )
}
