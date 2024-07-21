import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import Icon from '../icon'
import { logout } from '@/service/AuthService'

const Navbar = () => {
    const router = useRouter()
    const menu = [
        {
            title: 'Beranda',
            url: '/home'
        },
        {
            title: 'Grup',
            url: '/grup',
            soon: true
        },
        {
            title: 'Program',
            url: '/program',
            soon: true
        }
    ]

    const alertCommingSoon = () => {
        Swal.fire({
            title: 'Fitur ini akan segera hadir',
            icon: 'info',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        })
    }

    const alertSwal = (title, text, icon) => {
        Swal.fire({
          title: title,
          text: text,
          icon: icon,
          confirmButtonText: "Ok",
        });
      };

    const logoutClick = () => {
        Swal.fire({
            title: 'Apakah anda yakin ingin logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: "#FF6347",
            confirmButtonText: 'Ya',
            cancelButtonText: 'Tidak'
        }).then((result) => {
            if(result.isConfirmed) {
                handleLogout()
                router.push('/auth/login')
            }
        })
    }
    const handleLogout = async () => {
        try{
            const response = await logout()
            if(response.status === "error"){
                alertSwal("Gagal", response.message, "error");
            }else{
                alertSwal("Berhasil", response.message, "success");
                router.push("/auth/login");
            }
        }catch(error){
            alertSwal("Gagal", error.message, "error");
        }
    }
        

    
  return (
    <nav className='px-[13rem] py-5 border bg-white'>
        <div className='flex justify-between items-center'>
            <div className='flex gap-10'>
            {
                menu.map((item, index) => {
                    if(item.soon) {
                        return (
                            <p key={index} onClick={alertCommingSoon} className='cursor-pointer font-semibold'>{item.title}</p>
                        )
                    }
                    return (
                        <Link href={item.url} key={index}>
                            <p className={router.pathname === item.url ? 'text-primary-color font-bold' : 'cursor-pointer'}>{item.title}</p>
                        </Link>
                    )
                })
            }
            </div>
            <div className='flex items-center gap-5'>
            <div className='rounded-full bg-gray-200 w-10 h-10'>
                <Image src='/images/avatar.png' width={0} height={0} className='w-full h-full' />
            </div>
            <div className='w-fit cursor-pointer' onClick={logoutClick}>
            <Icon icon={['fas', 'right-from-bracket']} className='text-xl text-primary-color' />
            </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar