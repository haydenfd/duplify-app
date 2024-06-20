import React, { useState } from 'react';
import { RadioGroup, Radio, cn, Button, Input } from "@nextui-org/react";
import { motion } from 'framer-motion';
import {
  validateToken,
  BACKEND_ENDPOINTS
} from '../../Utils';
import {CustomModal} from '../Modal';
import { CustomButton } from '../CustomButton/CustomButton';

export const Form = ({ playlist, user_id, setIsPlaylistCreationLoading }) => {
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescription, setPlaylistDescription] = useState('');
  const [playlistVisibility, setPlaylistVisibility] = useState('public');
  const [isValidPlaylistName, setIsValidPlaylistName] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handlePlaylistDescriptionChange = (e) => {
    setPlaylistDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const token = validateToken();
    if (!token) {
      window.location.href = '/';
    } else {
      if (playlistName.length === 0) {
        setIsValidPlaylistName(false);
        return;
      }
      setIsValidPlaylistName(true);
      setIsPlaylistCreationLoading(true);
      // const id = localStorage.getItem('duplify_playlist_id');
      const url = BACKEND_ENDPOINTS.CREATE_PLAYLIST + `?token=${token}&id=${playlist.id}`;

      const body = {
        user_id,
        playlistName,
        playlistDescription,
        playlistVisibility: playlistVisibility === "public" ? true : false,
      };

      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }).then((res) => res.json())
        .then((data) => {
          setIsPlaylistCreationLoading(false); 
          setPlaylistName('');
          setPlaylistDescription('');
          setIsModalOpen(true);
     
        }).catch((error) => {
          setIsPlaylistCreationLoading(false);
          console.error('Error creating playlist:', error);
        });
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', duration: 1 }}
        className='w-full bg-black border-4-black bg-opacity-60 rounded-lg px-4 py-6 text-white text-3xl'>
        <div className='w-full font-semibold'>
          <h2 className='inline'>Clone </h2>
          <h2 className='text-primaryPurple inline'>{playlist?.name} </h2>
          <h2 className='inline'>by </h2>
          <h2 className='inline text-primaryGreen'>{playlist?.owner?.display_name} </h2>
          <h2 className='inline bg-gradient-to-r from-purple-700 to-primaryPurple via-primaryGreen  text-transparent bg-clip-text'>({playlist?.tracks?.total} songs)</h2>
        </div>
        <div className='mt-6 flex flex-col items-center text-black'>
    
          <input type='text'
            className={`text-lg rounded-md outline-none focus:outline-primaryGreen outline-4 p-2 w-3/5 font-semibold ${!isValidPlaylistName ? 'outline-red-500' : ''}`}
            placeholder='Give your playlist a name (Required)' value={playlistName} onChange={(e) => handlePlaylistNameChange(e)} />
            { !isValidPlaylistName && (
              <div className='w-3/5 '> 
                <p className='text-[16px] text-red-500 text-left'>Please enter a name</p> 
              </div>) 
            }
          <input type='text'
            className='text-lg mt-8 rounded-md outline-none focus:outline-primaryGreen outline-4 p-2 w-3/5 font-semibold'
            placeholder='How about a description? (Optional)' value={playlistDescription} onChange={(e) => handlePlaylistDescriptionChange(e)} />
          <RadioGroup
            orientation="horizontal"
            label="Make your playlist public or private?"
            onChange={(e) => setPlaylistVisibility(e.target.value)}
            classNames={{
              label: cn("text-white text-lg text-left font-semibold"),
              base: cn("w-3/5")
            }}
            defaultValue="public"
          >
            <Radio value="public" classNames={{ label: cn("text-white mr-20 text-center font-medium"), control: cn("p-4 bg-primaryGreen border-none outline-none") }}>Public</Radio>
            <Radio value="private" classNames={{ label: cn("text-white mr-20 text-center font-medium"), control: cn("p-4 bg-primaryGreen border-none outline-none") }}>Private</Radio>
          </RadioGroup>
          <CustomButton onClickEvent={() => handleSubmit()} textContent="Make me my playlist!"/>
        </div>
      </motion.div>

      {isModalOpen && (
        <CustomModal />
      )}
    </>
  );
};
