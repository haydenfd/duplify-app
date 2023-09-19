import React from 'react'
import { Nav } from '../components/Nav'
import { motion } from 'framer-motion'

export const Guide = () => {

  return (
    <>
      <motion.div 
    initial={{ y: '-1000%', opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'tween', duration: 1.5 }}
    className='text-center'>
        <Nav />
            <div className='text-center mt-10'>
                <h1 className='text-3xl md:text-5xl font-semibold'>How to <h1 className='text-primaryGreen inline tracking-wider'>Duplify</h1></h1>
            </div>
            </motion.div>
    </>
  )
}

