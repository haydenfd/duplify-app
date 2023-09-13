import React from 'react'
import { axiosClient } from '../utils/axiosConfig'
import { motion } from 'framer-motion'

export const Landing = () => {

    const fadeIn = {
        hidden: { opacity: 0 }, // Initial state, invisible
        visible: { opacity: 1 }, // Final state, fully visible
      };

  return (
    <div className='min-h-screen text-center flex flex-col'>
        <motion.h1 
        className='font-bold text-5xl'
        initial="hidden"
        animate="visible"
        transition={{duration: 3}}
        variants={fadeIn}
        >
            LANDING
        </motion.h1>
        <a 
        className='mt-10 p-2 cursor-pointer border-b-primaryGreen bg-primaryGreen w-[150px] mx-auto rounded-md text-white text-lg hover:bg-primaryPurple font-semibold'
        href='http://localhost:8000/authorize'
        >
            LOGIN</a>
    </div>
  )
}
