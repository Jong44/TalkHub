import React from 'react'
import CardLayout from '../cardlayout'

const CardUserRecomendation = () => {
  return (
    <CardLayout>
        <div className='py-4 px-5'>
            <p className='text-xl font-semibold'>Pengguna Lain</p>
            <hr className='my-2 w-20 border-t-1 border-primary-color' />
            <div className=' mt-5 flex flex-col gap-5'>
                {
                    [1,2,3,4,5].map((item, index) => (
                        <div className='flex items-center' key={index}>
                            <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
                            <div className='ml-3'>
                                <p className='text-sm font-semibold'>John Doe</p>
                                <p className='text-xs text-gray-400'>jond12</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </CardLayout>
  )
}

export default CardUserRecomendation