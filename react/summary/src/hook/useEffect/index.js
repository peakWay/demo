import React, { useEffect, useState } from "react";

export default  function UseEffect() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        console.log('执行')
    })

    return (
        <>
            <div>状态: { visible ? '显示' : '隐藏' }</div>
            <button onClick={() => {setVisible(!visible)}}>切换</button>
        </>
    )
}