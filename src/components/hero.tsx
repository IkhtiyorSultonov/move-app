import { IMove } from "src/interfaces/app.interfaces";
import { HeroProps } from "./hero.props";
import { useEffect, useState } from "react";
import Image from "next/image";
import ReactStarts from "react-stars";
import { image_base } from "src/helpers/contains";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { useInfoStore } from "src/store";

const Hero = ({ tranding }: HeroProps): JSX.Element => {

  const [movie, setmovie] = useState<IMove>({} as IMove);
  const {setModal,setCurrentMovie}=useInfoStore()
  const handleCurrentMovie=()=>{
    setModal(true),
    setCurrentMovie(movie)
  }
  useEffect(() => {
    const randomMovie = tranding[Math.floor(Math.random() * tranding.length)];

   

    setmovie(randomMovie);
  }, [tranding]);

  return (
    <div className="flex flex-col space-y-2 py-20  md:space-y-4 lg:h-[65vh] lg:pb-12 lg:center">
      <div className="absolute top-0 left-0 h-[95vh] -z-10 w-full">
        <Image
          src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title}
          fill
        />
      </div>
      <div className="py-[4px] px-[8px] text-center rounded-bl-[8px] rounded-tr-[8px] bg-[#e5e5e5]/50 inline-block w-[111px]">
        {movie.media_type}
      </div>
      <div className="flex items-centern space-x-2">
        <ReactStarts
          edit={false}
          count={10}
          value={movie.vote_average}
          size={25}
        />
        <p className=" mt-2">({movie.vote_count})</p>
      </div>
      <h1 className="text-2x1 font-bold md:text-4xl lg:text-7xl ">
        {movie.title || movie.name || movie.original_name}
      </h1>
      <p className=" max-w-xs md:max-w-lg  text-shadow-md lg:max-w-2x1 text-xs md:text-lg lg:text-2x1 ">
        {movie.overview?.slice(0, 100)}...
      </p>

      <div>
        <button onClick={handleCurrentMovie} className="bg-white/60 font-bold  space-x-2 flex transition-all hover:bg-white/80 justify-center items-center text-black bg w-[200px] h-[56px] rounded-full ">
          <TbPlayerPlayFilled className="h-5 w-5 md:h8 md:w-8" />
          Watch Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
