import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slideshow } from '../components/Slideshow'
import { slides } from '../utils/slideshow'
import { validateToken } from '../utils/token'

export const Guide = () => {

  useEffect(() => {

    const token = validateToken()

    if (!token) {
      window.location.href = '/'
    }

  }, [])


  return (
    <>
      <motion.div 
    initial={{ y: '-1000%', opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'tween', duration: 1.5 }}
    className='text-center'>
          <div className='text-center mt-10'>
            <h1 className='text-3xl md:text-5xl font-semibold'>How to <h1 className='text-primaryGreen inline tracking-wider'>Duplify</h1></h1>
            <Slideshow slides={slides}/>
          </div>
      </motion.div>
    </>
  )
}

