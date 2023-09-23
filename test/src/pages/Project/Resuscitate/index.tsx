import { Button, Switch } from 'antd'
import { useState } from 'react'
import DocsResuscitate from './DocsResuscitate'
import ProdResuscitate from './ProdResuscitate'
// const DocsResuscitate  =  await import('@/pages/Project/Resuscitate/DocsResuscitate')
const Resuscitate = () => {
    const [check, setCheck] = useState(false)
    return (
        <div style={{ padding: 16, backgroundColor: 'white',paddingTop: 50 }}>
            <Button style={{position: 'fixed', right: 4, top: 4}} onClick={e => setCheck(prev => !prev)}>{check?'Prod':'Docs'}</Button>
            {check ?
                <DocsResuscitate />
                : <ProdResuscitate />
            }
        </div>
    )
}

export default Resuscitate