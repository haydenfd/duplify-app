import React, { useState } from 'react'

export const Slideshow = ({ slides }) => {

  const [currentIdx, setCurrentIdx] = useState(0)
 
  const decrementIdx = () => {
  
    const isFirst = currentIdx === 0
    const newIdx = isFirst? slides.length - 1 : currentIdx - 1
    setCurrentIdx(newIdx)
  }

  const incrementIdx = () => {

    const isLast = currentIdx === slides.length - 1
    const newIdx = isLast? 0 : currentIdx + 1
    setCurrentIdx(newIdx)
  }

  return (
    <div className='mx-auto my-10 h-[30rem] w-9/10 relative'>
        <div onClick={decrementIdx}
        className="cursor-pointer absolute z-10 top-1/2 translate-y-[-50%] left-9 text-5xl hover:text-primaryGreen"> &#x276E; </div>
        <div className='bg-cover bg-center text-white rounded-md h-full w-3/4 mx-auto border-b-3 border-black' style={ { backgroundImage: `url(${slides[currentIdx].url})`}}>
        </div>
        <div onClick={incrementIdx}
        className="cursor-pointer absolute z-10 top-1/2 translate-y-[-50%] right-9 text-5xl hover:text-primaryGreen"> &#x276F; </div>
        <h1 className='text-3xl my-10 font-bold text-primaryGreen'>{ slides[currentIdx].title }</h1>
        <p className='text-center text-lg font-medium'>{ slides[currentIdx].text }</p>
    </div>
  )
}

