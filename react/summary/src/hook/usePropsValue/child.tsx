
import React, { useState } from 'react'
import { usePropsValue } from '../customHook/usePropsValue'


const UsePropsValueTestChild = (props) => {
    const [value, setValue] = usePropsValue({
        value: props.value,
        defaultValue: props.defaultValue,
        onChange: props.onChange
    })
    return <div>{value}<button onClick={() => setValue(value + 1)}>切换</button></div>
}

export default UsePropsValueTestChild;