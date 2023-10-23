import { Button } from '@nextui-org/react'
import React from 'react'
import { CLIENT_URL } from '../utils/api'

export const NotFound = () => {

  const landingRedirect = () => {
    window.location.href = CLIENT_URL
  }
  return (
    <>
      <div className='text-center pt-10'>
        <h1 className='font-bold text-3xl md:text-5xl text-white mb-10'>Oops, that page wasn't found!</h1>
        <Button className='bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-lg md:text-xl w-[15rem] h-[3rem] md:h-[4rem]' onClick={() => landingRedirect()}>
          Take me to Login
        </Button>
      </div>
    </>
  )
}
