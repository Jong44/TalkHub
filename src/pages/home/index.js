import CardPosting from '@/components/global/cardposting'
import WithAuth from '@/components/global/withauth'
import LeftBarHome from '@/components/pages/home/leftbar-home'
import RightBarHome from '@/components/pages/home/rightbar-home'
import Head from 'next/head'
import React from 'react'

const Home = () => {
  return (
    <>
        <Head>
            <title>Home</title>
            <meta name="description" content="Home page" />
        </Head>
        <main>
          <div className='flex gap-7 px-[13rem] mt-7'>
            <LeftBarHome  />
            <div className='flex-1'>
              <CardPosting />
            </div>
            <RightBarHome />
          </div>
        </main>
    </>
  )
}

export default WithAuth(Home)