import React from 'react'

const PrimaryButton = ({onClick}) => {
  return (
    <button onClick={onClick} className='bg-primary-color text-white rounded-md py-2 mt-5 w-full'>Daftar</button>
  )
}

export default PrimaryButton