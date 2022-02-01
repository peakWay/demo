
interface HttpReqest<P, R> {
    (params: P): Promise<HttpResponseProps<R>>
}

interface HttpResponseProps<R> {
    result: boolean;
    msg?: string;
    kind?: string;
    data: R;
}

interface RequestDataReqParam {
    id: number
}

interface RequestDataRes {
    list: string[]
}

export const requestData: HttpReqest<RequestDataReqParam, RequestDataRes> = (param) => {
    return Promise.resolve({
        result: true,
        data: {
            list: ['12']
        }
    })
}

async function fetchData() {
    let res = await requestData({id: 1})

    if (!res.result) return;
    console.log(res.data.list)
}