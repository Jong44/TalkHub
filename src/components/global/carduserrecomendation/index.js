import React, { useEffect, useState } from 'react'
import CardLayout from '../cardlayout'
import { collection, getDocs } from '@firebase/firestore'
import db from '@/config/firestore'
import Image from 'next/image'

const CardUserRecomendation = ({
    uid
}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const getRecomendationUser = async () => {
        const docRef = collection(db, "users");
        const snapshot = await getDocs(docRef);
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        const filterData = data.filter(item => item.id !== uid)
        const randomData = filterData.sort(() => Math.random() - Math.random()).slice(0, 5)
        setUser(randomData)
        setLoading(false)
    }
    
    useEffect(() => {
        getRecomendationUser()
    }, [])

    if(loading) return <p>Loading...</p>

  return (
    <CardLayout>
        <div className='py-4 px-5'>
            <p className='text-xl font-semibold'>Pengguna Lain</p>
            <hr className='my-2 w-20 border-t-1 border-primary-color' />
            <div className=' mt-5 flex flex-col gap-5'>
                {
                    user.map((item, index) => (
                        <div className='flex items-center' key={index}>
                            <div className='w-10 h-10 bg-gray-300 rounded-full'>
                                {item.photoURL ? <Image src={item.photoURL} alt='profile' width={0} height={0} className='rounded-full w-full h-full' sizes=' (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
                            </div>
                            <div className='ml-3'>
                                <p className='text-sm font-semibold'>{item.fullname}</p>
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