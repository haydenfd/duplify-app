import React, {useState, useEffect } from 'react'
import { Nav } from '../components/Nav'
import Cookies from 'js-cookie'
import { Form } from '../components/Form'
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')
  const [user, setUser] = useState({})
  const [playlist, setPlaylist] = useState({})

  const getUser = async (access_token) => {

    const getUserEndpoint = `http://localhost:8000/user?access_token=${access_token}`

    await fetch(getUserEndpoint, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
      }, 
    }).then((res) => res.json()).then(data => {
      console.log(data.user)
      setUser(data.user)
    })

  }

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    Cookies.set('duplify_access_token', token, {expires: 1/24})

    if (token)
    {
      getUser(token)
    }
  }, [])




  const searchPlaylistById = async (url) => {

    const re = /playlist\/([^/]+)\?/

    const match = url.match(re)

    if (match && match[1])
    {
      const _id = match[1]
      console.log(_id)
      const endpoint = `http://localhost:8000/playlist?token=${Cookies.get('duplify_access_token')}&pid=${_id}`
      await fetch(endpoint).then((res) => res.json()).then(data => {
        setPlaylist(data.data)
        console.log('Fetched playlist: ' + _id)
      })
    }
  }

  return (
    <>
      <motion.div 
        initial={{ y: '-1000%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'tween', duration: 1.5 }}
        className='text-center'>
        <Nav/>
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
