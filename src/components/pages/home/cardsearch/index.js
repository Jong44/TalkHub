import CardLayout from '@/components/global/cardlayout'
import Icon from '@/components/global/icon'
import React from 'react'
import Image from 'next/image'

const CardSearch = () => {
  return (
    <CardLayout className={'rounded-full'}>
        <div className='flex gap-3 px-4 py-3'>
            <Image src={'/assets/icons/search.svg'} width={20} height={20} />
            <input type='text' placeholder='Cari sesuatu...' className='w-full bg-transparent border-b-1 border-gray-200 text-sm focus:outline-none' />
        </div>
    </CardLayout>
  )
}

export default CardSearch