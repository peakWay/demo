
/**
 * 公用类型实现
 * 1. Partial<T>
 * 2. Required<T>
 * 3. Readonly<T>
 * 4. Record<K, T>
 * 5. Pick<T, K>
 * 6. Omit<T, K>
 * 7. Exclude<T, U>
 * 8. Extract<T, U>
 * 9. NonNullable<T>
 * 10. Parameters<T>
 * 11. ConstructorParameters<T>
 * 12. ReturnType<T>
 * 13. InstanceType<T>
 * 14. ThisParameterType<T>
 * 15. OmitThisParameter<T>
 */

interface Person {
    name: string;
    age: number;
    introduce?: string;
}

// export type Name = string;
export interface Name {
    
}

/* 1. Partial<T>: 将对象所有属性类型增加可选 */
type MyPartial<T> = {[P in keyof T] ?: T[P] | undefined; }
let defaultProps: MyPartial<Person> = {}

/* 2. Required<T>: 将对象所有属性设置为必填 */
type MyRequired<T> = {[P in keyof T] -?: T[P]; }
let requiredProps: MyRequired<Person> = {
    name: '怪老头',
    age: 26,
    introduce: '你们好，我叫怪老头'
}

/* 3. Readonly<T>: 将对象所有属性设置为只读 */
type MyReadonly<T> = { readonly [P in keyof T]: T[P]; }
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
let pickProps: MyPick<Person, 'name'> = {
    name: '怪老头'
}

/* 6. Omit<T, K>: 通过从类型中选取所有属性，然后移除键（字符串文字或字符串文字的并集）来构造类型。*/
type MyOmit<T, K extends keyof T> = MyPick<T, MyExclude<keyof T, K>>
let omitProps: MyOmit<Person, 'age'> = {
    name: '怪老头'
}

/* 7. Exclude<T, U>: 通过从UnionType中排除可分配给ExcludedMembers的所有联合成员来构造类型。 */
type MyExclude<T, U> = T extends U ? never : T;
type Exclude1 = MyExclude<'a' | 'b' | 'c', 'a'>

/* 8. Extract<T, U>: 通过从类型中提取可分配给union的所有union成员来构造类型。 */
type MyExtract<T, U> = T extends U ? T : never;
type Extract1 = MyExtract<'a' | 'b' | 'c', 'a'>

/* 9. NonNullable<T>: 通过从类型中排除null和undefined来构造类型。 */
type MyNonNullable<T> = MyExclude<T, null | undefined>
type MyNonNullable1<T> = T extends null | undefined ? never : T;
type NonNullable1 = MyNonNullable<number | string | null>

/* 10. Parameters<T>: 从函数类型的参数中使用的类型构造元组类型。 */
type MyParameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
type Parameters1 = Parameters<(name: string, age: number) => string>;
let parameters: Parameters1 = ['怪老头', 26];

/* 11. ConstructorParameters<T>: 从构造函数类型的类型构造元组或数组类型。 */
type MyConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
type FunctionConstructorParameters = ConstructorParameters<FunctionConstructor>

/* 12. ReturnType<T>: 构造一个由函数类型的返回类型组成的类型。 */
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer P ? P : never;
type ReturnType1 = MyReturnType<() => string>

/* 13. InstanceType<T>: 构造由类型中构造函数的实例类型组成的类型。 */
type MyInstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer P ? P : never;
class C1 {x=0; y=0;}
type InstanceType1 = MyInstanceType<typeof C1>

/* 14. ThisParameterType<T>: 为函数类型提取this参数的类型 */
type MyThisParameterType<T> = T extends (this: infer U, ...args: any) => any ? U : unknown;
let person = {
    name: '怪老头',
    age: 26,
    sayHi: function(this: Person) {
        console.log(`你好，我是${this.name}`)
    }
}
type ThisParameterType1 = MyThisParameterType<typeof person.sayHi>

/* 15. OmitThisParameter<T>: 从类型中删除此参数 */
type MyOmitThisParameter<T> = unknown extends MyThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T;
function toHex(this: Number) {
    return this.toString(16);
}
const fiveToHex: MyOmitThisParameter<typeof toHex> = toHex.bind(5);

  

