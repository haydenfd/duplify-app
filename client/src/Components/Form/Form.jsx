import React, { useState } from "react";
import {
  RadioGroup,
  Radio,
  cn,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { validateToken, BACKEND_ENDPOINTS } from "../../Utils";
import { CustomButton } from "../CustomButton/CustomButton";

export const Form = ({ playlist, user_id, setIsPlaylistCreationLoading }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [isPlaylistVisibilityPublic, setIsPlaylistVisibilityPublic] =
    useState(true);
  const [isValidPlaylistName, setIsValidPlaylistName] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handlePlaylistNameChange = (e) => {
    setPlaylistName(e.target.value);
    if (e.target.value.length > 0) {
      setIsValidPlaylistName(true);
    }
  };

  const handlePlaylistDescriptionChange = (e) => {
    setPlaylistDescription(e.target.value);
  };

  const handleSubmit = async () => {
    const token = validateToken();
    if (!token) {
      window.location.href = "/";
    } else {
      if (playlistName.length === 0) {
        setIsValidPlaylistName(false);
        return;
      }
      setIsValidPlaylistName(true);
      setIsPlaylistCreationLoading(true);
      const id = localStorage.getItem("duplify_playlist_id");
      const url =
        BACKEND_ENDPOINTS.CREATE_PLAYLIST + `?token=${token}&id=${id}`;

      const body = {
        user_id,
        playlistName,
        playlistDescription,
        playlistVisibility: isPlaylistVisibilityPublic,
      };

      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsPlaylistCreationLoading(false);
          setPlaylistName("");
          setPlaylistDescription("");
          setIsModalOpen(true);
          onOpen();
        })
        .catch((error) => {
          setIsPlaylistCreationLoading(false);
          console.error("Error creating playlist:", error);
        });
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 1 }}
        className="w-full bg-black border-4-black bg-opacity-60 rounded-3xl px-4 py-6 text-white text-3xl"
        style={{ boxShadow: "0 8px 8px #1DB954, 0 3px 3px rgba(0, 0, 0, 0.5)" }}
      >
        <div className="w-full font-semibold">
          <h2 className="inline">Clone </h2>
          <h2 className="text-primaryPurple inline">{playlist?.name} </h2>
          <h2 className="inline">by </h2>
          <h2 className="inline text-primaryGreen">
            {playlist?.owner?.display_name}{" "}
          </h2>
          <h2 className="inline bg-gradient-to-r from-purple-700 to-primaryPurple via-primaryGreen text-transparent bg-clip-text">
            ({playlist?.tracks?.total} songs)
          </h2>
        </div>
        <div className="my-6 flex flex-col items-center text-black relative">
          <div className="w-3/5 relative">
            <input
              type="text"
              className={`text-lg text-black rounded-md outline-none focus:outline-primaryGreen outline-4 p-2 w-full font-semibold ${!isValidPlaylistName ? "outline-red-500" : ""}`}
              placeholder="Give your playlist a name (Required)"
              value={playlistName}
              onChange={handlePlaylistNameChange}
            />
            {!isValidPlaylistName && (
              <p className="text-[16px] text-red-500 absolute mt-2 font-bold">
                Please enter a name
              </p>
            )}
          </div>
          <input
            type="text"
            className="text-lg my-14 rounded-md outline-none focus:outline-primaryGreen outline-4 p-2 w-3/5 font-semibold"
            placeholder="How about a description? (Optional)"
            value={playlistDescription}
            onChange={handlePlaylistDescriptionChange}
          />
          <RadioGroup
            orientation="horizontal"
            label="Make your playlist public or private?"
            onChange={(e) =>
              setIsPlaylistVisibilityPublic(
                e.target.value === "public" ? true : false,
              )
            }
            classNames={{
              label: cn("text-white text-lg text-left font-semibold mb-4"),
              base: cn("w-3/5 mb-8"),
            }}
            defaultValue="public"
          >
            <Radio
              value="public"
              color="success"
              classNames={{
                label: cn("text-white mr-20 text-center font-medium"),
                control: cn("p-4 bg-primaryGreen border-none outline-none"),
              }}
            >
              Public
            </Radio>
            <Radio
              value="private"
              color="success"
              classNames={{
                label: cn("text-white mr-20 text-center font-medium"),
                control: cn("p-4 bg-primaryGreen border-none outline-none"),
              }}
            >
              Private
            </Radio>
          </RadioGroup>
          <CustomButton
            onClickEvent={handleSubmit}
            textContent="Make me my playlist!"
          />
        </div>
      </motion.div>

      {isModalOpen && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="blur"
          hideCloseButton={true}
          className="bg-black font-medium w-1/2 "
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-2xl font-extrabold">
                  Playlist Created!
                </ModalHeader>
                <ModalBody>
                  <p className="text-lg">
                    Refresh Spotify to see the new playlist!
                  </p>
                </ModalBody>
                <ModalFooter>
                  <CustomButton
                    textContent="Close"
                    onClickEvent={onClose}
                    className="bg-primaryGreen font-semibold text-white"
                  />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
