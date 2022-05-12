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