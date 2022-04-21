
import React, { useEffect, useState } from 'react';
import useStatusRequest from '../customHook/useStatusRequest';

const RequestDataParam = {
    api_name: 'xxx',
    id: 1
}

export default function RequestStatusExample() {
    const [query, setQuery] = useState('redux');
    
    const [{data, isError, isLoading}, doFetch] = useStatusRequest(null, RequestDataParam)

    return (
        <div>
            <input placeholder="请输入" value={ query } onChange={ (e) => { setQuery(e.target.value) } }></input>
            {/* 参数无变化不会更新 */}
            <button onClick={ () => doFetch(RequestDataParam) }>原始参数点击不会更新</button>
            {/* 参数是新对象会更新 */}
            <button onClick={ () => doFetch({
                api_name: 'xxx',
                id: data.id + 1
            }) }>自增对象点击更新</button>
            <div>{ isLoading ? '正在加载中' : JSON.stringify(data) }</div>
        </div>
    )
}