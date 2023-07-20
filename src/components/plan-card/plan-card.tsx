import React from 'react'

import { RiVipCrown2Fill } from 'react-icons/ri';
import { AiOutlineHourglass } from 'react-icons/ai';
import { PiVideoFill } from 'react-icons/pi';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import { PlanCardProps } from './plan-cardProps';



const PlanCard = ({product}:PlanCardProps) => {
  const [isloading, setisloading] = useState<boolean>(false)
  const {user}=useContext(AuthContext)

  const onSubmitSubscraption= async (priceId:string)=>{
    setisloading(true)
    const payload={email:user?.email,priceId}
    try{
      const response=await fetch('api/subscraption',{
        method:'POST',
        headers:{'Content-Type':"application/json"},
        body:JSON.stringify(payload)
      })
      const data=await response.json()
      window.open(data.subscraption.url)
    
      
    }
    catch( error){
      setisloading(false)
    }

   
    
  }
  return (
    <div className='max-w-sm  m-3 md:m-0 cursor-pointer bg-white/20 px-6 pt-6 pb-2 rounded-xl shadow-lg transform md:hover:scale-105 transition duration-500'>
    <h3 className='mb-3 text-xl font-bold text-[#E10856]'>{product.name}</h3>
    <div className='relative  '>
        {/* eslint-disable-next-line */}
        <img src={product.images[0]}
            alt='Colors'
            className='rounded-xl w-full h-[280px]'
        />
        <p className='absolute top-0 bg-black/90 text-white font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg'>{(product.default_price.unit_amount/100).toLocaleString("en-US",{style:'currency',currency:'USD'})}</p>
        <div className='absolute rounded-xl left-0 right-0 bottom-0 top-0 bg-black/20 w-full h-full' />
    </div>
    <div className='border-[1px] border-white/20 mt-4' />
    <button onClick={()=>onSubmitSubscraption(product.default_price.id)} className='mt-4 w-full bg-[#E10856] py-4 rounded hover:opacity-80 font-semibold' disabled={isloading}>{isloading ? "Loading...":"BUY PLAN"}</button>
    <div className='my-4 flex flex-col space-y-2'>
      {product.metadata.adv.split(',').map((c,id)=>(

        <div key={id} className='flex space-x-2  items-center'>
          {id==0 && <RiVipCrown2Fill className='w-5 h-5' />}
          {id==1 && <AiOutlineHourglass className='w-5 h-5' />}
          {id==2 && <PiVideoFill className='w-5 h-5' />}
            <p>{c}</p>
        </div>
      ))}
       
    </div>
    </div>
  )
}

export default PlanCard