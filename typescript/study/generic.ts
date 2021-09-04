

/**
 * 泛型
 * 1. 泛型与any
 * 2. 泛型变量
 * 3. 泛型接口
 * 4. 泛型类
 * 5. 泛型约束
 */

const generic = (function() {
    /**
     * 1. 泛型与any
     * 泛型只是一种类型，不会丢失信息
     * any即是一种类型，也是一种值，会丢失信息
     */
    // let a: T = 'string';   //Error
    let b: any = 'string';

    function identifyG<T>(arg: T): void {
        // arg.length  //Error
    }

    function identifyA(arg: any) {
        arg.length
    }

    /**
     * 2. 泛型变量
     */
    function identify<T>(arg: T): T {
        return arg;
    }

    /**
     * 3. 泛型接口
     * 可以指定泛型类型来限制
     */
    interface IdentifyInterface<T> {
        (arg: T): T
    }

    let identifyFunc: IdentifyInterface<number> = identify;

    // identifyFunc('sd');   //Error
    identifyFunc(1);

    /**
     * 4. 泛型类
     * 泛型类指的是实例部分
     */
    class GenericClass<T> {
        zeroValue: T;
        add: (x: T, y: T) => T
    }
    
    let stringIns = new GenericClass<string>();
    stringIns.add(stringIns.zeroValue, '测试')

    /**
     * 5. 泛型约束
     * (1) 通过extends接口
     * (2) 通过类型参数  //文档可以，事实上不可以
     */

    /* 通过extends接口 */
    interface lengthGeneric {
        length: number 
    }

    function identifyLength<T extends lengthGeneric> (arg: T) {
        console.log(arg.length)
    }

    identifyLength([1,2]);
    identifyLength({length: 3, value: 'typescript'});

    /* 通过类型参数 */
    // function identifyParam(obj: T, key: string) {
    //     return obj[key];
    // }

    // let o = { a: '1', b: '2'}
    // identifyParam(o, 'c');
    // identifyParam(o, 'a');

    
})()