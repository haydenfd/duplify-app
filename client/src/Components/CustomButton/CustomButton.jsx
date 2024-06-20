import React from 'react'
import { Button } from '@nextui-org/react'

export const CustomButton = ({ onClickEvent, textContent, styles = "" }) => {
  return (
    <Button
    onClick={(e) => onClickEvent(e)}
    className='bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-lg md:text-xl w-[12rem] h-[3rem] md:h-[4rem]'
    >
        {textContent}
    </Button>
  )
}
