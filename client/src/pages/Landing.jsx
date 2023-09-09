import React from 'react'
import { axiosClient } from '../utils/axiosConfig'
import { motion } from 'framer-motion'

export const Landing = () => {

    const fadeIn = {
        hidden: { opacity: 0 }, // Initial state, invisible
        visible: { opacity: 1 }, // Final state, fully visible
      };

    const handleLoginClick = async () => {
        // axiosClient.get('authorize').then(() => {
            console.log('Hayden')
        // })
    }
  return (
    <div className='min-h-screen text-center flex flex-col'>
        <motion.h1 
        className='font-bold text-5xl'
        initial="hidden"
        animate="visible"
        transition={{duration: 1}}
        variants={fadeIn}
        >
            LANDING
        </motion.h1>
        <button 
        className='mt-10 p-2 border-b-primaryGreen bg-primaryGreen w-[150px] mx-auto rounded-md text-white text-lg hover:bg-primaryPurple font-semibold'
        onClick={() => handleLoginClick()}
        >
            LOGIN</button>
    </div>
  )
}
