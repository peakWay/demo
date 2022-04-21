
import React, { useEffect, useState } from 'react';
import RequestDataExample from './data';
import RequestFuncExample from './func';
import RequestStatusExample from './status';

export default function RequestExample() {
    
    return (
        <div>
            <h3>通过对象作为useRequest参数</h3>
            <RequestDataExample/>
            <h3>通过方法作为useRequest参数</h3>
            <RequestFuncExample/>
            <h3>useStatusRequest</h3>
            <RequestStatusExample/>
        </div>
    )
}
