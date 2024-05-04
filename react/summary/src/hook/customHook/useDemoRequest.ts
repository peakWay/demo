// 优化后的最终版useRequest
import { useEffect, useMemo, useRef, useState } from 'react'

export function useRequest<R, T = R>(
    fetchMethod: () => Promise<HttpResponseProps<T>>, 
    initialData: R
) { 
    const [data, setData] = useState<R>(initialData)
    const fetchData = useMemo(() => {
        return async () => {
            const res = await fetchMethod();
            if (!res.result) return;
            let data: any = res.data;
            setData(data as R);
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    return [data, setData, fetchData] as const
}
