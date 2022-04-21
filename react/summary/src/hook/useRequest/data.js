import React, { useEffect, useState } from 'react';
import useRequest from '../customHook/useRequest';

const RequestDataParam = {
    api_name: 'xxx',
    id: 1
}

export default function RequestDataExample() {
    const [query, setQuery] = useState('redux');
    //传入对象的方式
    const [data, doFetch] = useRequest(null, RequestDataParam)
    // const [search, setSearch] = useState(query);

    
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
            <div>{ JSON.stringify(data) }</div>
        </div>
    )
}
