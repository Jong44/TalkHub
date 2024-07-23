import React, { useEffect, useState } from 'react'
import CardLayout from '@/components/global/cardlayout'
import { getUser } from '@/service/AuthService'
import { doc, getDoc } from '@firebase/firestore'
import db from '@/config/firestore'
import Image from 'next/image'

const CardProfile = ({
  data
}) => {

  return (
    <CardLayout>
      <div className='flex flex-col items-center relative'>
        <div className=' w-full h-28 bg-gray-300'>
          {
            data.banner ? <Image src={data.banner} alt='banner' width={0} height={0} className='w-full h-full object-cover' sizes=' (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px' /> : null
          }
        </div>
        <div className='rounded-full w-20 h-20 bg-slate-50 -mt-10 relative'>
          {data.photoURL ? <Image src={data.photoURL} alt='profile' width={0} height={0} className='w-full h-full rounded-full' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
        </div>
        <div className='px-4 pb-4'>
        <h1 className='text-xl font-semibold mt-2 text-center'>{data.fullname}</h1>
        {data.bio ? <p className='text-sm text-gray-500 text-center'>{data.bio}</p> : <p className='text-sm text-gray-500 text-center'>Silahkan tambahkan bio</p>}
        </div>
      </div>
    </CardLayout>
  )
}

export default CardProfile