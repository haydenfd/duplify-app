import React, {useState, useEffect } from 'react';
import { cn, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { motion } from 'framer-motion';
import {
  validateToken, 
  BACKEND_ENDPOINTS
} from "../Utils";
import { Form } from '../Components';
import { CustomButton } from '../Components';

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')
  const [user, setUser] = useState({})
  const [playlist, setPlaylist] = useState({})
  const [isSearchInputValid, setIsSearchInputValid] = useState(true)

  const {isOpen, onOpen, onClose} = useDisclosure()

  const getUser = async () => {

    const access_token = validateToken()

    if (access_token) {

      const url = BACKEND_ENDPOINTS.USER + `?access_token=${access_token}`
      
      await fetch(url, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
        }, 
      }).then((res) => res.json()).then(data => {
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

// TODO: FIX THIS CLIPBOARD EFFECT
// useEffect(() => {
//     const checkClipboard = async () => {
//       try {
//         const text = await navigator.clipboard.readText();
//         const spotifyUrlPattern = /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+/;
//         if (spotifyUrlPattern.test(text)) {
//           setSearchInput(text);
//         }
//       } catch (err) {
//         console.error('Failed to read clipboard contents: ', err);
//       }
//     };

//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible') {
//         setTimeout(checkClipboard, 100);  // Delay to ensure document is focused
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, []);


// TODO: Cleanup logic; clip whitespace at end. Fix response to invalid input
  const searchPlaylistById = async (input_url) => {

    const spotifyUrlPattern = /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?$/;
    if (!spotifyUrlPattern.test(input_url)) {
      setIsSearchInputValid(false);
      setSearchInput("");
      return;
    }

    setIsSearchInputValid(true);

    const re = /playlist\/([^/]+)\?/

    const match = input_url.match(re)

    if (match && match[1])
    {
      const _id = match[1]
      const token = validateToken()
      console.log('token')
      if (token) {

        const url = BACKEND_ENDPOINTS.FETCH_PLAYLIST + `?token=${token}&pid=${_id}`
        console.log(url)
        await fetch(url).then((res) => res.json()).then(data => 
          {
          setPlaylist(data.data);
          console.log('Fetched playlist: ' + _id);
          localStorage.setItem('duplify_playlist_id', _id);
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

        <h3 className='mt-10 text-xl md:text-3xl font-semibold w-full leading-relaxed'>
            Hi, <span className='inline text-primaryGreen'>{user?.display_name}</span>. What playlists are we cloning today?
        </h3>

        <div className='w-[100vw] mt-10 flex flex-nowrap gap-8 mx-auto justify-center relative'>
          <input type='text' placeholder='Enter a playlist URL'
          value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          className={`outline-none focus:border-primaryGreen p-2 rounded-xl w-1/2 text-black text-md text-xl font-semibold border-3 border-transparent ml-0 text-ellipsis overflow-hidden whitespace-nowrap ${!isSearchInputValid ? 'border-red-500':'' }`}
          />
          <CustomButton onClickEvent={() => searchPlaylistById(searchInput)} textContent="Search"/>
          {/* { setIsSearchInputValid ? <></> : <p className='text-blue-300'>Please enter valid playlist URL. Eg. https://open.spotify.com/playlist/....</p>} */}
        </div>
        <div className='mt-10 w-4/5 mx-auto'>
          {Object.keys(playlist).length > 0 && <Form playlist={playlist} user_id={user.id}/>}
        </div>
      </motion.div>

{/* 
      <Modal isOpen={isOpen} onClose={onClose} size="md" placement='center'
      classNames={ {
        base: cn("bg-gray-800"),
        closeButton: "mt-2 hover:bg-primaryGreen/75 active:bg-transparent"
      }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='font-bold uppercase mx-auto w-full justify-center border-b-2 border-primaryGreen text-2xl'>UH-OH!</ModalHeader>
              <ModalBody className='m-2 text-lg leading-relaxed font-normal'>
                <p> 
                Looks like you entered an invalid URL! Please make sure...
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  )
}
