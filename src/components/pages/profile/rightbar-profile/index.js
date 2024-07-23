import React from 'react'
import CardGrupByUser from './CardGrupByUser'
import CardProgramByUser from './CardProgramByUser'

const RightBarProfile = () => {
  return (
    <div className='w-[15rem] flex flex-col gap-7 max-lg:w-[12rem] max-md:hidden'>
        <CardGrupByUser />
        <CardProgramByUser />
    </div>
  )
}

export default RightBarProfile