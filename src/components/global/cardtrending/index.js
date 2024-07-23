import React, { useEffect, useState } from 'react'
import CardLayout from '../cardlayout'
import { onValue, ref, set } from '@firebase/database'
import realDb from '@/config/database'

const CardTrending = () => {
    const [tags, setTags] = useState([])

    const getTrending = () => {
        const trendingRef = ref(realDb, 'tags')
        let trending = []
        let total = []
        let finalTags = []

        onValue(trendingRef, (snapshot) => {
            const data = snapshot.val()
            if(data){
                trending = Object.keys(data)
            }
            finalTags = trending.map(tag => {
                total = Object.keys(data[tag]).length
                return {
                    tag: tag,
                    total: total
                }
            })
            setTags(finalTags.sort((a, b) => b.total - a.total).slice(0, 5))
        })
    }

    useEffect(() => {
        getTrending()
    }, [])
    

    return (
        <CardLayout>
            <div className='px-4 py-3'>
                <p className='text-xl font-semibold'>Trending</p>
                <hr className='my-2 w-20 border-t-1 border-primary-color' />
                <div className='flex flex-col gap-3 mt-3'>
                    {
                        tags.map((item, index) => (
                            <div className='flex flex-col' key={index}>
                                <p className='font-bold text-sm'>{item.tag}</p>
                                <p className='text-xs text-gray-400'>{item.total} Post</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </CardLayout>
    )
}

export default CardTrending