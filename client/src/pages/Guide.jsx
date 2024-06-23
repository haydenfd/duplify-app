import React, { useEffect } from "react";
import { motion } from "framer-motion";
// import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SLIDE_DATA, validateToken } from "../Utils";
import { Slideshow } from "../Components";
import { GuideCard } from "../Components";
import { Step1, Step2, Step3 } from "../Images";

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
        className="text-center"
      >
        <div className="text-center mt-10">
          <h1 className="text-3xl md:text-5xl font-semibold">
            How to{" "}
            <h1 className="text-primaryGreen inline tracking-wider">Duplify</h1>
          </h1>
          {/* <Slideshow slides={SLIDE_DATA}/> */}
          <div className="w-[60%] mx-auto mt-4 max-h-[40%]">
            <Slider {...settings}>
              <div className="bg-green-600 flex flex-col">
                <img src={Step1} alt="Step 1" />
                <p>
                  Find the playlist that you'd like to clone. Click the more
                  options button (3 dots).
                </p>
              </div>
              <div className="bg-green-600 flex flex-col">
                <img src={Step2} alt="Step 2" />
                <p>
                  At the very bottom of the dropdown menu, click on Share.
                  Choose \"Copy link to playlist\". The playlist link will be
                  saved to your clipboard.
                </p>
              </div>
              <div className="bg-green-600 flex flex-col">
                <img src={Step3} alt="Step 3" />
                <p>Paste the URL and xxx.</p>
              </div>
              <div className="bg-green-600 flex flex-col">
                <h1>1</h1>
                <h2>1</h2>
              </div>
              <div className="bg-green-600 flex flex-col">
                <h1>1</h1>
                <h2>1</h2>
              </div>
            </Slider>
          </div>
        </div>
      </motion.div>
    </>
  );
};
