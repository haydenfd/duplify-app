import React, { useState } from 'react'
import {RadioGroup, Radio, cn, Button} from "@nextui-org/react";

export const Form = ({playlist}) => {

  const [playlistName, setPlaylistName] = useState('')
  const [playlistDescription, setPlaylistDescription] = useState('')
  const [playlistVisibility, setPlaylistVisibility] = useState('public')

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value)
  }

  const handlePlaylistDescriptionChange = (e) => {
    setPlaylistDescription(e.target.value)
  }

  return (
    <>
        <div className='w-full bg-black border-4-black bg-opacity-60 rounded-lg px-4 py-6 text-white text-3xl'>
            <div className='w-full font-semibold'>
                <h2 className='inline'>Clone </h2>
                <h2 className='text-primaryGreen inline'>Playlist </h2>
                <h2 className='inline'>By </h2>
                <h2 className='text-primaryGreen inline'>Inara</h2>
            </div>
            <div className='mt-6 flex flex-col gap-8 items-center text-black'>
                <input type='text'
                className=' text-lg rounded-md outline-none focus:outline-primaryGreen p-2 w-3/5 font-semibold'
                placeholder='Give your playlist a name' value={playlistName} onChange={(e) => handlePlaylistNameChange(e)}/>
                <input type='text'
                className=' text-lg rounded-md outline-none focus:outline-primaryGreen p-2 w-3/5 font-semibold'
                placeholder='How about a description?' value={playlistDescription} onChange={(e) => handlePlaylistDescriptionChange(e)}/>
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
                    <Radio value="public" classNames={{ label: cn("text-white mr-20 text-center font-medium"), control: cn("p-4 bg-primaryGreen border-none outline-none")}}>Public</Radio>
                    <Radio value="private" classNames={{ label: cn("text-white mr-20 text-center font-medium"), control: cn("p-4 bg-primaryGreen border-none outline-none")}}>Private</Radio>
                </RadioGroup>
                <Button className='bg-primaryGreen text-white font-semibold hover:bg-primaryPurple text-lg'>
                    Make me my playlist!
                </Button>
                
            </div>
        </div>
    </>
  )
}

