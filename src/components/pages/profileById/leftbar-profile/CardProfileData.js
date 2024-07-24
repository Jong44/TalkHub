import CardLayout from '@/components/global/cardlayout'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import db from '@/config/firestore'
import { doc, setDoc } from '@firebase/firestore'

const CardProfileData = ({ user }) => {
    const [dataView, setDataView] = useState(user)
    const [dataUser, setDataUser] = useState(user)

    useEffect(() => {
        setDataView(user)
    }, [user])



    return (
        <CardLayout className={"py-4 px-5"}>
            <p className='text-xl font-semibold'>{dataView.fullname}</p>
            <hr className='my-2 w-20 border-t-1 border-primary-color' />
            <p className='text-sm text-start mt-5 mb-3 text-gray-500'>
                {dataView.bio}
            </p>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/user-octagon.svg' width={20} height={20} />
                    {dataView.username ? (
                        <p className='text-[13px] font-semibold text-gray-500 cursor-pointer'>{dataView.username}</p>
                    ) : (
                        <p className='text-[13px] font-semibold text-gray-500'>Belum ditambahkan</p>
                    )
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/briefcase.svg' width={20} height={20} />
                    {dataView.job ? (
                        <p className='text-[13px] font-semibold text-gray-500'>{dataView.job}</p>
                    ) : (
                        <p className='text-[13px] font-semibold text-gray-500'>Belum ditambahkan</p>
                    )
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/map.svg' width={20} height={20} />
                    {dataView.location ? (
                        <p className='text-[13px] font-semibold text-gray-500'>{dataView.location}</p>
                    ) : (
                        <p className='text-[13px] font-semibold text-gray-500'>Belum ditambahkan</p>
                    )
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/profile.svg' width={20} height={20} />
                    {user.gender ? (
                        <p className='text-[13px] font-semibold text-gray-500'>{dataView.gender}</p>
                    ) : (
                        <p className='text-[13px] font-semibold text-gray-500'>Belum ditambahkan</p>
                    )
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/school.svg' width={20} height={20} />
                    {user.education ? (
                        <p className='text-[13px] font-semibold text-gray-500'>{dataView.education}</p>
                    ) : (
                        <p className='text-[13px] font-semibold text-gray-500'>Belum ditambahkan</p>
                    )
                    }
                </div>
            </div>
        </CardLayout>
    )
}

export default CardProfileData