
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import WithAuth from '@/components/global/withauth'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from '@firebase/firestore'
import db from '@/config/firestore'
import CardContent from '@/components/global/cardcontent'
import { useRouter } from 'next/router'
import LeftBarProfileById from '@/components/pages/profileById/leftbar-profile'
import RightBarProfileById from '@/components/pages/profileById/rightbar-profiel'
import { getUser } from '@/service/AuthService'

const Index = () => {
    const router = useRouter()
    const idUser = router.query.idUser
    const [dataUser, setDataUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const [uid, setUid] = useState('')
    const [uidDevice, setUidDevice] = useState('')

    const getUserData = async () => {
        const docRef = doc(db, 'users', idUser)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()) {
            setDataUser(docSnap.data())
        } else {
            router.push('/404')
        }
    }

    const getPostByUser = async () => {
        const q = query(collection(db, 'posts'), where('uid', '==', idUser))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        setPosts(data)
        setLoading(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await getUser()
              if(response.status === 'success'){
                setUidDevice(response.data)
              }
            } catch (error) {
              console.log(error)
            } finally {
              setLoading(false)
            }
          }
        fetchData()
        setUid(idUser)
        getUserData()
        getPostByUser()
    }, [idUser])

    if (loading) return <p>Loading...</p>

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <main>
                <div className='w-full h-[24rem] bg-gray-200 relative'>
                    {
                        dataUser.banner ? (
                          <Image src={dataUser && dataUser.banner} width={0} height={0} className='w-full h-full object-cover object-center' sizes=' (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px' />
                      ) : (
                          null
                      )
                    }
                </div>
                <div className='w-full h-16 bg-white'>

                </div>
                <div className='flex gap-7 px-[13rem] mt-7 max-lg:px-5 max-lg:mt-5 max-md:flex-col'>
                    <LeftBarProfileById user={dataUser} uid={uid} />
                    <div className='flex-1'>
                        <div className='mt-7 flex flex-col gap-5'>
                            {posts.map((post, index) => {
                                return <CardContent key={index} item={post} uid={uidDevice} />
                            })}
                        </div>
                    </div>
                    <RightBarProfileById/>
                </div>
                <div className='h-20'>

                </div>
            </main>
        </>
    )
}

export default WithAuth(Index)