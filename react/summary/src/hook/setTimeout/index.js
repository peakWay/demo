import React, { useState, useRef, useEffect } from "react";

export default function SetTimeout() {
    const [count, setCount] = useState(0);
    const currentCount = useRef(count);

    useEffect(() => {
        currentCount.current = count;
    }, [count])

    function showAlert() {
        setTimeout(() => {
            alert(currentCount.current)
        }, 2000)
    }

    return (
        <div>
            <button onClick={ () => setCount(count+1) }>增加值</button>
            <button onClick={ showAlert }>显示弹窗</button>
        </div>
    )
}
