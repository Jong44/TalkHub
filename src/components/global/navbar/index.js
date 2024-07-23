import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Swal from 'sweetalert2'
import Icon from '../icon'
import { logout } from '@/service/AuthService'
import { icon } from '@fortawesome/fontawesome-svg-core'
import { getUser } from '@/service/AuthService'
import { doc, getDoc } from '@firebase/firestore'
import db from '@/config/firestore'

const Navbar = () => {
    const router = useRouter()
    const menu = [
        {
            title: 'Beranda',
            url: '/home',
            icon: ['fas', 'home']
        },
        {
            title: 'Grup',
            url: '/grup',
            icon: ['fas', 'users'],
            soon: true,
        },
        {
            title: 'Program',
            url: '/program',
            icon: ['fas', 'book'],
            soon: true,
        },
        {
            title: "Search",
            url: "/search",
            icon: ["fas", "search"],
            mobileOnly: true,
        },

    ]
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

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
            if (result.isConfirmed) {
                handleLogout()
                router.push('/auth/login')
            }
        })
    }
    const handleLogout = async () => {
        try {
            const response = await logout()
            if (response.status === "error") {
                alertSwal("Gagal", response.message, "error");
            } else {
                alertSwal("Berhasil", response.message, "success");
                router.push("/auth/login");
            }
        } catch (error) {
            alertSwal("Gagal", error.message, "error");
        }
    }

    const handleGetData = async (uid) => {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setData(docSnap.data())
        }else{
            console.log('Data tidak ditemukan')
        }
      }
    useEffect(() => {
       const fetchData = async () => {
          try {
            const response = await getUser()
            if(response.status === 'success'){
              handleGetData(response.data)
            }
          } catch (error) {
            console.log(error)
          } finally {
            setLoading(false)
          }
        }
        fetchData()
        console.log(data)
      } , [])


    



    return (
        <nav className='px-[13rem] py-5 border bg-white max-lg:p-5'>
            {/* Default Menu */}
            <div className='flex justify-between items-center max-md:hidden'>
                <div className='flex gap-10 max-md:hidden'>
                    {
                        menu.map((item, index) => {
                            if (!item.mobileOnly) {
                                if (item.soon) {
                                    return (
                                        <p key={index} onClick={alertCommingSoon} className='cursor-pointer font-semibold'>{item.title}</p>
                                    )
                                }
                                return (
                                    <Link href={item.url} key={index}>
                                        <p className={router.pathname === item.url ? 'text-primary-color font-bold' : ''}>{item.title}</p>
                                    </Link>
                                )
                            }
                        })
                    }
                </div>
                <div className='flex items-center gap-5'>
                    <Link className='rounded-full bg-gray-200 w-10 h-10' href="/profile">
                    {loading ? <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-color'></div> : data.photoURL ? <Image src={data.photoURL} alt='profile' width={0} height={0} className='rounded-full' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
                    </Link>
                    <div className='w-fit cursor-pointer' onClick={logoutClick}>
                        <Icon icon={['fas', 'right-from-bracket']} className='text-xl text-primary-color' />
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            <div className='hidden max-md:flex justify-between items-center'>
                {menu.map((item, index) => {
                    if(item.soon) {
                        return (
                            <Icon key={index} icon={item.icon} className='text-xl cursor-pointer' onClick={alertCommingSoon} />
                        )
                    }
                    else{
                        return (
                        <Link href={item.url} key={index}>
                            <Icon key={index} icon={item.icon} className={router.pathname === item.url ? 'text-primary-color font-bold text-xl' : 'text-xl'} />
                        </Link>
                    )
                    }
                })}
                <Link className='rounded-full bg-gray-200 w-10 h-10' href="/profile">
                    {loading ? <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary-color'></div> : data.photoURL ? <Image src={data.photoURL} alt='profile' width={0} height={0} className='rounded-full' /> : <Image src='/images/avatar.png' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
                </Link>
                <div className='w-fit cursor-pointer' onClick={logoutClick}>
                    <Icon icon={['fas', 'right-from-bracket']} className='text-xl text-primary-color' />
                </div>
            </div>
        </nav>
    )
}

export default Navbar