import React, { useEffect, useState } from 'react'
import CardLayout from '@/components/global/cardlayout'
import Icon from '@/components/global/icon'
import Image from 'next/image'
import CardReply from './cardreply'
import { doc, getDoc } from '@firebase/firestore'
import db from '@/config/firestore'
import getTime from '@/utils/gettime'
import { getLikeComment } from '@/service/PostinganService'
import { onValue, ref, set } from '@firebase/database'
import realDb from '@/config/database'

const CardContent = ({ item, uid }) => {
    const [openComment, setOpenComment] = useState(false)
    const [user, setUser] = useState({})
    const [formatedCaption, setFormatedCaption] = useState('')
    const [like, setLike] = useState(0)
    const [comment, setComment] = useState(0)
    const [isLike, setIsLike] = useState(false)

    const handleOpenComment = () => {
        setOpenComment(!openComment)
    }

    const getUser = async () => {
        const docRef = doc(db, "users", item.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUser(docSnap.data())
        }
        console.log(uid)
    }

    useEffect(() => {
        handleGetLikeComment()
        getUser()
        filterTag()
    }, [])

    const filterTag = () => {
        const tags = item.caption.match(/#\w+/g)
        if (tags) {
            tags.map(tag => {
                setFormatedCaption(item.caption.replace(tag, `<a href="/search/${tag.replace('#', '')}" class="text-blue-500">${tag}</a>`))
            })
        } else {
            setFormatedCaption(item.caption)
        }
    }

    const handleGetLikeComment = () => {
        const postRefUid = ref(realDb, 'posts/' + item.id + '/like/' + uid);
        const postRef = ref(realDb, 'posts/' + item.id + '/like/');
        onValue(postRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setLike(data.total)
                if (data[uid] === true) {
                    setIsLike(true)
                }else{
                    setIsLike(false)
                    set(postRefUid, null)
                }
            }
        });
    }

    const handleLike = async () => {
        const postRef = ref(realDb, 'posts/' + item.id + '/like/' + uid);
        const totalRef = ref(realDb, 'posts/' + item.id + '/like/total');
        set(postRef, true);
        set(totalRef, like + 1);
        handleGetLikeComment()
    }

    const handleDeleteLike = async () => {
        const postRef = ref(realDb, 'posts/' + item.id + '/like/' + uid);
        const totalRef = ref(realDb, 'posts/' + item.id + '/like/total');
        set(postRef, false);
        set(totalRef, like - 1);
        handleGetLikeComment()
    }


    return (
        <CardLayout>
            <div className='p-5'>
                <div className='flex items-center gap-2'>
                    <div className='w-10 h-10 bg-gray-200 rounded-full'>
                        {user.photoURL ? <Image src={user.photoURL} alt='profile' width={80} height={80} className='rounded-full' /> : <Image src='/assets/icons/user.svg' alt='profile' width={0} height={0} className='rounded-full w-full h-full ' />}
                    </div>
                    <div className='text-sm'>
                        <p className='font-bold'>{user.fullname}</p>
                        <p className='text-xs text-gray-500'>{getTime(item.createdAt)}</p>
                    </div>
                </div>
                <p className='mt-3 text-sm' dangerouslySetInnerHTML={{ __html: formatedCaption }}></p>
                <div className='mt-3 bg-gray-200 rounded-md'>
                    {
                        item.file && item.file.type.includes('image') ? (
                            <Image src={item.file.url} alt='image' width={500} height={500} className='rounded-md' />
                        ) : item.file && item.file.type.includes('video') ? (
                            <video src={item.file.url} controls className='w-full h-full rounded-md'></video>
                        ) : null
                    }
                </div>
                <div className='flex items-center justify-between mt-3 px-2'>
                    <div className='flex items-center gap-2'>
                        {
                            isLike ? (
                                <Image src='/assets/icons/heart_fill.svg' alt='like' width={20} height={20} className='cursor-pointer' onClick={handleDeleteLike} />
                            ) : (
                                <div className='relative w-5 h-5 cursor-pointer' onClick={handleLike}>
                                    <Image src='/assets/icons/heart.svg' alt='like' layout='fill' className='transition-opacity duration-300 opacity-100 hover:opacity-0' />
                                    <Image src='/assets/icons/heart_fill_outline.svg' alt='like' layout='fill' className='transition-opacity duration-300 opacity-0 hover:opacity-100' />
                                </div>
                            )
                        }
                        {like > 0 && <p className='text-xs'>{like} Orang Menyukai</p>}
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer' onClick={handleOpenComment}>
                        <div className='relative w-5 h-5'>
                            <Image src='/assets/icons/comment.svg' alt='like' layout='fill' className='transition-opacity duration-300 opacity-100 hover:opacity-0' />
                            <Image src='/assets/icons/comment_fill.svg' alt='like' layout='fill' className='transition-opacity duration-300 opacity-0 hover:opacity-100' />
                        </div>
                        <p className='text-xs'>{comment > 0 ? `${comment}` : ''}</p>
                    </div>
                </div>
            </div>
            {/* Komentar */}
            {
                openComment && (
                    <div className='px-5 py-4 border-t'>
                        <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 bg-gray-200 rounded-full'>

                            </div>
                            <div className='flex-1 text-sm'>
                                <input type='text' placeholder='Tulis komentar...' className='w-full px-5 py-2  rounded-full border' />
                            </div>
                        </div>
                        <div className='mt-3 flex flex-col gap-2'>
                            {[1, 2].map((_, index) => (
                                <CardReply key={index}
                                    name='John Doe'
                                    time='10 minute lalu'
                                    content='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus ut libero aliquam tincidunt. Nullam nec purus ut libero aliquam tincidunt.'
                                />
                            ))
                            }
                        </div>
                    </div>
                )
            }



        </CardLayout>
    )
}

export default CardContent