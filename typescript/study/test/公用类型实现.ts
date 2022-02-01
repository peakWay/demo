
/**
 * 公用类型实现
 * 1. Partial<T>
 * 2. Required<T>
 * 3. Readonly<T>
 * 4. Record<K, T>
 * 5. Pick<T, K>
 */

interface Person {
    name: string;
    age: number;
    introduce?: string;
}

/* 1. Partial<T>: 将对象所有属性类型增加可选 */
type MyPartial<T> = {[P in keyof T] ?: T[P] | undefined}
let defaultProps: MyPartial<Person> = {}

/* 2. Required<T>: 将对象所有属性设置为必填 */
type MyRequired<T> = {[P in keyof T] -?: T[P]}
let requiredProps: MyRequired<Person> = {
    name: '怪老头',
    age: 26,
    introduce: '你们好，我叫怪老头'
}

/* 3. Readonly<T>: 将对象所有属性设置为只读 */
type MyReadonly<T> = { readonly [P in keyof T]: T[P]}
let readOnlyProps: MyReadonly<Person> = {
    name: '怪老头',
    age: 26
}
// readOnlyProps.name = '费涛'  //Error

/* 4. Record<K, T>: 构造一个对象类型，其属性键为键，属性值为类型 */
type MyRecord<K extends string | number | symbol, T> = { [P in K]: T; }
type Position = 'top' | 'bottom' | 'left' | 'right'
let position: MyRecord<Position, number> = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

/* 5. Pick<T, K>: 通过从类型中拾取属性键集（字符串文本或字符串文本的并集）来构造类型。*/
type MyPick<T, K extends keyof T> = { [P in K]: T[P]; }

