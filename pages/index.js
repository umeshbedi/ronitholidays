import React, { lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import SHome from '@/components/skeleton/SHome'
import { Skeleton } from 'antd'

const Home = dynamic(() => import('../components/Home'), {
  ssr: false,
  loading: () => <SHome />
})

export default function index() {
  return (
    <Home />
  )
}
