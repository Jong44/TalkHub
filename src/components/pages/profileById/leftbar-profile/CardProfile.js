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




  return (
    <CardLayout className={'w-full h-[17rem] -mt-[11rem] z-10 p-4 relative'}>
      <div className='w-full h-full bg-gray-200 relative'>
        {
          photoProfile ? (
            <Image src={photoProfile} alt='profile' layout='fill' objectFit='cover' />
          ) : (
            null
          )
        }
      </div>
    </CardLayout>
  )
}

export default CardProfile