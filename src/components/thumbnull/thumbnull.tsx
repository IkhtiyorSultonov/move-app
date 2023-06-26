import React from 'react'
import Image from 'next/image'
import { ThumbnullProps } from './thumbnull.props'
import { image_base } from 'src/helpers/contains'

const Thumbnull = ({movie}:ThumbnullProps) => {
  return (
    <div className=' relative h-[330px] min-w-[292px] cursor-pointer transition duration-200 ease-out md:h-[440px] md:min-w-[292px] md:hover:scale-110'>
        <Image  className=' rounded-sm md:rounded  object-cover'  src={`${image_base}${movie?.backdrop_path || movie?.poster_path}`}
          alt={movie?.title}
          fill/>
    </div>
  )
}

export default Thumbnull