import React from 'react'
import { motion } from 'framer-motion'

export const Landing = () => {

    const fadeIn = {
        hidden: { opacity: 0 }, // Initial state, invisible
        visible: { opacity: 1 }, // Final state, fully visible
      };

  return (
    <div className='min-h-[50rem] text-center flex flex-col justify-center my-auto'>
        <motion.h1 
        className='font-bold text-7xl tracking-wider uppercase'
        initial={{ y: '-1000%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', duration: 2 }}
        >
            DUPLIFY
        </motion.h1>
        <motion.h1 
        className='font-medium text-3xl mt-6 text-center leading-relaxed'
        initial={{ y: '-1000%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', duration: 2 }}
        >
            Clone the contents of other Spotify playlists to a personal playlist!
        </motion.h1>
        <motion.a initial="hidden" animate="visible" variants={fadeIn} transition={{delay: 1.5, duration: 1 }}
        className='mt-10 p-4 cursor-pointer border-b-primaryGreen bg-primaryGreen w-[150px] mx-auto rounded-md text-white text-2xl hover:bg-primaryPurple font-semibold'
        href='http://localhost:8000/authorize'
        >
            LOGIN</motion.a>
    </div>
  )
}
