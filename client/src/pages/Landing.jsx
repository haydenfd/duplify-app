import React from 'react'

export const Landing = () => {
  return (
    <div className='min-h-screen text-center flex flex-col bg-red-300'>
        <h1 className='font-bold text-5xl'>LANDING</h1>
        <button 
        className='mt-10 p-2 border-b-green-600 bg-green-600 w-[150px] mx-auto rounded-md text-white font-semibold'
        onClick={() => alert('Yo')}
        >
            LOGIN</button>
    </div>
  )
}
