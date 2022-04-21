import { useEffect, useState } from "react"
import delay from "../../utils/delay"

const useRequest = (initialData, init, initialArg) => {
    const [data, setData] = useState(initialData)
    const [params, setParams] = useState(() => {
        return typeof init === 'function' ? init(initialArg) : init
    })

    useEffect(() => {
        const fetchData = async () => {
            let data = await delay(params)
            // let res = await fetch(url, {
            //     query: param
            // })
            console.log(data, 'data')
            setData(data);
        }

        fetchData()
    }, [params])

    return [data, setParams]
}

export default useRequest;