
/**
 * 接口
 * 1. 接口属性
 * (1) 可选属性
 * (2) 只读属性
 * (3) 额外属性
 * (4) 索引属性
 * (5) 函数属性
 * 2. 函数接口
 * 3. 类实现接口
 * 4. 混合类型
 * 5. 继承接口
 * 6. 接口继承类
 * 总结：
 * 1. 接口本质上可以描述所有对象。无论是函数、数组、类实例，其都是对象，所以都能通过接口来定义。
 * 2. ts所有语法都可以分为值与类型两类。接口属于类型语法，不会创建变量。
 * 3. 接口与接口之间的继承就等于拓展，定一个更多属性、方法的类型。接口继承类会取类的所有实例属性、方法并将其定义为对应的类型
 * 4. 类通过实现(implements)来连接接口，相当于给这个类的实例定义了必须实现对应类型的属性和方法
 */

let interface = (function(){
    /* 1.接口属性 */
    //(1)可选属性
    interface OptionalProp {
        name?: string,
        age?: number
    }
    let oo: OptionalProp = {
        name: 'oldman'
    }

    //(2)只读属性
    interface ReadonlyProp {
        readonly name?: string
    }
    let or: ReadonlyProp = {
        name: 'oldman'
    }
    // or.name = 'peakWay';  //Error

    //(3)额外属性
    interface ExtraProp  {
        name?: string,
        age?: number
    }

    function createO(prop: ExtraProp) {
        console.log(prop.name, prop.age)
    }

    // createO({name: 'oldman', birth: '1996'})  //Error

    //第一种解决方案
    createO(({name: 'oldman', birth: '1996'}) as ExtraProp);

    interface ExtraProp1 extends ExtraProp {
        [propName: string]: any
    }
    function createO1(prop: ExtraProp1) {
        console.log(prop.name, prop.age)
    }

    //第二种（最佳）
    createO1({ name: 'oldman', birth: '1996' })
    
    //第三种
    let options = { name: 'oldman', birth: '1996' }
    createO(options);

    //(4)索引属性
    /**
     * 数组的本质是对象，键为索引值的字符串："1","2"直至length-1，值为对应索引上的值
     * 用1去索引等效于"1"去索引,
     */
    interface IndexProp {
        [index: number]: string
    }

    let stringArr: IndexProp = ['oldman', 'peakWay'] 

    interface IndexProp1 {
        [index: number]: string
        length: number;
    }
    let stringArr1: IndexProp1 = {1: 'sd', length: 3}

    interface NumberDictionary {
        [index: string]: number;
        length: number;    // 可以，length是number类型
        // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
    }

    // let numberArr: NumberDictionary = [1, 2]  //Error 索引的类型必须为数值
    


    //(5)函数属性
    interface FuncProp {
        getIntroduce(name: string, age: number): string
    }

    let ofunc: FuncProp =  {
        getIntroduce: function(name: string, age: number) {
            return `hi, my name is ${name}, my age is ${age}`;
        }
    }
    /* 1.接口属性 */

    /* 2.函数接口 */
    interface FuncInterface {
        (name: string, age: number): string
    }

    // let getIntroduceFunc: funcInterface;
    let getIntroduceFunc = <FuncInterface>function(name, age) {
        return `hi, my name is ${name}, my age is ${age}`;
    }

    /* 2.函数接口 */

    /* 3.类实现接口 */
    /**
     * 对类做了限制
     * 只能实现类实例部分，静态不分不行
     */

    interface PersonInterface {
        readonly name: string,
        age?: number,
        getIntroduce(name: string, age: number): string,
        // new (name: string, age: number): Person   //这种方式定义构造函数类型不行
        // npc: Person                               //这种方式定义静态方法不行
    }

    class Person implements PersonInterface {
        readonly name: string;
        age?: number;
        getIntroduce(name: string, age: number) {
            return `hi, my name is ${name}, my age is ${age}`;
        }

        constructor(name: string, age?: number) {
            this.name = name;
            this.age = age;
        }

        static npc() {
            return new Person('npc', 50)
        }
    }

    let myInfo = new Person('oldman')
    // myInfo.name = 'peakWay'  //Error

    interface PersonConstrutor {
        new (name: string, age: number): Person
    }
    let createPerson = function (ctor: PersonConstrutor, name: string, age: number) {
        return new ctor(name, age);
    }

    createPerson(Person, 'oldman', 25)
    /* 3.类实现接口 */

    /* 4.混合类型 */
    interface Counter {
        (start: number): void,
        value: number
    }

    function getCounter(): Counter {
        let counter = <Counter>function(start: number) {};
        counter.value = 100;
        return counter;
    }

    let c = getCounter();
    c(10);
    console.log(c.value)
    /* 4.混合类型 */

    /* 5.继承接口 */
    //可以继承多个接口 
    interface LineWidth {
        width: number
    }
    interface Color {
        color: string
    }
    interface Draw extends LineWidth, Color{
        drawLine(): void
    }
    /* 5.继承接口 */

    /* 6.接口继承类 */
    /**
     * 当接口继承了一个类类型时，它会继承类的成员但不包括其实现
     * 当接口继承了含有私有属性的类，那这个接口只能被这个类及其子类实现
     */
    class Control {
        private state: any;
    }

    interface ControlInterface extends Control {
        props: any;
    }

    // class Button implements ControlInterface {
    //     props: any;
    //     state: any;
    // }   //Error

    class Button extends Control implements ControlInterface {
        props: any;
    }
    /* 6.接口继承类 */
})()

