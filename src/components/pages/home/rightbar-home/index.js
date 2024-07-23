import CardProfile from '@/components/global/cardprofile'
import CardUserRecomendation from '@/components/global/carduserrecomendation'
import React from 'react'
import CardSearch from '@/components/pages/home/cardsearch'
import CardTrending from '@/components/global/cardtrending'

const RightBarHome = () => {
  return (
    <div className='w-[15rem] flex flex-col gap-7 max-lg:w-[12rem] max-md:hidden'>
        <CardSearch />
        <CardTrending />
    </div>
  )
}

export default RightBarHome