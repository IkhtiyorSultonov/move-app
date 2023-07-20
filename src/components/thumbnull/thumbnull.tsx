import React from 'react'
import Image from 'next/image'
import { ThumbnullProps } from './thumbnull.props'
import { image_base } from 'src/helpers/contains'
import ReactStarts from 'react-stars';
import { useInfoStore } from 'src/store';

const Thumbnull = ({movie, isBig=false}:ThumbnullProps):JSX.Element => {
    

    const {setModal,setCurrentMovie}=useInfoStore();
    
    const handleCurrentMovie=()=>{
      setModal(true),
      setCurrentMovie(movie)
    }
  return (

    <div 
    onClick={handleCurrentMovie}
    className={` relative ${isBig?" md:h-[550px]  h-[400px] bottom-0 md:bottom-10 min-w-[300px]  md:min-w-[500px] ":"h-[330px] md:h-[440px]"  } min-w-[200px] md:min-w-[292px] cursor-pointer transition duration-200 ease-out md:h-[440px]  md:hover:scale-110`}>
        <Image  className=' rounded-sm md:rounded  object-cover'  src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title}
          fill/>

        <div className=' absolute left-0 right-0 bottom-0 top-0 bg-black/50 w-full h-full'>

        </div>
          <div className=' absolute bottom-5  left-2 right-2'>
          
      <div className="flex items-center md:space-x-2">
        <ReactStarts
          edit={false}
          count={10}
          value={movie.vote_average}
          size={25}
          color2={'#fff'}
          className='sm:!inline hidden'
        />
        <ReactStarts
          edit={false}
          count={7}
          value={movie.vote_average/1.25}
          size={22}
          color2={'#fff'}
          className='sm:!hidden block pt-2'
        />

        <p className=" mt-2">({movie.vote_count})</p>
       
   
      </div>
      <h1 className="text-2x1 font-bold md:text-4xl  ">
        {movie.title || movie.name || movie.original_name}
      </h1>
          </div>
    </div>
  )
}

export default Thumbnull