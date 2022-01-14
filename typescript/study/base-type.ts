
/**
 * 基础类型
 * 1. 布尔值
 * 2. 数值
 * 3. 字符串
 * 4. 数组
 * 5. 元组
 * 6. 枚举
 * 7. any
 * 8. void
 * 9. null / undefined
 * 10. never
 * 11. object
 * 12. 类型断言
 */

(function() {
    //布尔值
    let bool: boolean = true;

    //数值
    let num: number = 1;

    //字符串
    let str: string = 'hello';

    //数组
    let arr1: number[] = [1, 2];
    let arr2: Array<number> = [1, 2];
    let arr4: readonly number[] = [1, 2];

    //元祖
    //元祖已知索引的元素必须类型相同, 2.7以下越界的元素为联合类型，以上会报错
    let arr3: [number, string];
    arr3 = [1, '1'];
    // arr3[5] = 2;  //Error

    //枚举
    enum Color {
        red = 1,
        green,
        blue
    }

    //any 
    let o: any = {}
    o.name = 'old'

    //void
    function print(): void {
        console.log(12)
    }

    //null/undefined
    //选项strictNullChecks不开启时，任何类型都可以赋值null/undefined，开启后只能复制本身
    let n: number;
    // n = null;   //Error  strictNullChecks: true
    let n1: null;
    n1 = null;

    // never
    // 无终点
    function error(): never {
        throw new Error('error')
    }

    //object
    //非原始类型(原始类型：boolean, number, string, null, undefined, symbol)
    //不能获取属性

    let obj: object;
    obj = {a: 1};
    // obj.a;   //Error


    //类型断言
    //两种方式：尖括号和as
    let value: any = 'string';
    let strLength = (value as string).length;
    let strLength1 = (<string>value).length;
})()