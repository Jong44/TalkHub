import Icon from '@/components/global/icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Swal from 'sweetalert2'

const Index = () => {
  const alertCommingSoon = () => {
    Swal.fire({
        title: 'Fitur ini akan segera hadir',
        icon: 'info',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })
}
  return (
    <div className='flex justify-center items-center gap-3 border rounded-md py-2 px-4 cursor-pointer hover:bg-gray-100' onClick={alertCommingSoon}>
        <p className='font-semibold text-sm'>Masuk dengan Google</p>
        <Icon icon={['fab', 'google']} className='text-xs' />
    </div>
  )
}

export default Index