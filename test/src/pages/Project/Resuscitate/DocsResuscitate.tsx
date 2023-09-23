import PageLoading from '@/components/PageLoading'
import React, { useEffect, useState } from 'react'
// import ReactMarkdown from 'react-markdown'
// import remarkGfm from 'remark-gfm'
// import content from './Test.md'


const DocsResuscitate = () => {
    const [data, setData] = useState<string>('')
    // useEffect(() => {
    //     fetch(content)
    //         .then(res => res.text())
    //         .then(text => setData(text))
    // }, [])
    return (
        <div>
            {/* {data == '' ? <PageLoading /> :
                <ReactMarkdown children={data} remarkPlugins={[remarkGfm]} />
            } */}
        </div>
    )
}

export default DocsResuscitate