import React, { useEffect, useState } from 'react'
import CardLayout from '../cardlayout'
import { collection, getDocs } from '@firebase/firestore'
import db from '@/config/firestore'
import Image from 'next/image'
import Link from 'next/link'
import { getUser } from '@/service/AuthService'

const CardUserRecomendation = ({
    uid
}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        try {
          const response = await getUser()
          if(response.status === 'success'){
            getRecomendationUser(response.data)
          }
        } catch (error) {
          console.log(error)
        }
      }

    const getRecomendationUser = async (uidDevice) => {
        const docRef = collection(db, "users");
        const snapshot = await getDocs(docRef);
        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        // fil
        const filterData = data.filter(item => item.id !== uidDevice)
        const filterData2 = filterData.filter(item => item.id !== uid)
        const randomData = filterData2.sort(() => Math.random() - Math.random()).slice(0, 5)
        setUser(randomData)
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [uid])

    if (loading) return <p>Loading...</p>

    return (
        <CardLayout>
            <div className='py-4 px-5'>
                <p className='text-xl font-semibold'>Pengguna Lain</p>
                <hr className='my-2 w-20 border-t-1 border-primary-color' />
                <div className=' mt-5 flex flex-col gap-5'>
                    {
                        user.map((item, index) => (
                            <Link href={`/profile/${item.id}`} key={index}>
                                <div className='flex items-center hover:border p-1 hover:border-primary-color cursor-pointer rounded-md' key={index}>
                                    <div className='w-10 h-10 bg-gray-300 rounded-full'>
                                        {item.photoURL ? <Image src={item.photoURL} alt='profile' width={0} height={0} className='rounded-full w-full h-full' sizes=' (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
                                    </div>
                                    <div className='ml-3'>
                                        <p className='text-sm font-semibold'>{item.fullname}</p>
                                        <p className='text-xs text-gray-500'>{item.username}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </CardLayout>
    )
}

export default CardUserRecomendation