
/**
 * 类型兼容
 * 1. 属性兼容
 * 2. 两个函数
 * 3. 类兼容
 * 4. 泛型兼容
 * 5. 子类型与赋值
 */

const typeCompatibility = (function() {
    /**
     * 属性兼容
     */
    interface Named {
        name: string
    }

    interface Person {
        name: string
        age: number
    }

    let x: Named;
    let y: Person  = {name: 'oldman', age: 24}
    x = y;

    function createNamed(name: Named) {}
    createNamed(x);

    /**
     * 两个函数
     * (1)函数赋值：左边函数的每个参数都能在右边函数的参数中对应位置中类型相同即能赋值
     * (2)函数参数双向协变：只有源函数参数能够赋值给目标参数这是不准确的，可能传入更精确的类型参数，双向协变就可以使用精确的类型信息
     */

    /* 函数赋值 */
    let x1 = (name: string) => 0
    let y1 = (name: string, age: number) => 0
    let y2 = (name: number, age: string) => 0

    // x1 = y1;   //Error
    y1 = x1;
    // y2 = x1;   //Error

    /* 函数参数双向协变 */
    enum EventType { Mouse, Keyboard }
    interface Event { timestamp: number };
    interface MouseEvent extends Event { x: number, y: number }
    interface Keyboard extends Event { keyCode: number }

    function listenEvent(eventType: EventType, handler: (e: Event) => void) {

    }

    //不完善，但有用且普遍
    listenEvent(EventType.Mouse, (e: MouseEvent) => {console.log(`${e.x}, ${e.y}`)})

    //存在稳健性的不良选择
    listenEvent(EventType.Mouse, (e: Event) => {console.log(`${(<MouseEvent>e).x}, ${(<MouseEvent>e).y}`)})
    listenEvent(EventType.Mouse, <(e: MouseEvent) => void>((e) => {console.log(`${e.x}, ${e.y}`)}))

    /**
     * 类兼容
     * 文档上支持，但现版本需要先赋值
     */
    class Person1 {
        name: string
        constructor(name: string) {}
    }

    class Person2 {
        name: string
        constructor(name: string, age: number) {}
    }

    let x3: Person1;
    let y3: Person2;
    y3 = new Person2('oldman', 24);  //文档上无，注释掉这行即报错

    x3 = y3;  //Error
    y3 = x3;

    /**
     * 泛型兼容
     * 文档上支持，但现版本需要先赋值
     */
    interface Generic<T> {
    }

    let x4: Generic<number>;
    let y4: Generic<string>;
    y4 = '';  //文档上无，注释掉这行即报错
    x4 = y4;
})()