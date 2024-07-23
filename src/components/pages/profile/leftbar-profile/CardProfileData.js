import CardLayout from '@/components/global/cardlayout'
import Icon from '@/components/global/icon'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import LayoutInputData from './LayoutInputData'
import db from '@/config/firestore'
import { doc, setDoc } from '@firebase/firestore'

const CardProfileData = ({ user }) => {
    const [dataView, setDataView] = useState(user)
    const [dataUser, setDataUser] = useState(user)
    const [isOpenBio, setIsOpenBio] = useState(false)
    const [isOpenJob, setIsOpenJob] = useState(false)
    const [isOpenLocation, setIsOpenLocation] = useState(false)
    const [isOpenGender, setIsOpenGender] = useState(false)
    const [isOpenEducation, setIsOpenEducation] = useState(false)

    useEffect(() => {
        setDataView(user)
        setDataUser(user)
    }, [user])

    const handleCloseBio = (isOpen) => {
        setIsOpenBio(isOpen)
    }

    const handleCloseJob = (isOpen) => {
        setIsOpenJob(isOpen)
    }
    const handleCloseLocation = (isOpen) => {
        setIsOpenLocation(isOpen)
    }
    const handleCloseGender = (isOpen) => {
        setIsOpenGender(isOpen)
    }
    const handleCloseEducation = (isOpen) => {
        setIsOpenEducation(isOpen)
    }
    const handleChanges = (e) => {
        setDataUser({
            ...dataUser,
            [e.target.name]: e.target.value
        })
    }

    const handleSaveBio = () => {
        const docRef = doc(db, 'users', user.uid)
        setDataView({
            ...dataView,
            bio: dataUser.bio
        })
        console.log(dataUser.bio)
        setDoc(docRef, {
            bio: dataUser.bio
        }, { merge: true })
        setIsOpenBio(false)
    }

    const handleSaveJob = () => {
        const docRef = doc(db, 'users', user.uid)
        setDataView({
            ...dataView,
            job: dataUser.job
        })
        setDoc(docRef, {
            job: dataUser.job
        }, { merge: true })
        setIsOpenJob(false)
    }

    const handleSaveLocation = () => {
        const docRef = doc(db, 'users', user.uid)
        setDataView({
            ...dataView,
            location: dataUser.location
        })
        setDoc(docRef, {
            location: dataUser.location
        }, { merge: true })
        setIsOpenLocation(false)
    }

    const handleSaveGender = () => {
        const docRef = doc(db, 'users', user.uid)
        setDataView({
            ...dataView,
            gender: dataUser.gender
        })
        setDoc(docRef, {
            gender: dataUser.gender
        }, { merge: true })
        setIsOpenGender(false)
    }

    const handleSaveEducation = () => {
        const docRef = doc(db, 'users', user.uid)
        setDataView({
            ...dataView,
            education: dataUser.education
        })
        setDoc(docRef, {
            education: dataUser.education
        }, { merge: true })
        setIsOpenEducation(false)
    }




    return (
        <CardLayout className={"py-4 px-5"}>
            <p className='text-xl font-semibold'>{dataView.fullname}</p>
            <hr className='my-2 w-20 border-t-1 border-primary-color' />
            <p className='text-sm text-start mt-5 mb-3 text-gray-500'>
                {dataView.bio}
            </p>
            <p className='text-xs underline text-primary-color cursor-pointer mb-5' onClick={()=>setIsOpenBio(!isOpenBio)}>Edit Bio</p>
            <div className='flex flex-col gap-3'>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/briefcase.svg' width={20} height={20} />
                    {dataView.job ? (
                        <p className='text-[13px] font-semibold text-gray-500 cursor-pointer hover:text-primary-color' onClick={()=>setIsOpenJob(!isOpenJob)}>{dataView.job}</p>
                    ) : (
                        <p className='text-xs underline text-primary-color cursor-pointer' onClick={()=>setIsOpenJob(!isOpenJob)}>Edit Job</p>
                    )
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/map.svg' width={20} height={20} />
                    {dataView.location ? (
                        <p className='text-[13px] font-semibold text-gray-500 cursor-pointer hover:text-primary-color'>{dataView.location}</p>
                    ) : (
                        <p className='text-xs underline text-primary-color cursor-pointer' onClick={()=>setIsOpenLocation(!isOpenLocation)}>Edit Location</p>
                    )
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/profile.svg' width={20} height={20} />
                    {user.gender ? (
                        <p className='text-[13px] font-semibold text-gray-500 cursor-pointer hover:text-primary-color' onClick={()=>setIsOpenGender(!isOpenGender)}>{dataView.gender}</p>
                    ) : (
                        <p className='text-xs underline text-primary-color cursor-pointer' onClick={()=>setIsOpenGender(!isOpenGender)}>Edit Jenis Kelamin</p>
                    )
                    }
                </div>
                <div className='flex items-center gap-3'>
                    <Image src='/assets/icons/school.svg' width={20} height={20} />
                    {user.education ? (
                        <p className='text-[13px] font-semibold text-gray-500 cursor-pointer hover:text-primary-color' onClick={()=>setIsOpenEducation(!isOpenEducation)}>{dataView.education}</p>
                    ) : (
                        <p className='text-xs underline text-primary-color cursor-pointer' onClick={()=>setIsOpenEducation(!isOpenEducation)}>Edit Education</p>
                    )
                    }
                </div>
            </div>
            {
                isOpenBio && (
                    <LayoutInputData onClose={handleCloseBio} title={"Edit Bio"} onSave={handleSaveBio}>
                        <textarea className='w-full h-20 rounded-md p-3 bg-slate-100 text-sm outline-none border-none resize-none' value={dataUser.bio} placeholder='Masukkan Bio Anda' onChange={handleChanges} name="bio">

                        </textarea>
                    </LayoutInputData>
                )
            }
            {
                isOpenJob && (
                    <LayoutInputData onClose={handleCloseJob} title={"Edit Job"} onSave={handleSaveJob}>
                        <input type='text' className='w-full rounded-md p-3 bg-slate-100 text-sm outline-none border-none' value={dataUser.job} placeholder='Masukkan Pekerjaan Anda' onChange={handleChanges} name="job" />
                    </LayoutInputData>
                )
            }
            {
                isOpenLocation && (
                    <LayoutInputData onClose={handleCloseLocation} title={"Edit Location"} onSave={handleSaveLocation}>
                        <input type='text' className='w-full rounded-md p-3 bg-slate-100 text-sm outline-none border-none' value={dataUser.location} placeholder='Masukkan Lokasi Anda' onChange={handleChanges} name="location"/>
                    </LayoutInputData>
                )
            }
            {
                isOpenGender && (
                    <LayoutInputData onClose={handleCloseGender} title={"Edit Gender"} onSave={handleSaveGender}>
                        <select className='w-full rounded-md p-3 bg-slate-100 text-sm outline-none border-none' onChange={handleChanges} name="gender">
                            <option value=''>Pilih Jenis Kelamin</option>
                            <option value='Laki-laki'>Laki-laki</option>
                            <option value='Perempuan'>Perempuan</option>
                        </select>
                    </LayoutInputData>
                )
            }
            {
                isOpenEducation && (
                    <LayoutInputData onClose={handleCloseEducation} title={"Edit Education"} onSave={handleSaveEducation}>
                        <input type='text' className='w-full rounded-md p-3 bg-slate-100 text-sm outline-none border-none' value={dataUser.education} placeholder='Masukkan Pendidikan Anda' onChange={handleChanges} name="education" />
                    </LayoutInputData>
                )
            }
        </CardLayout>
    )
}

export default CardProfileData