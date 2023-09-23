import { Button, Switch } from 'antd'
import { useState } from 'react'
// const DocsResuscitate  =  await import('@/pages/Project/Resuscitate/DocsResuscitate')
const Population = () => {
    const [check, setCheck] = useState(true)
    return (
        <div style={{ padding: 16, backgroundColor: 'white',paddingTop: 50 }}>
            <Button style={{position: 'fixed', right: 4, top: 4}} onClick={e => setCheck(prev => !prev)}>{check?'Prod':'Docs'}</Button>
            {check ?
                <div>sdf</div>
                : <div>fff</div>
            }
        </div>
    )
}

export default Population