import LandingSectionSkleton from '@/components/LandingSectionSkleton'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
    return (
        <div className=' bg-black w-full gap-6 px-10 py-5 flex'>
            <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
            <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
            <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
            <Skeleton className=' h-96 w-full rounded bg-gray-800' ></Skeleton>
        </div>
    )
}

export default Loading