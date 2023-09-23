import { Skeleton, Space } from 'antd'
import React from 'react'

const PageLoading = () => {
    return (
        <div className='h-screen'>
            <Skeleton active className='m-4' />
            <Skeleton active className='m-4' />
            <Skeleton active className='m-4' />
        </div>
    )
}

export default PageLoading