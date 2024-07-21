import React from 'react'
import CardLayout from '../cardlayout'

const CardTrending = () => {
    return (
        <CardLayout>
            <div className='px-4 py-3'>
                <p className='text-xl font-semibold'>Trending</p>
                <hr className='my-2 w-20 border-t-1 border-primary-color' />
                <div className='flex flex-col gap-3 mt-3'>
                    {
                        Array(5).fill().map((_, index) => (
                            <div className='flex flex-col' key={index}>
                                <p className='font-bold text-sm'>#Trending {index}</p>
                                <p className='text-xs text-gray-400'>1000 Post</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </CardLayout>
    )
}

export default CardTrending