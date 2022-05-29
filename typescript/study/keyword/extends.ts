interface Person {
    name: string;
    age: number;
}
let s: string = 'string';
let n: number = 1;
let tuple: [string, number] = ['string', 1];
let nul: null = null;
let undef: undefined;
let b: boolean = true;
let p: Person = {
    name: '怪老头',
    age: 26
} 
enum Enum {
    name, age
}
let arr: string[] = ['one', 'two']
type Func = (person: Person) => string;
const func: Func = (person) => {
    return person.name
}
let a: any;
let u: unknown;
let o: object;
type abc = 'a' | 'b' | 'c';
let c: abc;    //字面量联合类型

//any可能是任何类型的子集
type anyExtendsAny = any extends Person ? true : false
type anyExtendsNull = any extends null ? true : false           //boolean
type dd = never extends any ? true : false

//null/undefined类型是null/undefined的子集
//undefined 和 null是任何类型的子集
type stringExtendsNull = string extends null ? true :  false   
type interfaceExtendsNull = Person extends null ? true : false  
type numberExtendsNull = number extends null ? true: false    
type unknownExtendsNull = unknown extends null ? true : false     
type nullExtendsUndefined = undefined extends null ? true : false
type nullExtendsString = null extends string ? true : false
type stringExtendsUndefined = string extends undefined ? true : false
type undefinedExtendsUnknown = undefined extends unknown ? true  : false
type unknownExtendsNever = unknown extends never ? true  : false
/**
 * 元组是数组的子集（需里面项类型相同）
 */
type arrayExtendsTuple = [string, string] extends  string[] ? true : false
//接口继承对象
type PersonExtendsObject = Person extends Object ? true : false

/**
 * 接口继承接口
 * extends左边类型的包含右边所有字段并且右边必选左边也必选，才为子集
 */
type interExtendsInter = Person extends {name: string} ? true : false

/**
 * 枚举实质是对象，类型类似{[key: string]: string | number}
 * 枚举是Object的子集，但枚举与接口不互相继承
 */
type enumExtendsObject = Enum extends Object ? true : false

//任何类型都是unknown的子集
type AnyExtendsUnknown = null extends unknown ? true : false

//never是任何值的子集
type AnyExtendsNever = never extends [string, number] ? true : false

/**
 * 字面量类型
 * 1. extends左边的都在右边中即为子集
 */
type stringExtendsString = 'a' | 'c' extends abc ? true : false

/**
 * 函数继承
 * 函数继承需要满足两个条件
 * 1. 参数：右边是左边的子集
 * 2. 返回值：左边是右边的子集
 */
type AnyFunc = (a: string[]) => never;
type AnyFunc1 = (a: [string, string]) => never;

type FuncExtendsFunc = AnyFunc extends AnyFunc1 ? true : false


/**
 * 特殊的空对象
 * 除any任何类型都是空对象的子集
 */
type numberSExtendsObj = 23 extends {} ? true : false
type neverSExtendsObj = unknown extends {} ? true : false
type anySExtendsObj = any extends {} ? true : false