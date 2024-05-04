import React, { useEffect, useState } from 'react'
import './index.scss'
import { useRequest } from '../customHook/useDemoRequest'

async function Request(o: any) {
    // 没有引入Request包，随便声明下
}

interface OldTestProps {
    
}

async function fetchData() {
    return Request({
        data: {
            api_name: 'xxx'
        }
    })
}

const OldTest: React.FC<OldTestProps> = (props) => {
    // const [data, setData] = useState(null)
    // useEffect(() => {
    //     async function fetchData() {
    //         let res: any = await Request({
    //             data: {
    //                 api_name: 'xxx'
    //             }
    //         })
    //         if (!res.result) return;
    //         setData(res.data)
    //     }
    //     fetchData()
    // }, [])

    // 使用useRequest后
    const [data, setData, fetchData] = useRequest(() => fetchData(), null)

    return <div>{data}</div>
}

export default OldTest;