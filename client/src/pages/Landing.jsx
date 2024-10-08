import React from "react";
import { motion } from "framer-motion";
import { BACKEND_ENDPOINTS } from "../Utils";
import { CustomButton } from "../Components";
import { LANDING_PAGE_ANIMATIONS } from "../Styles/animations";
import { useNavigate } from 'react-router-dom';

export const Landing = () => {

  const navigate = useNavigate();

  const handleGuideRedirect = () => {
    navigate('/guide');
  };

  const OauthRedirect = () => {
    window.location.href = BACKEND_ENDPOINTS.AUTHORIZE;
  };

  return (
    <div className="min-h-[25rem] text-center flex flex-col justify-center my-auto">
      <motion.h1
        className="font-bold text-5xl md:text-7xl tracking-widest uppercase"
        initial={LANDING_PAGE_ANIMATIONS["_h1"].initial}
        animate={LANDING_PAGE_ANIMATIONS["_h1"].animate}
        transition={LANDING_PAGE_ANIMATIONS["_h1"].transition}
      >
        DUPLIFY
      </motion.h1>
      <motion.h1
        className="font-medium text-xl md:text-3xl mt-6 text-center leading-relaxed px-4"
        initial={LANDING_PAGE_ANIMATIONS["_h1"].initial}
        animate={LANDING_PAGE_ANIMATIONS["_h1"].animate}
        transition={LANDING_PAGE_ANIMATIONS["_h1"].transition}
      >
        Clone the contents of other Spotify playlists to a personal playlist!
      </motion.h1>
      <motion.div
        className="mt-10 w-full flex flex-row gap-8 justify-center"
        initial={LANDING_PAGE_ANIMATIONS["_div"].initial}
        animate={LANDING_PAGE_ANIMATIONS["_div"].animate}
        variants={LANDING_PAGE_ANIMATIONS["_div"].variants}
        transition={LANDING_PAGE_ANIMATIONS["_div"].transition}
      >
        <CustomButton
          onClickEvent={() => OauthRedirect()}
          textContent="Sign in with Spotify"
        />
        <CustomButton
          onClickEvent={() => handleGuideRedirect()}
          textContent="How does it work?"
        />
      </motion.div>
    </div>
  );
};
