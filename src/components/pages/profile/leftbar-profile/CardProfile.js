import CardLayout from '@/components/global/cardlayout'
import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Icon from '@/components/global/icon'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@firebase/storage'
import db from '@/config/firestore'
import { doc, setDoc } from '@firebase/firestore'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const CardProfile = ({ photoProfile, uid }) => {
  const router = useRouter()
  const refProfile = useRef(null)
  const [profile, setProfile] = useState(null)
  const [photo, setPhoto] = useState(null)
  const [progress, setProgress] = useState(0)
  const handleProfile = () => {
    refProfile.current.click()
  }
  const handleFile = (e) => {
    const file = e.target.files[0]
    const name = e.target.name
    if (file) {
      if (name === 'profile') {
        setProfile(URL.createObjectURL(file))
        setPhoto(file)
      }
    }
  }

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

  const uploadProfile = async () => {
    try {
      if(profile) {
        const storage = getStorage();
        const storageRef = ref(storage, `profile/${uid}/`+photo.name);
        alertUpload()
        const uploadTask = uploadBytesResumable(storageRef, photo)
        uploadTask.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress)
        } , (error) => {
          alertSwals({title: 'Gagal Upload Profile', status: 'error', icon: 'error'})
        }, () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateFirestore({urlPhoto: downloadURL})
            alertSwals({title: 'Berhasil Upload Profile', status: 'success', icon: 'success'})
          })
        })
      }
    }
    catch (error) {
      alertSwals({title: 'Gagal Upload Profile', status: 'error', icon: 'error'})
      console.log(error)
    }
  }

  const handleSaveProfile = () => {
    uploadProfile()
    setProfile(null)
    router.reload()
  }

  const updateFirestore = ({
    urlPhoto
  }) => {
    const docRef = doc(db, 'users', uid)
    setDoc(docRef, {
      photoURL: urlPhoto
    }, { merge: true })
  }





  return (
    <CardLayout className={'w-full h-[17rem] -mt-[11rem] z-10 p-4 relative'}>
      <div className='w-full h-full bg-gray-200 relative'>
        {
          profile ? (
            <Image src={profile} layout='fill' className='object-cover' />
          ) : (
            photoProfile ? (
              <Image src={photoProfile} alt='profile' layout='fill' objectFit='cover' />
            ) : (
              null
            )
          )
        }
      </div>
      <div className='absolute right-7 bottom-7 flex justify-end items-end gap-1'>
        {
          profile && (
            <div className='flex gap-1'>
              <div className='h-8 w-8 rounded-full bg-white flex justify-center items-center hover:border hover:border-primary-color' onClick={handleSaveProfile}>
                <Icon icon={['fas', 'check']} className='text-primary-color' />
              </div>
              <div className='h-8 w-8 rounded-full bg-white flex justify-center items-center hover:border hover:border-primary-color' onClick={()=>setProfile(null)}>
                <Icon icon={['fas', 'xmark']} className='text-primary-color' />
              </div>
            </div>
          )
        }
        <div className='h-8 w-8 rounded-full bg-white flex justify-center items-center hover:border hover:border-primary-color' onClick={handleProfile}>
          <input type='file' className='hidden' ref={refProfile} name="profile" accept='image/*' onChange={handleFile} />
          <div className='w-4 h-4 relative'>
            <Image src='assets/icons/brush.svg' layout='fill' className='opacity-100 hover:opacity-0' />
            <Image src='assets/icons/brush_fill_outline.svg' layout='fill' className='opacity-0 hover:opacity-100' />
          </div>
        </div>
      </div>
    </CardLayout>
  )
}

export default CardProfile