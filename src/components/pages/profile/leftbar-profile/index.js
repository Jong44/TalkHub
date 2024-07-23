import React from 'react'
import CardProfile from './CardProfile'
import CardUserRecomendation from '@/components/global/carduserrecomendation'
import CardProfileData from './CardProfileData'

const LeftBarProfile = ({user, uid}) => {
  return (
    <div className='w-[17rem] flex flex-col gap-7 max-lg:w-[12rem] max-md:hidden'>
        <CardProfile photoProfile={user.photoURL} uid={uid} />
        <CardProfileData user={user} />
        <CardUserRecomendation uid={uid} />
    </div>
  )
}

export default LeftBarProfile