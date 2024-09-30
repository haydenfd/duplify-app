import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { validateToken, BACKEND_ENDPOINTS } from "../Utils";
import { Form } from "../Components";
import { CustomButton } from "../Components";
import { Spinner } from "@nextui-org/react";
import { HOME_PAGE_ANIMATIONS } from "../Styles/animations";

const isValidSpotifyUrl = (url) => {
  const spotifyUrlPattern =
    /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?si=[a-zA-Z0-9]+)?$/;
  return spotifyUrlPattern.test(url);
};

export const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [user, setUser] = useState({});
  const [playlist, setPlaylist] = useState({});
  const [isInvalid, setIsInvalid] = useState(false);
  const [isPlaylistCreationLoading, setIsPlaylistCreationLoading] =
    useState(false);

  const getUser = async () => {
    const access_token = validateToken();
    if (access_token) {
      const url = BACKEND_ENDPOINTS.USER + `?access_token=${access_token}`;
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.user);
          setUser(data.user);
        });
    } else {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (validateToken()) {
      getUser();
    } else if (urlParams.get("access_token")) {
      const token = urlParams.get("access_token");
      const duplify_token = token;
      const expiration_time = new Date().getTime() + 59 * 60 * 1000;

      const token_data = {
        token: duplify_token,
        expiration_time: expiration_time,
      };

      localStorage.setItem("duplify_token", JSON.stringify(token_data));
      getUser();
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    if (isInvalid) {
      setIsInvalid(false);
    }
  };

  const searchPlaylistById = async (input_url) => {
    if (!isValidSpotifyUrl(input_url)) {
      setIsInvalid(true);
      return;
    }

    const re = /playlist\/([^/]+)\?/;
    const match = input_url.match(re);

    if (match && match[1]) {
      const _id = match[1];
      const token = validateToken();
      if (token) {
        const url =
          BACKEND_ENDPOINTS.FETCH_PLAYLIST + `?token=${token}&pid=${_id}`;
        await fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setPlaylist(data.data);
            console.log("Fetched playlist: " + _id);
            setIsInvalid(false);
          });
      } else {
        window.location.href = "/";
      }
    }
  };

  return (
    <>
      <motion.div
        initial={HOME_PAGE_ANIMATIONS["_div"].initial}
        animate={HOME_PAGE_ANIMATIONS["_div"].animate}
        transition={HOME_PAGE_ANIMATIONS["_div"].transition}
        className="text-center min-h-[90%] mt-8"
      >
        <h3 className="text-xl md:text-3xl font-semibold w-full leading-relaxed">
          Hi,{" "}
          <span className="inline text-primaryGreen">{user?.display_name}</span>
          . What playlists are we cloning today?
        </h3>

        <div className="w-[100vw] mt-10 flex flex-nowrap gap-8 mx-auto justify-center">
          <div className="flex flex-col w-1/2">
            <input
              type="text"
              placeholder="Enter a playlist URL"
              value={searchInput}
              onChange={handleInputChange}
              className={`outline-none p-2 rounded-xl w-full text-black text-md text-xl font-semibold border-3 ${isInvalid ? "border-red-500" : "focus:border-primaryGreen"}`}
            />
            {isInvalid && (
              <p className="text-red-500 text-left mt-2 font-semibold">
                This isn't a valid Spotify URL!
              </p>
            )}
          </div>
          <CustomButton
            onClickEvent={() => searchPlaylistById(searchInput)}
            textContent="Search"
            styles="h-[1/2]"
          />
        </div>
        <div className="mt-28 w-3/5 mx-auto">
          {Object.keys(playlist).length > 0 && (
            <Form
              playlist={playlist}
              user_id={user.id}
              setIsPlaylistCreationLoading={setIsPlaylistCreationLoading}
            />
          )}
        </div>
      </motion.div>

      {isPlaylistCreationLoading && (
        <div className="fixed inset-0 flex flex-col gap-y-12 items-center justify-center bg-black bg-opacity-80 z-50">
          <Spinner size="3xl" className="scale-[250%]" color="success" />
          <h2 className="text-white font-bold text-2xl">Loading...</h2>
        </div>
      )}
    </>
  );
};
