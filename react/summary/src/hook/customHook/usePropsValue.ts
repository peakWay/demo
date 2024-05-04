import { useUpdate } from './useUpdate';
import { SetStateAction, useRef, useCallback } from 'react';

type Options<T> = {
    value?: T;
    defaultValue: T;
    onChange?: (v: T) => void
}

export function usePropsValue<T>(options: Options<T>): [T, (v: T) => void] {
    const { value, defaultValue, onChange } = options

    const update = useUpdate()
    const stateRef = useRef(value !== undefined ? value : defaultValue)

    // 非首次渲染时候通过这种方式更新stateRef中存储的值
    if(value !== undefined) {
        stateRef.current = value
    }

    // 手动实现setState方法
    const setState = useCallback((v: SetStateAction<T>) => {
        const newValue = typeof v === 'function' ? (v as (prevState: T) => T)(stateRef.current) : v

        // 如果value为undefined说明这个props只是初始化用的，外部不能更新，只能内部更新
        if (value === undefined) {
            stateRef.current = newValue
            update()
        }

        onChange?.(newValue)
    }, [])

    return [stateRef.current, setState]
}