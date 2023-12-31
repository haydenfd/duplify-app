import React, {useEffect} from 'react'
import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'
import { SERVER_ENDPOINTS } from '../utils/api'

export const Landing = () => {

  useEffect(() => {

    const test = async () => {

      await fetch(SERVER_ENDPOINTS.ROOT).then((res) => res.json()).then(data => console.log(data))
    }

    test()
  })

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      };

    const OauthRedirect = () => {
      
      window.location.href= SERVER_ENDPOINTS.AUTHORIZE
    }

  return (
    <div className='min-h-[25rem] text-center flex flex-col justify-center my-auto'>
        <motion.h1 
        className='font-bold text-5xl md:text-7xl tracking-widest uppercase'
        initial={{ y: '-1000%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', duration: 2 }}
        >
            DUPLIFY
        </motion.h1>
        <motion.h1 
        className='font-medium text-xl md:text-3xl mt-6 text-center leading-relaxed px-4'
        initial={{ y: '-1000%' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', duration: 2 }}
        >
            Clone the contents of other Spotify playlists to a personal playlist!
        </motion.h1>
        <motion.div className="mt-10" initial="hidden" animate="visible" variants={fadeIn} transition={{delay: 1.5, duration: 1}}>
          <Button 
          onClick={() => OauthRedirect()}
          className='bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-lg md:text-xl w-[12rem] h-[3rem] md:h-[4rem]'>
            Login to Spotify
          </Button>
        </motion.div>  
    </div>
  )
}
