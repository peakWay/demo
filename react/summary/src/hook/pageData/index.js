import React, { useEffect, useState } from 'react'

const pageData = {
    1: '这是第一页数据',
    2: '这是第二页数据'
}

const HookPageData = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState('')

    /* 按原来的类组件编程习惯的写法 */
    // useEffect(() => {
    //     fetchData()
    // }, [])

    // const nextPage = () => {
    //     setPage(page + 1)
    //     fetchData()
    // }

    /* Hook正确写法 */
    useEffect(() => {
        fetchData()
    }, [page])

    const nextPage = () => {
        setPage(page + 1)
    }

    const fetchData = () => {
        console.log("当前页", page)
        const data = pageData[page]
        setData(data)
    }

    return (
        <div>
            当前页码：{page}<button onClick={nextPage}>下一页</button>
            <div>{data}</div>
        </div>
    )
}

export default HookPageData