import React, { useState } from 'react'
import UsePropsValueTestChild from './child';



const UsePropsValueTest = (props) => {
    let [value, setValue] = useState(0)

    return <>
        <h3>外部更新</h3>
        <UsePropsValueTestChild value={value} onChange={(v) => {setValue(v)}}></UsePropsValueTestChild>
        <h3>内部更新</h3>
        <UsePropsValueTestChild defaultValue={10} ></UsePropsValueTestChild>
    </>
}

export default UsePropsValueTest;