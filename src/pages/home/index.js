import CardContent from '@/components/global/cardcontent'
import CardPosting from '@/components/global/cardposting'
import WithAuth from '@/components/global/withauth'
import LeftBarHome from '@/components/pages/home/leftbar-home'
import RightBarHome from '@/components/pages/home/rightbar-home'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { getUser } from '@/service/AuthService'
import { collection, doc, getDoc, getDocs } from '@firebase/firestore'
import db from '@/config/firestore'

const Home = () => {
  const [dataUser, setDataUser] = useState({})
  const [dataContent, setDataContent] = useState([])
  const [loading, setLoading] = useState(true)
  const [uid, setUid] = useState('')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUser()
        if(response.status === 'success'){
          setUid(response.data)
          handleGetDataUser(response.data)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    handleGetDataContent()
  }, [])

  const handleGetDataUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        setDataUser(docSnap.data())
    }else{
        console.log('Data tidak ditemukan')
    }
  }

  const handleGetDataContent = async () => {
    const contentRef = collection(db, 'posts')
    const snapshot = await getDocs(contentRef)
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    })
    const orderContent = data.sort((a, b) => b.createdAt - a.createdAt)
    setDataContent(orderContent)
  }

  if(loading) return <p>Loading...</p>

  return (
    <>
        <Head>
            <title>Home</title>
            <meta name="description" content="Home page" />
        </Head>
        <main>
          <div className='flex gap-7 px-[13rem] mt-7 max-lg:px-5 max-lg:mt-5 max-md:flex-col'>
            <LeftBarHome/>
            <div className='flex-1'>
              <CardPosting uid={uid} photoURL={dataUser.photoURL} />
              <div className='mt-7 flex flex-col gap-5'>
               {dataContent.map((item, index) => (
                 <CardContent key={index} item={item} uid={uid} />
               ))}
              </div>
            </div>
            <RightBarHome />
          </div>
          <div className='h-20'>

          </div>
        </main>
    </>
  )
}

export default WithAuth(Home)