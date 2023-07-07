import MuiModal from "@mui/material/Modal";
import { useInfoStore } from "src/store";
import { GrClose } from "react-icons/gr";
import { FaPlay ,FaPause} from "react-icons/fa";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillSound,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { BsVolumeMute } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Element } from "src/interfaces/app.interfaces";
import ReactPlayer from "react-player";

const Modal = () => {
  const { modal, setModal, currentMovie } = useInfoStore();
  const [trailer, setTrailer] = useState<string>("");

  const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
  const api_key = process.env.NEXT_PUBLIC_API_KEY as string;
  const api = `${base_url}/${
    currentMovie?.media_type === "tv" ? "tv" : "movie"
  }/${currentMovie.id}/videos?api_key=${api_key}&language=en-US`;
  const hanleclose = () => {
    setModal(false);
  };
  const [muted, setMuted] = useState<boolean>(true);
  const [palying, setpalying] = useState<boolean>(false)
  const [volume, setvolume] = useState<number>()

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await fetch(api).then((res) => res.json());
      // console.log(data);

      if (data?.results) {
        const index = data.results.findIndex(
          (el: Element) => el.type === "Trailer"
        );
        setTrailer(data?.results[index]?.key);
      }
    };

    console.log(trailer);

    fetchVideoData();
    //eslint-disable-nex-line
  }, [currentMovie]);

  return (
    <MuiModal
      open={modal}
      onClose={hanleclose}
      className=" fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide"
    >
      <>
        <button
          onClick={hanleclose}
          className="modalButton1 hover:text-[#fff] text-[20px] absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#fff]"
        >
          <GrClose />
        </button>
        <div className=" relative pt-[55%]">
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

          <div className=" absolute bottom-10 left-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button  onClick={()=>setpalying((play)=>!play)} className="modalButton ">
               {palying?<FaPause className="h-7 w-7 "/>: <FaPlay className="h-7 w-7 "/>}
              </button>
              <button onClick={()=>setvolume(0)} className="modalButton">
              <AiOutlineMinus />
              </button>
              <button onClick={()=>setvolume(1)} className="modalButton">
              <AiOutlinePlus />
              </button>
              <button className="modalButton">
                <AiOutlineLike className="w-7 h-7" />
              </button>
              <button className="modalButton">
                <AiOutlineDislike className="w-7 h-7" />
              </button>
              <button
                className="modalButton"
                onClick={() => setMuted((prev) => !prev)}
              >
                {muted ? (
                  <BsVolumeMute className="w-7 h-7" />
                ) : (
                  <AiFillSound className="w-7 h-7" />
                )}
              </button>
            </div>
          </div>
        </div>
                  
				<div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
					<div className='space-y-6 text-lg'>
						<div className='flex items-center space-x-2 text-sm'>
							<p className='font-semibold text-green-400'>{currentMovie!.vote_average * 10}% Match</p>
							<p className='font-light'>{currentMovie?.release_date}</p>
							<div className='flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs'>HD</div>
						</div>

						<div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
							<p className='w-5/6'>{currentMovie?.overview}</p>
							<div className='flex flex-col space-y-3 text-sm'>
								<div>
									<span className='text-[gray]'>Original language:</span> {currentMovie?.original_language}
								</div>

								<div>
									<span className='text-[gray]'>Total votes:</span> {currentMovie?.vote_count}
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
