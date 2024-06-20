import React, {useState, useEffect } from 'react';
import { cn, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { motion } from 'framer-motion';
import {
  validateToken, 
  BACKEND_ENDPOINTS
} from "../Utils";
import { Form } from '../Components';

export const Home = () => {

  const [searchInput, setSearchInput] = useState('')
  const [user, setUser] = useState({})
  const [playlist, setPlaylist] = useState({})
  const [isInvalid, setIsInvalid] = useState(true)

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

        const url = BACKEND_ENDPOINTS.FETCH_PLAYLIST + `?token=${token}&pid=${_id}`
        
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

        <h3 className='mt-10 text-xl md:text-3xl font-semibold w-full leading-relaxed'>
            Hi, <h2 className='inline text-primaryGreen'>{user?.display_name}</h2>. What playlists are we cloning today?
        </h3>

        <div className='w-[100vw] mt-10 flex flex-nowrap gap-8 mx-auto justify-center'>
         
          <input type='text' placeholder='Enter a playlist URL'
          value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
          className={`outline-none focus:border-primaryGreen p-1 md:p-2 rounded-xl w-4/5 md:w-1/2 text-black text-md md:text-xl font-semibold border-3 border-transparent ml-0 overflow-ellipsis`} />

          <Button onPress={() => onOpen()}
          className="outline-none bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-md w-1/12 h-1/12 md:text-lg md:w-1/10 md:h-1/10">
            Search
          </Button>
        </div>
        <div className='mt-10 w-4/5 mx-auto'>
          {Object.keys(playlist).length > 0 && <Form playlist={playlist} user_id={user.id}/>}
        </div>
      </motion.div>

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
              {/* <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}


 {/* <Input 
          value={searchInput}
          onValueChange={setSearchInput}
          size='md'
          variant="bordered" 
          label="Enter Playlist URL" 
          isClearable
          isInvalid={false}
          errorMessage="Invalid URL! Sample format - https://open.spotify.com/playlist/playlist-id-goes-here"
          classNames={ 
            {
              base: cn("bg-white rounded-xl text-black overflow-ellipsis"),
              // inputWrapper: cn("border-4 border-transparent focus:border-primaryGreen"),
              label: [
                "text-lg",
                "font-semibold",
              ],  
              input: [
                "font-semibold",
                "text-black",
                "text-lg",
                "overflow-ellipsis",
              ],
              clearButton: cn("bg-black mr-1 p-0 scale-150")
            }
          }
          /> */}