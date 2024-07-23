import CardLayout from '@/components/global/cardlayout'
import CardProfile from '@/components/global/cardprofile'
import CardUserRecomendation from '@/components/global/carduserrecomendation'
import db from '@/config/firestore'
import { doc, getDoc } from '@firebase/firestore'
import React, { useEffect, useState } from 'react'
import { getUser } from '@/service/AuthService'

const LeftBarHome = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [uid, setUid] = useState('')

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
          setUid(response.data)
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
    <div className='w-[17rem] flex flex-col gap-7 max-lg:w-[12rem] max-md:hidden'>
        <CardProfile data={data} />
        <CardUserRecomendation uid={uid} />
    </div>
  )
}

export default LeftBarHome