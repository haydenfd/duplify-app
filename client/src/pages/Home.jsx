import React, {useState, useEffect, useContext} from 'react'
import { Nav } from '../components/Nav'
import axios from 'axios'
import Cookies from 'js-cookie'
import { UserProfileContext } from '../context'
import { Form } from '../components/Form'
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [profile, setProfile] = useState({})
  const [playlist, setPlaylist] = useState({})

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
        console.log(response.data)
        setPlaylist(response.data)
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
        <h3 className='mt-10 text-4xl font-semibold w-full'>
            Hi, <h2 className='inline text-primaryGreen'>{user?.display_name}</h2>. What playlists are we cloning today?
        </h3>
        <div className='w-full mt-10 flex flex-nowrap gap-4 mx-auto justify-center'>
          <input type='text' placeholder='Enter a playlist URL'
          value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          className='focus:ring focus:ring-primaryGreen p-2 rounded-xl w-1/2 text-black text-xl font-semibold border-4 border-transparent ml-0 overflow-ellipsis' />
          <Button onClick={() => handleSearchOnEnter(searchInput)}
          className='bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-lg w-1/10 h-1/10'>
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
