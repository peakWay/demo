import React, { useMemo } from "react";

export default function MemoChild(props) {
    console.log('MemoChild', 'render')
    // const name = useMemo(() => {
    //     console.log('change');
    //     return props.name
    // }, [props.name]);
    return (
        <>
            <div>名称：{ props.name }</div>
            <div>学校：{ props.school.high }</div>
            <div onClick={ props.onClick }>点击事件</div>
            <div>子组件： { props.children }</div>
        </>
    )
}