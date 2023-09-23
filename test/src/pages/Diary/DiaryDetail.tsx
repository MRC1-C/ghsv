import React from 'react'
import { useParams } from 'react-router-dom'

const DiaryDetail = () => {
    const { idDiary } = useParams()
    console.log(idDiary)
    return (
        <div className='mt-11 container m-auto'>DiaryDetail</div>
    )
}

export default DiaryDetail