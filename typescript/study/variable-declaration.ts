
/**
 * 声明
 * 1. 解构
 * 2. 展开
 */

let variableDeclaration = (function() {
    let o = {
        name: 'oldman',
        age: 24,
        sayHi: () => {
            console.log('Hello');
        }
    }
    
    //解构
    let { name = 'peakway', age: myAge } : {name: string, age: number} = o;

    //展开
    //展开的属性只能是可枚举的自身属性
    let oc = { ...o }
    console.log(oc.name)

    oc.sayHi()   //OK

    class C {
        age = 24;
        sayHi () {
            console.log('Hello');
        }
    }

    let c = new C();
    let cc = {...c};
    console.log(cc.age);  //OK
    // cc.sayHi();  //Error
})()