import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { doc, getDoc } from '@firebase/firestore'
import db from '@/config/firestore'

const CardReply = ({
    time,
    content,
    uid,
    onPressLike,
    onPressReply,
}) => {
    const [user, setUser] = useState({})
    const getUser = async () => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUser(docSnap.data())
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    return (
        <div className='flex flex-col gap-2'>
            <div className='flex gap-2 bg-gray-100 p-3 rounded-md'>
                <div className='w-8 h-8 bg-gray-200 rounded-full relative'>
                {user.photoURL && user.photoURL !== "" ? <Image src={user.photoURL} alt='profile' width={0} height={0} className='rounded-full w-full h-full object-cover' sizes=' (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
                </div>
                <div className='flex-1 text-xs'>
                    <p className='font-bold'>{user.fullname}</p>
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