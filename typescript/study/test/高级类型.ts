
/**
 * 一、交叉类型
 * 一般用于同时拥有多个对象（接口/类实例）属性类型
 * 
 * 二、extends,有以下几种情况：
 * 1. 继承类型为字面量。左边是字面量类型（字符串或者数值），那么会判断左边每个字面量是否在右边类型中
 * 2. 继承类型为函数。函数为继承关系要求参数和返回值是继承关系。
 * (1)参数继承关系及子级的所有参数都在父级的参数内并且类型相同。
 * (2)返回值继承关系为，如果父级的返回值类型为void或any，则子级返回值可为任何类型，否则需要与父级返回值类型一致
 * 3. 继承类型为数组。数组的继承关系取决于项的类型继承。
 * (1)若数组项的类型为字面类型，则数组项可以为任意字面量即为继承关系。否则类型要与父级类型一致
 * (2)元组本身也是数组，只要元组项满足继承关系即可
 * 
 * infer 在泛型继承中可以推断类型
 * 1. 不能在限制泛型条件中推断
 * 2. infer推断结果如果有多种类型，则结果为类型组成的元组
 */

/* 交叉类型 */
type A = string & number;

interface IFA {
    name: string;
}
interface IFB {
    age: number;
}

type B = string & IFA;

// let example1: B = 'sd';   //Error
// let exmaple2: B = {name: 'sd'};   //Error

type C = IFA & IFB;
let example3: C = {name: 's', age: 20};
/* 交叉类型 */


class BasicCalculator {
    constructor(protected value: number = 0) {}

    add(operand: number) {
        this.value += operand;
        return this;
    }
    
}

class SpecialCalculator extends BasicCalculator {
    sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}

let v = new SpecialCalculator().add(4).sin()


/* extends */
interface Person {
    name: string;
    age: number;
}

type _Picker<T, K extends keyof T> = {
    [P in K]: T[P]
}

let onlyNamePerson: Pick<Person, 'name'> = {
    name: '怪老头'
}

type _Extends<T, K extends T> = {
    value: K
}

type numberString = 1 | 2;
type group = (number | string)[];
type yuangroup = [number, string];
type Fnumber = 1 | 2 | 3;
type stringOne = 'one' | 'two' | 'three';
type stringTwo = 'one' | 'two';

let custom: _Extends<stringOne, stringTwo> =  {
    value: 'one'
}

let custom1: _Extends<group, yuangroup> =  {
    value: [1, '2']
}

let custom2: _Extends<(name: string, age: number) => void, (name: string) => never> = {
    value: (name) => {
        throw Error();
    }
}

type _Exclude<T, U> = T extends U ? never : T;
type T00 = _Exclude<"a" | "b" | "c" | "d", "a" | "c" | "f">; 

type _Extract<T, U> = T extends U ? T : never;
type T01 = _Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  // "a" | "c"

type _NonNullable<T> = T extends null | undefined ? never : T;
type T04 = _NonNullable<string | number | undefined>;  // string | number

type _ReturnType<T> = T extends (...args: any) => infer R ? R : never;
type T10 = _ReturnType<() => string>;  // string
type T11 = ReturnType<(s: string) => void>;  // void

type _InstanceType<T extends abstract new (...args) => any> = T extends new (...args: any) => infer R ? R : any;
class MC {
    x = 0;
    y = 0;
}
type T20 = _InstanceType<typeof MC>;  // C
type T21 = _InstanceType<any>;  // any
type T22 = _InstanceType<never>;  // any
// type T23 = _InstanceType<string>;  // Error
// type T24 = _InstanceType<Function>;  // Error

type _Omit<T, K extends keyof T> = _Picker<T, _Exclude<keyof T, K>>

let noAgePerson: _Omit<Person, "age"> = {
    name: '怪老头'
}
/* extends */

/* infer */
type ArrayToGroup<T> = T extends Array<infer P> ?  P  : never;
/* infer */
