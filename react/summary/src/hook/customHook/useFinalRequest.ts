// 优化后的最终版useRequest
import { useEffect, useMemo, useRef, useState } from 'react'

interface UseRequestOptions<R, T> {
    initialData?: R;  //初始化值
    filter?: (data: T) => R;  //从接口拿到的数据过滤函数
    callback?: ((data: R) => void);  // 在首次useEffect请求时调用的回调
    condition?: () => boolean;  // 在首次useEffect中请求条件
}

function isFunction(val: any) {
    return typeof val === 'function'
}

export function useRequest<R, T = R>(
    fetchMethod: () => Promise<HttpResponseProps<T>>, 
    options: UseRequestOptions<R, T> = {}
) { 
    const [data, setData] = useState<R>(options?.initialData!)
    const fetched = useRef(false)
    const fetchData = useMemo((cb?: (data: R) => void) => {
        return async () => {
            const res = await fetchMethod();
            if (!res.result) return;
            let data: any = res.data;
            if (options.filter && isFunction(options.filter)) {
                data = options.filter(data) 
            }

            setData(data as R);

            if (!fetched.current && isFunction(options.callback)) {
                options.callback!(data)
                fetched.current = true
            }

            cb && cb(data as R)
        }
    }, [])

    useEffect(() => {
        if (isFunction(options.condition)) {
            options.condition!() && fetchData()
        } else {
            fetchData()
        }
    }, [])

    return [data, setData, fetchData] as const
}