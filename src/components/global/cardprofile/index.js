import React, { useEffect, useState } from 'react'
import CardLayout from '@/components/global/cardlayout'
import { getUser } from '@/service/AuthService'
import { doc, getDoc } from '@firebase/firestore'
import db from '@/config/firestore'
import Image from 'next/image'

const CardProfile = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)

  const handleGetData = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setData(docSnap.data())
    }else{
        console.log('Data tidak ditemukan')
    }
  }
  useEffect(() => {
   const fetchData = async () => {
      try {
        const response = await getUser()
        if(response.status === 'success'){
          handleGetData(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
   }
   fetchData()
  } , [])

  if(loading){
    return <CardLayout>
      <div className=' w-full h-screen flex justify-center items-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-color'></div>
      </div>
    </CardLayout>
  }


  return (
    <CardLayout>
      <div className='flex flex-col items-center relative'>
        <div className=' w-full h-28 bg-gray-300'>
        </div>
        <div className='rounded-full w-20 h-20 bg-slate-50 -mt-10 relative'>
          {data.photoURL ? <Image src={data.photoURL} alt='profile' width={80} height={80} className='rounded-full' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
        </div>
        <div className='px-4 pb-4'>
        <h1 className='text-xl font-semibold mt-2 text-center'>{data.fullname}</h1>
        {data.bio ? <p className='text-sm text-gray-500 text-center'>{data.bio}</p> : <p className='text-sm text-gray-500 text-center'>Silahkan tambahkan bio</p>}
        </div>
      </div>
    </CardLayout>
  )
}

export default CardProfile