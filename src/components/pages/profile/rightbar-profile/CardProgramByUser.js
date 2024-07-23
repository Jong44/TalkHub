import CardLayout from '@/components/global/cardlayout'
import React from 'react'

const CardProgramByUser = () => {
  return (
    <CardLayout className={"py-4 px-5"}>
        <p className='text-lg font-semibold'>Program yang kamu ikuti</p>
        <hr className='my-2 w-20 border-t-1 border-primary-color' />
        <p className='text-sm text-gray-400'>Kamu belum bergabung dengan program apapun</p>
    </CardLayout>
  )
}

export default CardProgramByUser