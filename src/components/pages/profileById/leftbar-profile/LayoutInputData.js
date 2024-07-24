import CardLayout from '@/components/global/cardlayout'
import Icon from '@/components/global/icon'
import PrimaryButton from '@/components/global/primarybutton'
import React, { useEffect, useState } from 'react'

const LayoutInputData = ({isOpen, onClose, title, children, onSave}) => {
    const [open, setOpen] = useState(isOpen)
    const handleClose = () => {
        setOpen(!open)
        onClose(isOpen)
    }

    return (
        <div className='fixed inset-0 z-20'>
            <div className='absolute inset-0 bg-black bg-opacity-50' onClick={handleClose}></div>
            <div className='absolute inset-0 w-full h-full flex justify-center items-center'>
                <div className='w-1/3 bg-white rounded-md p-5 max-md:w-full max-md:m-10'>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl font-semibold'>{title}</p>
                        <div className='text-xs underline text-primary-color cursor-pointer' onClick={handleClose}>
                            <Icon icon={['fas', 'xmark']} className='text-lg' />
                        </div>
                    </div>
                    <hr className='my-2 w-20 border-t-1 border-primary-color mb-4' />
                    {children}
                    <div className='flex justify-end'>
                        <div className='w-24'>
                            <PrimaryButton onClick={onSave} text={"Simpan"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutInputData