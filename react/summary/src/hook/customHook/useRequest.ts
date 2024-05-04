import { useEffect, useState } from "react"

// type Return<T> = T extends () => HttpRequest<any, infer P> ? P : never;

// export function useRequest<T extends () => HttpRequest<any, any>>(initialData: Return<T>, initFetchMethod: T, callback?: (data: Return<T>) => void): [Return<T>, React.Dispatch<React.SetStateAction<Return<T>>>] { 
//     const [data, setData] = useState(initialData)
//     const [fetchMethod, setFetchMethod] = useState<Return<T>>(initFetchMethod as () => HttpRequest<>)

//     useEffect(() => {
//         const fetchData = async () => {
//             let res = await fetchMethod();

//             if (!res.result) return;
//             const data = res.data;
//             setData(data);

//             callback?.(data);
//         }

//         fetchData()
//     }, [fetchMethod])

//     return [data, setFetchMethod]
// }

// [R, React.Dispatch<React.SetStateAction<R>>]

// Promise<HttpResponseProps<SheetListItemProps[]>>

interface HttpRequest<P, R = {}> {
    (params?: P): Promise<HttpResponseProps<R>>
}

interface HttpResponseProps<R> {
    result: boolean;
    msg?: string;
    kind?: string;
    data: R;
}

export function useRequest<R>(initialData: R, initFetchMethod: () => Promise<HttpResponseProps<R>>, callback?: (data: R) => void): [R, React.Dispatch<React.SetStateAction<HttpRequest<any, R>>>] { 
    const [data, setData] = useState(initialData)
    const [fetchMethod, setFetchMethod] = useState<HttpRequest<any, R>>(initFetchMethod)

    useEffect(() => {
        const fetchData = async () => {
            let res = await fetchMethod();

            if (!res.result) return;
            const data = res.data;
            setData(data);

            callback?.(data);
        }

        fetchData()
    }, [fetchMethod])

    return [data, setFetchMethod]
}

// import { useEffect, useMemo, useState } from 'react'

// export function useRequest<R, T = R>(initialData: R, fetchMethod: () => Promise<HttpResponseProps<T>>, callback?:((data: R) => void) | null, filterMethod?: (data: T) => R, fetchCondition?: () => boolean) { 
//     const [data, setData] = useState(initialData)
//     const fetchData = useMemo(() => {
//         return async (callCb = false) => {
//             let res = await fetchMethod();
//             if (!res.result) return;
//             const data = res.data;
//             const result = (filterMethod ? filterMethod(data) : data) as R
//             setData(result);

//             callCb && callback?.(result);
//         }
//     }, [fetchMethod])

//     useEffect(() => {
//         if (typeof fetchCondition === 'function') {
//             fetchCondition() && fetchData(true)
//         } else {
//             fetchData(true)
//         }
//     }, [])

//     return [data, fetchData, setData] as const
// }