import React, { useEffect } from "react";
import { motion } from "framer-motion";
// import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SLIDE_DATA, validateToken } from "../Utils";
import { Slideshow } from "../Components";
import { GuideCard } from "../Components";
import Step1 from '../Images/guide-step-1.png';
import Step2 from '../Images/guide-step-2.png';
import Step3 from '../Images/guide-step-3.png';
import Step4 from '../Images/guide-step-4.png';

export const Guide = () => {
  useEffect(() => {
    const token = validateToken();

    if (!token) {
      window.location.href = "/";
    }
  }, []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
            How to{" "}
            <h1 className="text-primaryGreen inline tracking-wider">Duplify</h1>
          </h1>
          {/* <Slideshow slides={SLIDE_DATA}/> */}
          <div className="w-[60%] mx-auto mt-4 max-h-[30%] mb-20">
            <Slider {...settings}>
              <div className="bg-primaryPurple flex flex-col border-2 border-primaryGreen">
                <img src={Step1} alt="Step 1" />
                <p className="p-2 font-semibold">
                  Get the URL to the playlist you want to clone using "Copy link to playlist".
                </p>
              </div>
              <div className="bg-primaryPurple flex flex-col border-2 border-primaryGreen">
                <img src={Step2} alt="Step 2" />
                <p className="p-2 font-semibold">
                  Copy this same link into the Search input.
                </p>
              </div>
              <div className="bg-primaryPurple flex flex-col border-2 border-primaryGreen">
                <img src={Step3} alt="Step 3" />
                <p className="p-2 font-semibold">
                  Give your playlist a name, an optional description, and if you want the new playlist to be public/private.
                </p>
              </div>
              <div className="bg-primaryPurple flex flex-col border-2 border-primaryGreen">
                <img src={Step4} alt="Step 4" />
                <p className="p-2 font-semibold">
                  Close and re-open Spotify to see your new playlist!
                </p>
              </div>
            </Slider>
          </div>
        </div>
      </motion.div>
    </>
  );
};
