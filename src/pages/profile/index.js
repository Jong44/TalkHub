import CardLayout from '@/components/global/cardlayout'
import CardPosting from '@/components/global/cardposting'
import LeftBarHome from '@/components/pages/home/leftbar-home'
import RightBarHome from '@/components/pages/home/rightbar-home'
import LeftBarProfile from '@/components/pages/profile/leftbar-profile'
import RightBarProfile from '@/components/pages/profile/rightbar-profile'
import Head from 'next/head'
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import PrimaryButton from '@/components/global/primarybutton'
import { getUser } from '@/service/AuthService'
import WithAuth from '@/components/global/withauth'
import { collection, doc, getDoc, getDocs, query, setDoc, where } from '@firebase/firestore'
import db from '@/config/firestore'
import CardContent from '@/components/global/cardcontent'
import Swal from 'sweetalert2'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@firebase/storage'
import { useRouter } from 'next/router'

const Profile = () => {
    const router = useRouter()
    const refBanner = useRef(null)
    const [banner, setBanner] = useState(null)
    const [photo, setPhoto] = useState(null)
    const [progress, setProgress] = useState(0)
    const [dataUser, setDataUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [uid, setUid] = useState('')
    const [posts, setPosts] = useState([])

    const alertUpload = () => {
        Swal.fire({
          title: 'Sedang Mengupload!',
          didOpen: () => {
            const timer = setInterval(() => {
              setProgress((prev) => {
                if(prev >= 100) {
                  clearInterval(timer);
                  return 100;
                }
                return prev + 10;
              }
              )
            }, 1000)
          },
          showConfirmButton: false,
        }) 
      }
    
    const alertSwals = ({title, status, icon}) => {
        Swal.fire({
          title,
          icon,
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        })
      }

    const handleBanner = () => {
        refBanner.current.click()
    }

    const handleFile = (e) => {
        const file = e.target.files[0]
        const name = e.target.name

        if (file) {
            if (name === 'banner') {
                setBanner(URL.createObjectURL(file))
                setPhoto(file)
            }
        }
    }

    const handleGetDataUser = async (uid) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setDataUser(docSnap.data())
        } else {
            console.log('Data tidak ditemukan')
        }
    }

    const getPostByUser = async (uid) => {
        const dataRef = collection(db, 'posts')
        const querySnap = query(dataRef, where('uid', '==', uid))
        const dataSnap = await getDocs(querySnap)
        const data = dataSnap.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        setPosts(data.sort((a, b) => b.createdAt - a.createdAt))
    }

    const handleUpload = async () => {
        try {
            if (photo) {
                const storage = getStorage()
                const storageRef = ref(storage, `banner/${uid}/` + photo.name)
                alertUpload()
                const uploadTask = uploadBytesResumable(storageRef, photo)
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done');
                }, (error) => {
                    alertSwals({ title: 'Gagal Upload Profile', status: 'error', icon: 'error' })
                }, () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        updateFirestore({ urlPhoto: url })
                        alertSwals({ title: 'Berhasil Upload Profile', status: 'success', icon: 'success' })
                    })
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveBanner = () => {
        handleUpload()
        setBanner(null)
        router.reload()
      }
    
      const updateFirestore = ({
        urlPhoto
      }) => {
        const docRef = doc(db, 'users', uid)
        setDoc(docRef, {
          banner: urlPhoto
        }, { merge: true })
      }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUser()
                if (response.status === 'success') {
                    setUid(response.data)
                    handleGetDataUser(response.data)
                    getPostByUser(response.data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    if (loading) return <p>Loading...</p>

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <main>
                <div className='w-full h-[24rem] bg-gray-200 relative'>
                    {
                        banner ? (
                            <Image src={banner} width={0} height={0} className='w-full h-full object-cover object-center' />
                        ) : (
                            dataUser.banner ? (
                                <Image src={dataUser && dataUser.banner} width={0} height={0} className='w-full h-full object-cover object-center' sizes=' (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1024px' />
                            ) : (
                                null
                            )
                        )
                    }

                    <div className='absolute right-5 bottom-5 flex justify-end items-end gap-5'>
                        {
                            banner ? (
                                <div className='flex gap-5'>
                                    <div className='w-24'>
                                        <PrimaryButton onClick={handleSaveBanner} text={"Simpan"} />
                                    </div>
                                    <div className='w-24'>
                                        <div className='bg-white rounded-md py-2 mt-5 w-full cursor-pointer hover:bg-gray-200' onClick={() => setBanner(null)}>
                                            <p className='text-primary-color text-center'>Batal</p>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className='h-10 w-10 rounded-full bg-white flex justify-center items-center hover:border hover:border-primary-color' onClick={handleBanner}>
                            <div className='w-5 h-5 relative'>
                                <Image src='assets/icons/brush.svg' layout='fill' className='opacity-100 hover:opacity-0' />
                                <Image src='assets/icons/brush_fill_outline.svg' layout='fill' className='opacity-0 hover:opacity-100' />
                            </div>
                        </div>
                    </div>
                    <input type='file' className='hidden' ref={refBanner} name="banner" onChange={handleFile} accept='image/*' />
                </div>
                <div className='w-full h-16 bg-white'>

                </div>
                <div className='flex gap-7 px-[13rem] mt-7 max-lg:px-5 max-lg:mt-5 max-md:flex-col'>
                    <LeftBarProfile user={dataUser} uid={uid} />
                    <div className='flex-1'>
                        <CardPosting uid={uid} photoURL={dataUser.photoURL} />
                        <div className='mt-7 flex flex-col gap-5'>
                            {posts.map((post, index) => {
                                return <CardContent key={index} item={post} uid={uid} />
                            })}
                        </div>
                    </div>
                    <RightBarProfile />
                </div>
                <div className='h-20'>

                </div>
            </main>
        </>
    )
}

export default WithAuth(Profile)