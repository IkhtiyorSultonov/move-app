import MuiModal from "@mui/material/Modal";
import { useInfoStore } from "src/store";
import { GrClose } from "react-icons/gr";
import { FaPlay, FaPause } from "react-icons/fa";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillSound,
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineClose,
} from "react-icons/ai";
import { BsVolumeMute } from "react-icons/bs";
import React, { useContext, useEffect, useState } from "react";
import { Element } from "src/interfaces/app.interfaces";
import ReactPlayer from "react-player";

import { addDoc, collection } from "firebase/firestore";
import { db } from "src/Firebase";
import { AuthContext } from "src/context/auth.context";
import { useRouter } from "next/router";
import { Button, IconButton, Snackbar } from "@mui/material";

const Modal = () => {
  const { modal, setModal, currentMovie } = useInfoStore();
  const [trailer, setTrailer] = useState<string>("");
  const { user } = useContext(AuthContext);
  const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key = process.env.NEXT_PUBLIC_API_KEY as string;
  const api = `${base_url}/${
    currentMovie?.media_type === "tv" ? "tv" : "movie"
  }/${currentMovie.id}/videos?api_key=${api_key}&language=en-US`;
  ////////////////////////
  const hanleclose = () => {
    setModal(false);
  };
  const router = useRouter();
  const [muted, setMuted] = useState<boolean>(true);
  const [palying, setpalying] = useState<boolean>(false);
  const [volume, setvolume] = useState<number>();
  const [loading, setloading] = useState<boolean>(false);
  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then((res) => res.json());
      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data?.results[index]?.key);
      }
    };

    fetchVideoData();
    //eslint-disable-nex-line
  }, [currentMovie]);
  /////////////
  const addProductList = async () => {
    setloading(true);
    try {
      const docRef = await addDoc(collection(db, "list"), {
        userId: user?.uid,
        product: currentMovie,
      });
      setloading(false);
      setOpen(true);
      router.replace(router.asPath);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  ///////////////
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleCloseS = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const action = (
    <>
      <Button   size="small" onClick={handleCloseS}>
      
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseS}
      >
        <AiOutlineClose fontSize="small" className="w-7 h-7" />
      </IconButton>
    </>
  );
  /////////////////
  return (
    <MuiModal
      open={modal}
      onClose={hanleclose}
      className=" mt-[50px] md:mt-auto fixed !top-7 pl-2 pr-2  md:pl-0 md:pr-0 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <Snackbar
         
          open={open}
          autoHideDuration={6000}
          onClose={handleCloseS}
          message="SUCCES"
          action={action}
        />
        <button
          onClick={hanleclose}
          className="modalButton1 hover:text-[#fff] text-[20px] absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#fff]"
        >
          <GrClose />
        </button>
        <div className=" relative md:pt-[55%] pt-[60%] ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            style={{ position: "absolute", top: "0", left: "0" }}
            width={"100%"}
            height={"100%"}
            playing={palying}
            muted={muted}
            volume1={volume}
            className="absolute top-0, left-0"
          />

          <div className=" absolute top-[180px] md:top-auto bottom-10  md:left-10 flex w-full items-center justify-between px-10 ">
            <div className="flex space-x-2">
              <button
                onClick={() => setpalying((play) => !play)}
                className="modalButton "
              >
                {palying ? (
                  <FaPause className="mobile  " />
                ) : (
                  <FaPlay className="mobile  " />
                )}
              </button>

              <button onClick={addProductList} className="modalButton">
                {loading ? "..." : <AiOutlinePlus />}
              </button>
              <button className="modalButton">
                <AiOutlineLike className="mobile" />
              </button>
              <button className="modalButton">
                <AiOutlineDislike className="mobile " />
              </button>
            </div>
            <button
              className="modalButton   "
              onClick={() => setMuted((prev) => !prev)}
            >
              {muted ? (
                <BsVolumeMute className="mobile " />
              ) : (
                <AiFillSound className="mobile " />
              )}
            </button>
          </div>
        </div>

        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">{currentMovie?.release_date}</p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6 sm:!inline hidden" >{currentMovie?.overview}</p>
              <p className="w-5/6 sm:!hidden inline" >{(currentMovie?.overview).slice(0,145) }</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
