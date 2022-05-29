/**
 * 1. 工具方法，返回接口指定类型的属性
 */
interface Example {
    a: string;
    b: string | number
}

type ConditionalPick<T, K> = {
    [P in keyof T as T[P] extends K ? P : never]: T[P]
}

type E1 = ConditionalPick<Example, string>

/**
 * 2. 为已有的函数类型增加指定类型参数
 */
type Fn = (a: number, b: string) => number;
type AppendArgument<F extends (...args) => any, A> = (x, ...args: Parameters<F>) => ReturnType<F>
type E2 = AppendArgument<Fn, string>

/**
 * 3. 元组转Union
 */
type TupleToUnion<T extends any[]> = T extends (infer E)[] ? E : never;
type E3 = TupleToUnion<[string, number]>

/**
 * 4. 数组扁平化联合类型
 */
type NativeFlat<T extends any[]> = T extends (infer E)[] ? E extends any[] ? NativeFlat<E> : E : never;
type E4 = NativeFlat<[['a'], ['b', 'c'], ['d']]>

type Na<T extends any[]> = T[number];
type E5 = Na<[string, number]>

/**
 * 5. 非空对象
 */
// type EmptyObject = {}
type EmptyObject = {
    [key in keyof any]: never
}
// var v1: EmptyObject = {a: 1} 
var v1: EmptyObject = {}

/**
 * 6. 非空数组
 */
type NonEmptyArray<T> = [T, ...T[]]
var v2: NonEmptyArray<string> = ['s']

/**
 * 7. 根据指定的分隔符，对字符串数组进行拼接
 */
type JoinStrArray<
    T extends string[], 
    S extends string
> = T extends [infer A, ...infer B] 
  ? `${A extends string ? A : ''}${B extends [string, ...string[]] 
      ? `${S}${JoinStrArray<B, S>}` 
      : ''}` 
  : '';

type Names = ['Sem', 'Luxi', 'daWei'] 
type NamesComma = JoinStrArray<Names, ','>

/**
 * 8. 对字符串字面量类型进行去空格处理
 */
//第一种实现
type TrimLeft<V extends string> = V extends ` ${infer R}` ? TrimLeft<R> : V;
type TrimRight<V extends string> = V extends `${infer R} ` ? TrimRight<R> : V;
type E6 = TrimRight<TrimLeft<' sdsds '>>

//第二种实现
// type Trim<T extends string> = T extends ` ${infer E}` 
//   ? E extends `${infer F} `
//     ? Trim<F>
//     : Trim<E>
//   : T
// type E6 = Trim<'   ssss  '>

/**
 * 9. 比较两个类型是否相等
 */
// type IsEqual<A, B> = A extends B ? B extends A ? true : false : false;  //这个是错误的，无法判断never与联合类型
type IsEqual<A, B> = [A] extends [B] ? [B] extends [A] ? true : false : false;
type E7 = IsEqual<1, 2>
type E8 = IsEqual<{a: 1}, {a: 1}>
type E9 = IsEqual<never, never>
type E10 = IsEqual<'a' | 'b', 'a' | 'b'>

/**
 * 10. 获取数组类型的第一个类型
 */
type Head<T extends any[]> = T extends [infer E, ...infer R] ? E : never;
type E11 = Head<[1, 3, 2]>

/**
 * 11. 用于把指定类型E作为第一个元素添加到T数组类型中
 */
type Unshift<T extends any[], E> = [E, ...T]
type E12 = Unshift<['a', 'b'], 'c'>

/**
 * 12. 用于移除T数组类型中的第一个类型
 */
type Shift<T extends any[]> = T extends [infer E, ...infer R] ? R : [];
type E13 = Shift<['a', 'b']>

/**
 * 13. 实现一个Includes工具类型，用于判断指定的类型E是否包含在T数组类型中
 */
type Includes<T extends any[], E> = E extends T[number] ? true : false;
type E14 = Includes<[1, 2, 3], 2>

/**
 * 14. 实现一个UnionToIntersection工具类型，用于把联合类型转换为交叉类型。
 */
type UnionToIntersection<U> = (U extends unknown ? (union: U) => void : never) extends ((cross: infer C) => void) ? C : never;
type E15 = UnionToIntersection<'a' | 'b'>
type E16 = UnionToIntersection<{name: string} | {age: number}>
//解释：(U extends unknown ? (union: U) => void : never)会生成(union: {name: string}) => void和(union: {age: number}) => void的联合类型，它们共同extends (cross: infer C) => void，由于函数extends的参数处于逆变位置(右边是左边的子集)，所以需要同时满足{name: string}与{age: number}

/**
 * 15. 实现一个OptionalKeys工具类型，用来获取对象类型中声明的可选属性
 */
// type OptionalKeys<T> = {
//     [P in keyof T]-?: undefined extends T[P] ? P : never
// }[keyof T]
type IsOptional<T, K extends keyof T> = { [K1 in Exclude<keyof T, K>]: T[K1] } & { K?: T[K] } extends T ? K : never
type OptionalKeys<T> = { [K in keyof T]: IsOptional<T, K> }[keyof T]

interface A {
    name: string;
    age?: number;
    from?: string;
}
type E17 = OptionalKeys<A>

/**
 * 16. 实现一个Curry工具类型，用来实现函数类型的柯里化处理
 */
type  Curry<
    F extends (...args: any[]) => any, 
    P extends any[] = Parameters<F> , 
    R = ReturnType<F>
> = P extends [infer A , ...infer B] 
  ? B extends []
    ? (arg: A) => R
    : (arg: A) => Curry<(...args: B) => R>
  : () => R

type E18 = Curry<(name: string, age: number) => void>

/**
 * 17. 实现一个Merge工具类型，用于把两个类型合并成一个新的类型。第二种类型（SecondType）的Keys将会覆盖第一种类型（FirstType）的Keys
 */
type Merge<T extends {}, K extends {}> = {
    [P in keyof(T & K)]: P extends keyof K 
    ? K[P] 
    : P extends keyof T
      ? T[P]
      : never
}
interface Foo {
    b: number
}

interface Bar {
    a: number;
    b: string;
}
type E19 = Merge<Foo, Bar>

/**
 * 18. 实现一个RequireAtLeastOne工具类型，它将创建至少含有一个给定Keys的类型，其余的Keys保持原样
 */
type RequireAtLeastOne<T, K extends keyof T = keyof T> = T &  {
    [P in K]-?: T[P]
} 

type Responder = {
    text?: string;
    json?: string;
    secure?: boolean;
}
type E20 = RequireAtLeastOne<Responder, 'text' | 'json'>
const v3: E20= {
    text: 's',
    json: 'd'
}

/**
 * 19. 实现一个RemoveIndexSignature工具类型，用于移除已有类型中的索引签名
 */
type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K 
      ? never 
      : number extends K 
        ? never 
        : K]: T[K]
}

interface Foo1  {
    name: string;
    [key: string]: any;
    [key: number]: any;
    bar(): void;
}

type Foo1WithOnlyBar = RemoveIndexSignature<Foo1>

/**
 * 20. 实现一个Mutable工具类型，用于移除对象类型上所有属性或部分属性的readonly修饰符
 */
type Foo2 = {
    readonly a: number;
    readonly b: string;
}

type Mutable<T, K extends keyof T = keyof T> = {
    -readonly [P in K]: T[P]
} & Omit<T, K>

type E21 = Mutable<Foo2, 'a'>

/**
 * 21. 实现一个IsUnion工具类型，判断指定的类型是否为联合类型
 */
type IsUnion<T, U = T> = T extends any ? ([U] extends [T] ? false : true) : never;
type E22 = IsUnion<string | number>

/**
 * 22. 实现一个IsNever工具类型，判断指定的类型是否为never类型
 */
type IsNever<T> = [T] extends [never] ? true : false
type E23 = IsNever<never>

/**
 * 23. 实现一个Reverse工具类型，用于对元组类型中元素的位置颠倒，并返回该数组
 */
/* 第一种实现方式 */
// type Reverse<T extends any[]> = T extends [infer A, ...infer R, infer B] 
//   ? R extends [] 
//     ? [B, A]
//     : [B, ...Reverse<R>, A]
//   : T
/* 第二种实现方式 */
type Reverse<T extends any[]> = T extends [infer A, ...infer R]
  ? [...Reverse<R>, A]
  : []

type E24 = Reverse<['a', 'b', 'c']>
type E25 = Reverse<[1, 2, 3, 4, 5]>

/**
 * 24. 实现一个Split工具类型，根据给定的分隔符（Delimiter）对包含分隔符的字符串进行切割。可用于定义 String.prototype.split方法的返回值类型。
 */
type Split<T extends string, S extends string> = T extends `${infer A}${S}${infer B}` 
  ? [A, ...Split<B, S>]
  : T extends S
    ? []
    : [T]

type E26 = Split<'a,b,c', ','>

/**
 * 25. 实现一个ToPath工具类型，用于把属性访问（.或 []）路径转换为元组的形式
 */

//这里面要注意的就是需要把空字符串去掉
type NonSpace<T extends string[]> = T extends [infer F, ...infer R]
  ? R extends string[]
    ? F extends ''
      ? NonSpace<R>
      : [F, ...NonSpace<R>]
    : never
  : []
// type ToPath<T extends string> = T extends `${infer A}.${infer B}` 
// ? [A, D, ...ToPath<B>]
// : T extends `${'.' | `[${infer D}]`}`
//   ? [D]
//   : [T]
type ToPath<T extends string> = T extends `${infer A}[${infer S}]${infer B}`
  ? NonSpace<[...Split<A, '.'>, S, ...Split<B, '.'>]>
  : NonSpace<Split<T, '.'>>

type E27 = ToPath<'foo.bar.baz'> 
type E28 = ToPath<'foo[0].bar.baz'> 

/**
 * 26. 完善Chainable类型的定义，使得 TS 能成功推断出result变量的类型。调用option方法之后会不断扩展当前对象的类型，使得调用get方法后能获取正确的类型
 */
declare const config: Chainable;

type Chainable<T = {}> = {
    option<K extends string, V>(
        key: K, 
        value: V
    ): Chainable<
        T & {
            [P in keyof {K: K} as `${K}`]: V
        }
    >,
    get(): T
}

const result = config
    .option('name', '怪老头')
    .option('age', 25)
    .option('address', {value: 'HN'})
    .get()

/**
 * 27. 实现一个Repeat工具类型，用于根据类型变量C的值，重复T类型并以元组的形式返回新的类型。
 */
type Repeat<T, C extends number, A extends any[] = []> = A['length'] extends C 
    ? A 
    : Repeat<T, C, [...A, T]>

type E29 = Repeat<'a', 3>
type E30 = Repeat<string, 2>

/**
 * 28. 实现一个RepeatString工具类型，用于根据类型变量C的值，重复T类型并以字符串的形式返回新的类型
 */
type RepeatString<T extends string, C extends number,A extends any[] = [], R extends string = ''> = A['length'] extends C
  ? R
  : RepeatString<T, C, [...A, T], `${R}${T}`>

type E31 = RepeatString<'a', 3>

/**
 * 29. 实现一个ToNumber工具类型，用于实现把数值字符串类型转换为数值类型
 */
type ToNumber<T extends string> = Split<T, ''>['length']

type E32 =  ToNumber<'abc45'>

/**
 * 30. 实现一个SmallerThan工具类型，用于比较数值类型的大小
 */
type SmallerThan<
    N extends number,
    M extends number,
    A extends any[] = []
> = A['length'] extends N 
  ? true
  : A['length'] extends M
    ? false
    : SmallerThan<N, M, [...A, '']>

type E33 = SmallerThan<1, 2>

/**
 * 31. 实现一个Add工具类型，用于实现对数值类型对应的数值进行加法运算
 */
type NumberToArray<T extends number, A extends any[] = []> = A['length'] extends T ? A : NumberToArray<T, [...A, '']>
type Add<
    N extends number,
    M extends number,
> = [...NumberToArray<N>, ...NumberToArray<M>]['length']

type E34 = Add<4, 5>

/**
 * 32. 实现一个Filter工具类型，用于根据类型变量F的值进行类型过滤
 */
type Filter<T extends any[], F> = T extends [infer A, ...infer B] 
  ? A extends F
    ? [A, ...Filter<B, F>]
    : Filter<B, F>
  : []
type E35 = Filter<[6, 'sd', 2, false], string>

/**
 * 33. 数组扁平化
 */
type Flat<T extends any[]> = T extends [infer A, ...infer B]
  ? A extends any[]
    ? [...A, ...Flat<B>]
    : [A, ...Flat<B>]
  : []
type E36 = Flat<[['a', 'e'], ['b', 'c'], ['d']]>

/**
 * 34. 实现StartsWith工具类型，判断字符串字面量类型T是否以给定的字符串字面量类型U开头，并根据判断结果返回布尔值
 */
type StartsWith<
    T extends string, 
    U extends string
> = T extends `${U}${infer A}` ? true : false
type E37 = StartsWith<'123', '12'>

/**
 * 35. 实现IsAny工具类型，用于判断类型T是否为any类型
 */
// 这种情况下unknown与any是一样的
// type IsAny<T> = 0 extends T ? true : false
// type E38 = IsAny<unknown>  //true
// type E39 = IsAny<any>  //true

type IsAny<T> = 0 extends 1 & T ? true : false
type E38 = IsAny<unknown>  //false
type E39 = IsAny<unknown>  //true

/**
 * 36. 实现AnyOf工具类型，只要数组中任意元素的类型非 Falsy 类型、{}类型或[]类型，则返回true，否则返回false
 */
type Flasy = 0 | '' | false | []
type NotEmptyObj<T> = T extends {} ? ({} extends T ? false: true) : true
type AnyOf<T extends any[]> = T extends [infer A, ...infer B]
  ? [A] extends [Flasy]
    ? AnyOf<B>
    : NotEmptyObj<A>
  : false
type E40 =AnyOf<[0 ,'', never]>
type E41 =AnyOf<[0 ,'', 3]>

/**
 * 37. 实现Replace工具类型，用于实现字符串类型的替换操作
 */
type Replace<
 S extends string,
 F extends string,
 T extends string
> = S extends `${infer A}${F}${infer B}`
 ? `${A}${T}${B}`
 : S

type ReplaceAll<
  S extends string,
  F extends string,
  T extends string
> = S extends `${infer A}${F}${infer B}`
  ? `${A}${T}${ReplaceAll<B, F, T>}`
  : S

type E42 = ReplaceAll<'foobarbar', 'bar', 'foo'>

/**
 * 38. 实现IndexOf工具类型，用于获取数组类型中指定项的索引值。若不存在的话，则返回-1字面量类型
 */
type IndexOf<T extends any[], Item, P extends any[] = []> = T extends [infer A, ...infer B]
  ? A extends Item
    ? P['length']
    : IndexOf<B, Item, [...P, '']>
  : -1

type E43 = IndexOf<[1, 2, 3, 4], 0>

/**
 * 39. 实现一个Permutation工具类型，当输入一个联合类型时，返回一个包含该联合类型的全排列类型数组
 */
type Permutation<T, K=T> = [T] extends [never] 
  ? []
  : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never

type E44 = Permutation<'a' | 'b' | 'c'>

/**
 * 40. 实现Unpacked工具类型，用于对类型执行 “拆箱” 操作
 */
type Unpacked<T> = T extends (infer E)[]
  ? E
  : T extends (...args: []) => infer E
  ? E
  : T extends Promise<infer E>
  ? E
  : T

type E45 = Unpacked<string[]>
type E46 = Unpacked<Unpacked<Promise<string>>>
type E47 = Unpacked<any>

/**
 * 41. 实现JsonifiedObject工具类型，用于对object对象类型进行序列化操作
 */
type JsonifiedObject<T extends object> = {
    [K in keyof T]: T[K] extends {toJSON(): infer Return}
      ? ReturnType<T[K]['toJSON']>
        : T[K] extends (...args: any[]) => any
        ? never
        : T[K] extends object
        ? JsonifiedObject<T[K]>
        : T[K]
}

type MyObject =  {
    name: string,
    age: number,
    sayHi: () => void,
    school: {
        high: '市一中'
    }
}

type myObject = JsonifiedObject<MyObject>

/**
 * 42. 实现RequireAllOrNone工具类型，用于满足以下功能。即当设置age属性时，gender属性也会变成必填
 */
type RequireAllOrNone<T, K extends keyof T> = Omit<T, K> & 
(Required<Pick<T, K>> | Partial<Record<K, never>>)

interface Person1 {
    name: string;
    age?: number;
    gender?: number;
}

const t0: RequireAllOrNone<Person1, 'age' | 'gender'> = {
    name: 'oldman'
}
const t1: RequireAllOrNone<Person1, 'age' | 'gender'> = {
    name: 'oldman',
    age: 26,
    gender: 1
}

/**
 * 43. 实现RequireExactlyOne工具类型，用于满足以下功能。即只能包含age或gender属性，不能同时包含这两个属性
 */
type RequireExactlyOne<T, Keys extends keyof T, K extends keyof T = Keys> = Keys extends any
  ? Omit<T, K> & Required<Pick<T, Keys>> & Partial<Record<Exclude<K, Keys>, never>>
  : never

const t2: RequireExactlyOne<Person1, 'age' | 'gender'> = {
    name: 'oldman',
    age: 26,
    // gender: 1  //Error
}

/**
 * 44. 实现ConsistsOnlyOf工具类型，用于判断LongString字符串类型是否由0个或多个Substring字符串类型组成
 */

type ConsistsOnlyOf<T extends string, P extends string> = T extends ''
  ? true
  : T extends `${P}${infer Rest}`
  ? ConsistsOnlyOf<Rest, P>
  : false
  

type E48 = ConsistsOnlyOf<'aaa', 'a'>
