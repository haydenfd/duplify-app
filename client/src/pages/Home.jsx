import React, {useState, useEffect} from 'react'
import { Nav } from '../components/Nav'
import axios from 'axios'
import Cookies from 'js-cookie'

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')
  const [token, setToken] = useState('')

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
      console.log(token)
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${Cookies.get('duplify_access_token')}`,
        },
      };
  
      await axios.get(`${fetchPlaylistUrl}${playlistID}`, axiosConfig)
      .then((response) => {
        console.log(response.data)
      })
    } else {
      console.log("No match found.");
    }
  }

  return (
    <>
          <div className='text-center'>
          <Nav/>
          <div className='mt-10 text-5xl font-bold'>
              Home
          </div>
          <div className='w-full mt-10 flex flex-nowrap gap-4 mx-auto justify-center'>
            <input type='text' placeholder='Enter a playlist URL'
            value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
            className='focus:ring focus:ring-primaryGreen p-2 rounded-xl w-3/5 text-black text-xl font-semibold border-4 border-black ml-0' />
            <button className='bg-primaryGreen text-white rounded-xl font-bold text-lg py-2 px-4 w-1/10 hover:bg-primaryPurple' onClick={() => handleSearchOnEnter(searchInput)}>Search</button>
          </div>
          
      </div>
    </>
  )
}
