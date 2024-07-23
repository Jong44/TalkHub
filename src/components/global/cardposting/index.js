import React, { useEffect, useRef, useState } from 'react'
import CardLayout from '../cardlayout'
import PrimaryButton from '../primarybutton'
import Icon from '../icon'
import Swal from 'sweetalert2'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from '@firebase/storage'
import { addDoc, collection, doc, getDoc, serverTimestamp } from '@firebase/firestore'
import db from '@/config/firestore'
import Image from 'next/image'
import uploadRealtimeDatabase from '@/service/PostinganService'

const CardPosting = ({uid, photoURL}) => {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState({
    file: null,
    type: ''
  });
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);

  const alertSwals = ({title, status, icon}) => {
    Swal.fire({
      title,
      icon,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
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

  const [fitImage, setFitImage] = useState('object-fill');
  
  const handleFitImage = (e) => {
    setFitImage(e.target.value);
  }

  const handleImageUpload = () => {
    imageRef.current.click();
  }

  const handleVideoUpload = () => {
    videoRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const type = e.target.accept;
    if(type.includes('video') ) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if(video.duration > 60) {
          alertSwals({title: 'Video tidak boleh lebih dari 60 detik', status: 'error', icon: 'error'});
          return;
        }
        setFile({file, type});
      }
    }else{
      setFile({file, type});
    }
  }

  const handleChange = (e) => {
    setCaption(e.target.value);
  }

  const handleUploadFile = ({
    tag,
    finalCaption,
  }) => {
    const storage = getStorage();
    try {
      const storageRef = ref(storage, 'posts/' + file.file.name);
      const uploadTask = uploadBytesResumable(storageRef, file.file);
      alertUpload();
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, (error) => {
        alertSwals({title: error.message, status: 'error', icon: 'error'});
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          handleUploadFirestore({
            tag,
            finalCaption,
            url
          });
        })
      })
    } catch (error) {
      setError(error.message);
    }
  }

  const handleUploadFirestore = async ({
    tag,
    finalCaption,
    url
  }) => {
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        caption: finalCaption,
        file: url ? {
          url,
          type: file.type,
          fitImage: fitImage ? fitImage : 'object-fill'
        } : null,
        uid: uid,
        createdAt: serverTimestamp()
      });
      if(docRef) {
        uploadRealtimeDatabase({idPost: docRef.id, tag: tag, idUser: uid});
        alertSwals({title: 'Post Success', status: 'success', icon: 'success'});
      }
    } catch (error) {
      alertSwals({title: error.message, status: 'error', icon: 'error'});
    }
  }

  const handlePost = () => {
    if(!caption) {
      alertSwals({title: 'Caption tidak boleh kosong', status: 'error', icon: 'error'});
      return;
    }
    const tag = caption.match(/#[a-z0-9]+/gi);
    const captionFormat = caption.replace(/\n/g, '<br>');
    if(!file.file) {
      handleUploadFirestore({
        tag,
        finalCaption: captionFormat
      });
    }else{
      handleUploadFile({
        tag,
        finalCaption: captionFormat
      });
    }
    setCaption('');
    setFile({
      file: null,
      type: ''
    });
    setProgress(0);
    setFitImage('object-fill');
  }
    



  return (
    <CardLayout>
        <div className='p-4'>
           <div className='flex items-start gap-3'>
              <div className='w-12 h-12'>
              {photoURL && photoURL !== "" ? <Image src={photoURL} alt='profile' width={80} height={80} className='rounded-full' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
              </div>
              <div className='flex-1'>
                <textarea className='w-full p-3 resize-none focus:outline-none text-sm' placeholder='What are you thinking?' onChange={handleChange} value={caption}></textarea>
                {
                  file.file && (
                    <div className='w-full h-44 mt-3 bg-gray-200 rounded-md relative'>
                      {
                        file.file && file.type.includes('image') ? (
                          <>
                          <img src={URL.createObjectURL(file.file)} alt='image' className={`w-full h-full rounded-md ${fitImage}`} />
                          <div className='absolute top-2 right-2'>
                            <select className='bg-white rounded-md px-2 py-1 text-xs focus:outline-none' onChange={handleFitImage}>
                              <option value=''>--Pilih Fit Image--</option>
                              <option value='object-fill'>Fill</option>
                              <option value='object-cover'>Cover</option>
                            </select>
                          </div>
                          </>
                        )  : (
                          <video src={URL.createObjectURL(file.file)} alt='video' className='w-full h-full object-cover rounded-md' controls />
                        )
                      }
                    </div>
                  )
                }
              </div>
            </div>
            <div className='flex items-end justify-between mt-3'>
              <div className='flex items-end gap-3'>
                <div onClick={handleImageUpload} className='cursor-pointer'>
                  <Image src='/assets/icons/gallery.svg' alt='image' width={20} height={20} />
                  <input type='file' ref={imageRef} className='hidden'  accept='image/*' onChange={handleFileChange} />
                </div>
                <div onClick={handleVideoUpload} className='cursor-pointer'>
                  <Image src='/assets/icons/video.svg' alt='image' width={20} height={20} />
                  <input type='file' ref={videoRef} className='hidden' accept='video/*' onChange={handleFileChange} />
                </div>
              </div>
              <div className='w-20'>
                <PrimaryButton text='Post' className={'rounded-3xl text-sm'} onClick={handlePost} />
              </div>
            </div>
        </div>
    </CardLayout>
  )
}

export default CardPosting