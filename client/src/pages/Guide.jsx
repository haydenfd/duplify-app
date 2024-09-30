import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { validateToken } from "../Utils";
// import { Slideshow } from "../Components";
import Step1 from '../Images/guide-step-1.png';
import Step2 from '../Images/guide-step-2.png';
import Step3 from '../Images/guide-step-3.png';
import Step4 from '../Images/guide-step-4.png';

export const Guide = () => {
  useEffect(() => {
    // const token = validateToken();

    // if (!token) {
    //   window.location.href = "/";
    // }
  }, []);

  function Arrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} scale-150`}
        style={{ ...style, display: "block", scale: 1.25 }}
        onClick={onClick}
      />
    );
  
  }
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />
  };

  return (
    <>
      <motion.div
        initial={{ y: "-1000%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "tween", duration: 1.5 }}
        className="text-center mb-8"
      >
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-5xl font-semibold">
            <h1 className="text-primaryGreen inline tracking-wider">Guide</h1>
          </h1>
          <div className="w-4/5 text-justify mx-auto mt-10">
            <p className="text-xl font-medium leading-8">Before explaining how to use this web app, I want to elaborate on why I created it. A while ago, some of my friends (also Spotify users) mentioned that they found playlists created by other users that they really liked. They expressed the desire to be able to customize these playlists by removing/adding songs. Obviously, they didn't have permissions to tinker with someone else's playlist (unless they knew them and could be added as collaborators). The alternative? Manually copy over each song to a new playlist. But playlists can get arbitrarily large, so this can be an extremely tedious process. That's where Duplify comes in. It automates the entire playlist replication process to a playlist in your account. Have fun!</p>
          </div>
          <div className="max-w-[60%] mx-auto mt-10 min-h-[35%] mb-20">
            <Slider {...settings}>
              <div className="bg-primaryPurple flex flex-col border-2 border-primaryGreen">
              <p className="p-2 font-semibold text-xl">
                  Get the URL to the playlist you want to clone using "Copy link to playlist".
                </p>
                <img src={Step1} alt="Step 1" />
              </div>
              <div className="bg-primaryPurple flex flex-col border-2 border-primaryGreen">
              <p className="p-2 font-semibold text-xl">
                  Copy this same link into the Search input.
                </p>                
                <img src={Step2} alt="Step 2" />
              </div>
              <div className="bg-primaryPurple flex flex-col border-2 ">
                <p className="p-2 font-semibold text-xl">
                  Give your playlist a name, an optional description, and if you want the new playlist to be public/private.
                </p>
                <img src={Step3} alt="Step 3" />
              </div>
              <div className="bg-primaryPurple flex flex-col border-2 ">
                <p className="p-2 font-semibold text-xl">
                  Close and re-open Spotify to see your new playlist!
                </p>
                <img src={Step4} alt="Step 4" />
              </div>
            </Slider>
          </div>
        </div>
      </motion.div>
    </>
  );
};
