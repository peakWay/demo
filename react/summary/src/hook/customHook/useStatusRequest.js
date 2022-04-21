
import { useReducer, useState, useEffect } from "react";
import delay from "../../utils/delay";

const useStatusRequest0 = (initialData, init, initialArg) => {
    const [data, setData] = useState(initialData)
    const [params, setParams] = useState(() => {
        return typeof init === 'function' ? init(initialArg) : init
    })
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            let resData;
            try {
                resData = await delay(params)
                // let res = await fetch(url, {
                //     query: param
                // })
            } catch {
                setIsError(true);
            }

            setIsLoading(false);
            setData(resData);
        }

        fetchData()
    }, [params])

    return [{data, isLoading, isError}, setParams]
}

function fetchReducer(state, action) {
    switch(action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, isError: false }
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, isError: false, data: action.payload }
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true }
        default:
            throw new Error()
    } 
}

const useStatusRequest = (initialData, init, initialArg) => {
    const [params, setParams] = useState(() => {
        return typeof init === 'function' ? init(initialArg) : init
    })
    const [state, dispatch] = useReducer(fetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
    })

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_INIT'});
            let resData;
            try {
                resData = await delay(params)
                // let res = await fetch(url, {
                //     query: param
                // })

                dispatch({type: 'FETCH_SUCCESS', payload: resData});
            } catch {
                dispatch({type: 'FETCH_FAILURE'})
            }
        }

        fetchData()
    }, [params])

    return [state, setParams]
}
export default useStatusRequest;