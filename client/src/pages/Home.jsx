import React, {useState, useEffect } from 'react'
import { Nav } from '../components/Nav'
import { Form } from '../components/Form'
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { validateToken } from '../utils/token'
import { SERVER_ENDPOINTS } from '../utils/api'

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')
  const [user, setUser] = useState({})
  const [playlist, setPlaylist] = useState({})

  const getUser = async () => {

    
    const access_token = validateToken()

    if (access_token) {

      const url = SERVER_ENDPOINTS.USER + `?access_token=${access_token}`
      
      await fetch(url, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        }, 
      }).then((res) => res.json()).then(data => {
        console.log(data.user)
        setUser(data.user)
      })
    }

    else {
      window.location.href = '/'
    }
  }

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search)

    if (validateToken()) {

      getUser()
    }

    else if (urlParams.get('access_token')) {

      const token = urlParams.get('access_token')
      const duplify_token = token
      const expiration_time = new Date().getTime() + (59 * 60 * 1000)

      const token_data = {
        token: duplify_token,
        expiration_time: expiration_time
      }

      localStorage.setItem('duplify_token', JSON.stringify(token_data))
      getUser()
    }

    else {
      window.location.href = '/'
    }


  }, [])
 

  const searchPlaylistById = async (input_url) => {

    const re = /playlist\/([^/]+)\?/

    const match = input_url.match(re)

    if (match && match[1])
    {
      const _id = match[1]
      const token = validateToken()

      if (token) {

        const url = SERVER_ENDPOINTS.FETCH_PLAYLIST + `?token=${token}&pid=${_id}`
        
        await fetch(url).then((res) => res.json()).then(data => 
          {
          setPlaylist(data.data)
          console.log('Fetched playlist: ' + _id)
        })
      } else {
        window.location.href = '/'
      }
    }
  }

  return (
    <>
      <motion.div 
        initial={{ y: '-1000%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 1.5 }}
        className='text-center'>
        {/* <Nav/> */}
        <h3 className='mt-10 text-xl md:text-3xl font-semibold w-full leading-relaxed'>
            Hi, <h2 className='inline text-primaryGreen'>{user?.display_name}</h2>. What playlists are we cloning today?
        </h3>
        <div className='w-full mt-10 flex flex-nowrap gap-4 mx-auto justify-center'>
          <input type='text' placeholder='Enter a playlist URL'
          value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          className='outline-none focus:border-primaryGreen p-1 md:p-2 rounded-xl w-3/5 md:w-1/2 text-black text-md md:text-xl font-semibold border-4 border-transparent ml-0 overflow-ellipsis' />
          <Button onPress={() => searchPlaylistById(searchInput)}
          className='outline-none bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-md w-1/12 h-1/12 md:text-lg md:w-1/10 md:h-1/10'>
            Search
          </Button>
        </div>
        <div className='mt-10 w-4/5 mx-auto'>
          {Object.keys(playlist).length > 0 && <Form playlist={playlist} user_id={user.id}/>}
        </div>
      </motion.div>
    </>
  )
}
