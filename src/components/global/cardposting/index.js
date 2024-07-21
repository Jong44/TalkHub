import React, { useRef, useState } from 'react'
import CardLayout from '../cardlayout'
import PrimaryButton from '../primarybutton'
import Icon from '../icon'
import Swal from 'sweetalert2'

const CardPosting = () => {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const [error, setError] = useState('');
  const [file, setFile] = useState({
    file: null,
    type: ''
  });
  const alertSwals = ({title, status, icon}) => {
    Swal.fire({
      title,
      icon,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
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



  return (
    <CardLayout>
        <div className='p-4'>
           <div className='flex items-start gap-3'>
              <div className='w-12 h-12 bg-gray-200 rounded-full'></div>
              <div className='flex-1'>
                <textarea className='w-full p-3 resize-none focus:outline-none text-sm' placeholder='What are you thinking?'></textarea>
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
                  <Icon icon={['fas', 'image']} className='text-primary-color text-xl' />
                  <input type='file' ref={imageRef} className='hidden'  accept='image/*' onChange={handleFileChange} />
                </div>
                <div onClick={handleVideoUpload} className='cursor-pointer'>
                  <Icon icon={['fas', 'video']} className='text-primary-color text-xl' />
                  <input type='file' ref={videoRef} className='hidden' accept='video/*' onChange={handleFileChange} />
                </div>
              </div>
              <div className='w-20'>
                <PrimaryButton text='Post' className={'rounded-3xl text-sm'} />
              </div>
            </div>
        </div>
    </CardLayout>
  )
}

export default CardPosting