import React, { useEffect, useState } from 'react';
import useRequest from '../customHook/useRequest';

function createRequestParams(id) {
    return {
        api_name: 'xxx',
        id: id + 1
    }
}

export default function RequestFuncExample() {
    const [query, setQuery] = useState('redux');
    //通过传方法的方式
    const [data, doFetch] = useRequest(null, createRequestParams, 0)
    // const [search, setSearch] = useState(query);
    
    return (
        <div>
            <input placeholder="请输入" value={ query } onChange={ (e) => { setQuery(e.target.value) } }></input>
            {/* 通过方法生成新对象会更新 */}
            <button onClick={ () => doFetch(createRequestParams(data.id)) }>自增对象点击更新</button>
            <div>{ JSON.stringify(data) }</div>
        </div>
    )
}
