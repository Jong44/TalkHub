import React, { useState } from 'react'
import CardProfile from './CardProfile'
import CardUserRecomendation from '@/components/global/carduserrecomendation'
import CardProfileData from './CardProfileData'

const LeftBarProfileById = ({user, uid}) => {
  
  return (
    <div className='w-[17rem] flex flex-col gap-7 max-lg:w-[12rem] max-md:w-full'>
        <CardProfile photoProfile={user.photoURL} uid={uid} />
        <CardProfileData user={user} />
        <div className='max-md:hidden'>
        <CardUserRecomendation uid={uid} />
        </div>
    </div>
  )
}

export default LeftBarProfileById