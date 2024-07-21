import CardProfile from '@/components/global/cardprofile'
import CardUserRecomendation from '@/components/global/carduserrecomendation'
import React from 'react'

const LeftBarHome = () => {
  return (
    <div className='w-[17rem] flex flex-col gap-7'>
        <CardProfile />
        <CardUserRecomendation />
    </div>
  )
}

export default LeftBarHome