
import React, { useEffect, useLayoutEffect, useReducer, useState } from 'react';

function useMyCount() {
    const [count, setCount] = useState(0);

    return setCount
}

function TestReducer (state, action) {
    console.log(state, action, 'reducer')
    // state = {...state}
    if (action.type === 'error') {
        state.isError = true
    } else if (action.type === 'loading') {
        state.isLoading = true
    }
    return state;
}

const HookTest = (props) => {
    // let setCount = useMyCount();
    // const [count, setCount] = useState(0);
    console.log(1111)
    const [state, dispatch] = useReducer(TestReducer, {
        isError: false,
        isLoading: false
    })

    const [text, setText] = useState('hello world');

    console.log(22222)
    //异步执行，在dom渲染之后再执行
    // useEffect((a) => {
    //     // console.log(count);
    //     let i = 0;
    //     while(i < 1000000000) {
    //         i++;
    //     }
    //     setText('加载成功了')
    // }, [])

    //同步执行，在dom真正渲染之前执行
    useLayoutEffect((a) => {
        // console.log(count);
        let i = 0;
        while(i < 1000000000) {
            i++;
        }
        setText('加载成功了')
    }, [])
    console.log(3333)

    return <div>
        { state.isError && '报错了' }
        { state.isLoading && '正在加载中' }
        {/* 数量： {count} */}
        {/* <button onClick={ () => setCount((count) => {
            console.log(count);
            return count  + 1;
        }) }>增加</button> */}
        <button onClick={ () => { dispatch({type: 'error'})  } }>切换报错状态</button>
        <button onClick={ () => { dispatch({type: 'loading'})  } }>切换加载中状态</button>
        <div>{ text }</div>
    </div>
}

export default HookTest;

