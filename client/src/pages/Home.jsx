import React, {useState, useEffect } from 'react'
import { Nav } from '../components/Nav'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Form } from '../components/Form'
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')
  const [user, setUser] = useState({})
  const [playlist, setPlaylist] = useState({})
  const [playlistSongs, setPlaylistSongs] = useState([])

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('access_token');

    Cookies.set('duplify_access_token', token, {expires: 1/24})

    const fetchCurrentUserProfile = async (access_token) => {

      const userProfileEndpoint = 'https://api.spotify.com/v1/me';

      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      };

    axios.get(userProfileEndpoint, axiosConfig)
    .then((response) => {
      console.log(response.data)
      setUser(response.data)
      Cookies.set('duplify_uid', response.data.id, {expires: 1/24})


    })
    .catch((error) => {
      console.error('Error fetching user profile:', error);
    });
    }

    if (token)
    {
      fetchCurrentUserProfile(token)
    }
  }, [])

  const handleSearchOnEnter = async (playlist_url) => {

    const fetchPlaylistUrl = 'https://api.spotify.com/v1/playlists/'
    const regexPattern = /playlist\/([^/]+)\?/;

    const match = playlist_url.match(regexPattern)

    if (match && match[1]) {
      const playlistID = match[1];
      
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${Cookies.get('duplify_access_token')}`,
        },
      };
  
      await axios.get(`${fetchPlaylistUrl}${playlistID}`, axiosConfig)
      .then((response) => {
        setPlaylist(response.data)

        for (let x = 0; x < response.data.tracks.items.length; x++)
        {
          let updated = [...playlistSongs, response.data.tracks.items[x].track.uri]
          setPlaylistSongs(updated)
        }
        console.log(playlistSongs)
      })
    } else {
      console.log("No match found.");
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
          <Button onPress={() => handleSearchOnEnter(searchInput)}
          className='outline-none bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-md w-1/12 h-1/12 md:text-lg md:w-1/10 md:h-1/10'>
            Search
          </Button>
        </div>
        <div className='mt-10 w-4/5 mx-auto'>
          {Object.keys(playlist).length > 0 && <Form playlist={playlist}/>}
        </div>
      </motion.div>
    </>
  )
}
