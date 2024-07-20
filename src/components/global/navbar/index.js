import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    const router = useRouter()
    const menu = [
        {
            title: 'Beranda',
            url: '/home'
        },
        {
            title: 'Grup',
            url: '/grup'
        },
        {
            title: 'Program',
            url: '/program'
        }
    ]
  return (
    <nav className='w-screen px-[15rem] py-5 border'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-5'>
            {
                menu.map((item, index) => (
                    <Link href={item.url} key={index} className={router.pathname === item.url ? "text-primary-color" : ""}>{item.title}</Link>
                ))
            }
            </div>
            <div className='rounded-full bg-primary-color w-10 h-10'>
                <Image src='/images/avatar.png' width={0} height={0} className='w-full h-full' />
            </div>
        </div>
    </nav>
  )
}

export default Navbar