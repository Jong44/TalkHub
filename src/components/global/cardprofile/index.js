import React from 'react'
import CardLayout from '@/components/global/cardlayout'

const CardProfile = () => {
  return (
    <CardLayout>
      <div className='flex flex-col items-center relative'>
        <div className=' w-full h-28 bg-gray-300'>
        </div>
        <div className='rounded-full w-20 h-20 bg-slate-50 -mt-10'>

        </div>
        <div className='px-4 pb-4'>
        <h1 className='text-xl font-semibold mt-2 text-center'>John Doe</h1>
        <p className='text-[13px] text-gray-400 text-center'>Halo!, Saya adalah seorang web developer</p>
        </div>
      </div>
    </CardLayout>
  )
}

export default CardProfile