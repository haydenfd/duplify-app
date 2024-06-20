import React from 'react'
import { Button } from '@nextui-org/react'

export const CustomButton = ({ onClickEvent, textContent, styles = "" }) => {
  return (
    <Button
    onClick={onClickEvent}
    className= {`bg-primaryGreen text-white font-semibold hover:bg-primaryPurple rounded-xl text-lg md:text-xl w-[10rem] h-[1.5rem] md:h-[3.25rem]`}
    >
        {textContent}
    </Button>
  )
}
