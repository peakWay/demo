
/**
 * 高级类型
 * 1. 交叉类型
 * 2. 联合类型
 * 3. 类型保护与区分类型
 * 4. null类型
 * 5. 类型别名
 * 6. 字符串字变量类型
 * 7. 可辨识联合
 * 8. 多态的this类型
 * 9. 索引类型
 * 10. 映射类型
 * 11. infer操作符
 */

let highType = (function() {
    /**
     * 1. 交叉类型(&)
     * 定义：将多个类型合并为一个类型
     * 使用场景：可用与接口，类实例合并
     */

    function mixin<T, U>(obj1: T, obj2: U) : T & U {
        return {...obj1, ...obj2}
    }

    interface Age{
        name: string,
        age: number
    }

    interface Sex {
        name: string,
        sex: number
    }

    let age: Age = {name: 'oldman', age: 25}
    let sex: Sex = {name: 'peakWay', sex: 1}
    let person = mixin<Age, Sex>(age, sex);
    
    /**
     * 2. 联合类型(|)
     * 定义：一个值拥有多种类型
     * 使用场景：函数参数或返回值可能是多种类型
     * 问题：虽然值可能是多种类型，直接调用某类型属性和方法时会报错，但可以调用公用方法
     */
    function getValue(param: string | number) {
        // return param.split('')  //Error
        // return param.toFixed(2);  //Error
    }

    // getValue(true)   //Error

    interface Fish {
        swim();
        layEggs();
    }

    interface Bird {
        fly();
        layEggs();
    }

    function getFishOrBird() : Fish | Bird {
        return {
            fly: function() {},
            layEggs:  function() {}
        }
    }

    // getFishOrBird().fly();  //Error
    getFishOrBird().layEggs();
    
    
    /**
     * 3. 类型保护与区分类型
     * 可以解决联合类型的问题
     * (1)类型断言
     * (2)用户自定义类型保护
     * (3)typeof类型保护
     * (4)instanceOf类型保护
     */

    /* 类型断言 */
    (<Bird>getFishOrBird()).fly();
    
    /* 用户自定义类型保护 */
    function isFish(pet: Fish | Bird): pet is Fish {
        return (<Fish>pet).swim !== undefined;
    }

    let pet = getFishOrBird();
    if (isFish(pet)) {
        pet.swim();
    } else {
        //会自动确认类型是Bird
        pet.fly()
    }

    /* typeof类型保护 */
    function getValue1(param: string | number) {
        if (typeof param == 'string') {
            param.split('');
        } 

        if (typeof param == 'number') {
            param.toFixed(2);
        }
    }

    /* instanceOf类型保护 */
    class FishClass {
        swim() {}
        layEggs() {}
    }

    class BirdClass {
        fly() {}
        layEggs() {}
    }

    function getFishOrBirdByClass(pet: FishClass | BirdClass) {
        if (pet instanceof FishClass) {
            pet.swim();
        } else {
            pet.fly();
        }
    }
    

    /**
     * 4. null类型
     * 默认任何类型都可以设置为null和undefind类型，当tsconfig中strictNullChecks设置为true时，不行
     */

    //strictNullChecks为true 
    // let a: string = null;  //Error
    //strictNullChecks为false
    // let a: string = null;  //ok

    /* 可选参数和可选属性 */
    function nullFn(a: string, b?:string) {
        console.log(b);
    }
    //不传默认undefined
    nullFn('a')   //undefined
    nullFn('a', 'b')  //b
    // nullFn('a', null)  //Error

    function nullFn1(a: string, b: string | null)  {}
    nullFn1('a', null)   //ok

    /* 类型保护和类型断言 */

    //类型断言
    function nullFn2(value: string | null){
        if (value == null) return;
        value.split('');
    }

    //类型保护(添加!后缀)
    function nullFn3(value: string | null) {
        value!.split('');
    }

    /**
     * 5. 类型别名
     * 定义：不会创建个新类型，创建个新名字来引用类型。与接口很像，但可以作用于交叉类型、联合类型、元组、泛型等任何手写类型
     * 
     * 接口 vs 类型别名
     * 1. 类型别名不创建新类型，当指针查看类型时仍然显示原始类型
     * 2. 类型别名不能被extends和implement，但在类型约束时使用extends
     * 3. 接口不能描述交叉类型、联合类型、元组
     * 结论：优先使用接口，类型别名次之
     */

    type Name = string;
    type FuncName = () => void;
    type UnionName = string | number;
    type CrossName = Name & UnionName;
    type TupleName = [string, number];
    type GenericName<T> = { a: T, b: string };

    /**
     * 6. 字符串字面量类型
     * 定义：字符串字面量类型允许你指定字符串必须的固定值
     * 使用场景：
     * 1. 实现类似枚举(字符串字面量类型联合+类型保护)
     * 2. keyof(等效字符串字面量类型联合)
     */
    /* 实现枚举 */
    type Option = 'A' | 'B' | 'C' | 'D';
    function answer(value: Option): boolean {
        if (value == 'A') {
            return false;
        } else if(value == 'B') {
            return false;
        } else if(value == 'C') {
            return false;
        } else {
            return true;
        }
    }

    
    /**
     * 7. 可辨识联合
     * 主要利用公用属性类型作为可识别特征
     * 组成要素：
     * 1. 具有普通的单例类型属性—可辨识的特征
     * 2. 类型保护
     * 3. 类型别名（可有可无）
     */
    interface Square {
        kind: 'square',
        size: number
    }
    interface Rectangle {
        kind: 'rectangle',
        width: number,
        height: number
    }
    interface Circle {
        kind: 'circle',
        radius: number
    }
    type Shape = Square | Rectangle | Circle
    function area(shape: Shape) {
        switch(shape.kind){
            case 'square':
                return shape.size * shape.size;
                break
            case 'rectangle':
                return shape.width * shape.height;
                break
            case 'circle':
                return Math.PI * shape.radius ** 2;
                break
        }
    }

    area({kind: 'square', size: 20})

    /**
     * 索引类型
     * 使用索引类型可检查动态属性名
     * 1. 索引类型查询操作符(keyof T)
     * 2. 索引访问操作符(T[K])
     */
    interface Person {
        name: string,
        age: number
    }

    //等于将对象属性组成字符串字面量类型
    let personProps: keyof Person;  //'name' | 'age'
    personProps = 'name';
    // personProps = 'unknown';  //Error


    function getProperty<T, K extends keyof T>(o: T, key: K): T[K] {
        return o[key];
    }
    
    let person1:Person =  {name: 'oldman', age: 25};
    let value = getProperty(person1, 'age');
    
    /**
     * 10. 映射类型
     * 定义：从旧类型创建一个新类型
     * (1)for...in
     * (2)同态/案例
     */
    
    /* for...in 遍历联合类型中的每一种类型，常与keyof结合*/

    //固定联合类型
    type OptionKeys = 'options1' | 'options2';
    type optionAllNumber = {
        [P in OptionKeys]: number
    }


    //固定接口
    interface Position {
        x: number
        y: number
    }

    type PositionType = {
        [P in keyof Position]: number;
    }

    //泛型
    interface InPerson {
        name: string,
        age: number
    }

    type CloneType<T> = {
        [P in keyof T]: T[P]
    }

    function cloneObject<T>(obj: T): CloneType<T> {
        return obj
    }

    let inperson: InPerson = {name: 'oldman', age: 25};
    cloneObject(inperson);

    /* 同态：需要拷贝。上面的CloneType类转化是同态的，映射只作用于T的属性。 */
    /* 案例 */
    
    //映射只读
    interface PersonCase {
        name: string,
        age: number
    }
    
    type ReadOnly<T> = {
        readonly [P in keyof T]: T[P]
    }
    let personCase: PersonCase = {name: 'oldman',age: 25}
    personCase.name  = 'peakWay';

    let personCase1: ReadOnly<PersonCase> = {name: 'oldman',age: 25};
    // personCase1.name = 'peakWay';  //Error
    
    //映射可选
    // let personCase2: PersonCase = {name: 'oldman'};  //Error
    type Partial<T> = {
        [P in keyof T]?: T[P]
    }
    let personCase2: Partial<PersonCase> = {}  //ok
    
    //映射可为null
    type Nullable<T> = {
        [P in keyof T]: T[P] | null
    }

    // let personCase3: PersonCase = { name: null, age: null };  //Error
    let personCase3: Nullable<PersonCase> = { name: null, age: null };

    //代理增加设置函数和获得函数
    type Proxy<T> = {
        get(): T,
        set(value: T): void
    }

    type Proxify<T> =  {
        [P in  keyof T]:  Proxy<T[P]>
    }

    function proxify<T>(o: T): Proxify<T> {
        let res = {} as Proxify<T>;
        for (let key in o) {
            res[key] = {
                get: function() {
                    return o[key];
                },
                set: function(value)  {
                    o[key] = value
                }
            }
        }
        return res;
    } 
    
    let res = proxify<PersonCase>(personCase);
    res.age.get();
    res.name.set('peakWay');

    //非同态:设置特定key为指定类型
    type Record<K extends keyof any, T> = {
        [p in K]: T
    }
    
    type TwoStringProps = Record<'name' | 'age', string>;
    let personCase4: TwoStringProps = {name: 'oldman', age: '25'}

    //解除设置函数代理
    function unproxify<T>(t: Proxify<T>):  T {
        let res = {} as T;
        for(let key in t) {
            res[key] = t[key].get();
        }
        return  res;
    }

    //剔除
    //extends会遍历所有的值判断是否继承
    type Exclude<T, U> = T extends U ? never : T;
    type Extract<T, U> = T extends U ? T : never;

    type One = 'a' | 'b' | 'c';
    type Two = 'a' | 'c';
    type TExclude = Exclude<One, Two>;  //'b'
    type TExtract = Extract<One, Two>;  //'a' | 'c'

    type NonNullable<T> = T extends null | undefined ? never : T;
    type NonNullType = NonNullable<string | number | null | undefined>

    //将所有Null类型值去掉
    type NonNullableValue<T> = {
        // [P in keyof T]: Exclude<T[P], null | undefined>
        [P in keyof T]: NonNullable<T[P]>
    };
    interface PersonNull {
        name: string | null
    }

    type PersonNoNull = NonNullableValue<PersonNull>

    // let personCase5: PersonNoNull =  {name: null}  //Error

    /**
     * 11. infer操作符
     * (1) infer操作符可以用来声明一个待推断的类型变量
     * (2) infer可以用在条件类型不同声明类型的位置
     * (3) 借助infer实现类型转换
     */

    /* infer操作符可以用来声明一个待推断的类型变量 */
    type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

    /* infer操作符可以用来声明一个待推断的类型变量 */
    //数组类型推断
    type ArrayType<T extends any[]> = T extends (infer U)[] ? U : any;

    //Promise类型推断
    type PromiseType<T extends Promise<any>> = T extends Promise<infer U> ? U : any;

    //参数类型判断
    type ParamType<T extends (...args: any) => any> = T extends (...args: infer U) => any ? U : never

    /* 借助infer实现类型转换 */
    //元组转联合类型
    type TupleToUnion<T> = T extends (infer U)[] ? U : never;

    //联合类型转交叉类型
    type UnionToIntersection<T> = (T extends any ? (K: T) => void : never) extends ((K: infer U) => void) ? U : never;
})