import { IMove } from 'src/interfaces/app.interfaces';
import { HeroProps } from './hero.props';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { image_base } from 'src/helpers/contains';
import {TbPlayerPlayFilled} from "react-icons/tb"

const Hero = ({tranding}:HeroProps):JSX.Element => {
    console.log(tranding);
    const [movie, setmovie] = useState<IMove>({} as IMove)

    useEffect(()=>{
        const randomMovie=tranding[Math.floor(Math.random()*tranding.length)]

        console.log(randomMovie);
        
         setmovie(randomMovie)
    },[tranding])

    console.log(movie);
    
  return (
    <div className='flex flex-col space-y-2 py-20  md:space-y-4 lg:h-[65vh] lg:pb-12 justify-end'>
        <div className='absolute top-0 left-0 h-[95vh] -z-10 w-full'>
          <Image src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title} fill />  
        </div>

        <h1 className='text-2x1 font-bold md:text-4xl lg:text-7xl '>{movie.title || movie.name || movie.original_name}</h1>
        <p className=' max-w-xs md:max-w-lg  text-shadow-md lg:max-w-2x1 text-xs md:text-lg lg:text-2x1 ' >{movie.overview}</p>

       <div >

       <button className='bg-white/40 font-bold  space-x-2 flex justify-center items-center text-black bg w-[200px] h-[56px] rounded-full '>
        <TbPlayerPlayFilled className="h-5 w-5 md:h8 md:w-8"/>
        Watch Now
       </button>
       </div>
    </div>
    
  )
}

export default Hero