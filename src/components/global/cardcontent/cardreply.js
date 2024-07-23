import React from 'react'
import Image from 'next/image'

const CardReply = ({
    name,
    time,
    content,
    photoProfile,
    onPressLike,
    onPressReply,
}) => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 bg-gray-100 p-3 rounded-md'>
                <div className='w-8 h-8 bg-gray-200 rounded-full relative'>
                    { photoProfile && <Image src={photoProfile} alt='profile' layout='fill' className='rounded-full' /> }
                </div>
                <div className='flex-1 text-xs'>
                    <p className='font-bold'>{name}</p>
                    <p className='text-xs text-gray-500'>{time}</p>
                    <p className='mt-3'>{content}</p>
                </div>
            </div>
            <div className='flex justify-end text-xs'>
                <p className='cursor-pointer hover:text-primary-color' onClick={onPressLike}>Suka</p>
                <p className='mx-2'>|</p>
                <p className='cursor-pointer hover:text-primary-color' onClick={onPressReply}>Balas</p>
            </div>
        </div>
    )
}

export default CardReply