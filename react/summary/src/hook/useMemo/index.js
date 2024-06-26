import React, { useCallback, useMemo, useState, useRef } from "react";
import shallowEqual from "../../utils/shallowEqual";
import MemoChild from "./child";
import PureChild from "../../class/pure/pureChild";

let MemoChildWrap = React.memo(MemoChild, (prevProps, nextProps) => {
    console.log(prevProps.onClick === nextProps.onClick, '函数是否相等')
    return prevProps.name == nextProps.name && prevProps.school === nextProps.school
})

// 不设置条件会用浅比较判断
// let MemoChildWrap = React.memo(MemoChild)
export default function UseMemo() {
    const [name, setName] = useState('怪老头');
    const [age, setAge] = useState(0);
    const [school, setSchool] = useState({ high: '市一中' })
    const schoolMemorize = useMemo(() => {
        return {
            high: '衡阳市八中'
        }
    }, [])

    function onClick() {
        setSchool(schoolMemorize)
        console.log('点击')
    }

    // const memoChild = useMemo(() => {
    //     return (
    //         <MemoChild name={ name } school={ school } onClick={ onClick }>
    //             <span>children</span>
    //         </MemoChild>
    //     )
    // }, [name, school])
    const onUseCbClick = useCallback(() => {
        console.log('点击')
    }, [])
    const memoizedSetAge = useCallback(() => {
        setAge(25)
    }, [])
    const memoizedSetName = useCallback((e) => {
        // console.log(e)
        setName('费涛')
    }, [])


    console.log('渲染UseMemo')
    return (
        <div>
            {/* 由于子组件是函数组件，所以props无变动仍然会重新渲染 */}
            {/* <MemoChild name={ name } school={ school }></MemoChild> */}

            {/* 可以通过useMemo将第一次渲染的子组件缓存，并且依赖列表为prop值 */}
            {/* { memoChild } */}

            {/* 使用 */}
            <MemoChildWrap name={ name } school={ school } onClick={ onUseCbClick }></MemoChildWrap>

            {/* <PureChild name={ name } school={ school } onClick={ onUseCbClick }></PureChild> */}

            {/* 使用React.memo方式 */}
            {/* <MemoChildWrap name={ name } school={ school } onClick={ onClick }></MemoChildWrap> */}

            {/* 通过useCallback缓存方法，避免dom组件的更新 */}
            <button onClick={ memoizedSetAge }>改变年龄</button>
            <button onClick={ memoizedSetName }>改变姓名</button>
        </div>
    )
}