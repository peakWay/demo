
/**
 * 1. 类
 * 2. 继承
 * 3. 公共、私有与受保护修饰符
 * 4. 存取器
 * 5. 静态属性
 * 6. 抽象类
 * 7. 构造函数
 */

let classSpace = (function() {
    /**
     * 1. 类
     */
    class Person {
        name: string;
        constructor(name: string) {
            this.name = name
        }
        sayHi() {console.log(`Hi, ${this.name}`)}
    }

    /**
     * 2. 继承
     */
    class OldPerson extends Person {
        age: number;
        constructor(name: string, age: number) {
            super(name);
            this.age = age;
        }
        sayHi() {console.log(`Hi, 我叫${this.name},我今年${this.age}岁了`)}
    }

    /**
     * 3. 公共、私有与受保护修饰符
     * public、private、protected
     * 默认为public
     * private只能当前类内部访问、派生类和实例对象都不能访问
     * protected当前类及派生类内部访问、实例对象不能访问
     */
    class PublicPerson {
        public name: string;
        constructor(name: string) {
            this.name = name
        }
        public sayHi() {console.log(`Hi, ${this.name}`)}
    }

    /* private */
    class PrivatePerson {
        private name: string;
        constructor(name: string) {
            this.name = name
        }
        sayHi() {console.log(`Hi, ${this.name}`)}
    }

    let privatePerson = new PrivatePerson('oldman');
    // privatePerson.name  //Error
    privatePerson.sayHi()

    class OldPrivatePerson extends PrivatePerson {
        age: number;
        constructor(name: string, age: number) {
            super(name);
            this.age = age;
        }
        // sayHi() {console.log(`Hi, 我叫${this.name},我今年${this.age}岁了`)}  //Error
    }

    /* protected */
    class ProtectedPerson {
        protected name: string;
        constructor(name: string) {
            this.name = name
        }
        sayHi() {console.log(`Hi, ${this.name}`)}
    }

    let protectedPerson = new ProtectedPerson('oldman');
    // protectedPerson.name  //Error
    protectedPerson.sayHi()

    class OldProtectedPerson extends ProtectedPerson {
        constructor(name: string, public age: number) {
            super(name);
        }
        sayHi() {console.log(`Hi, 我叫${this.name},我今年${this.age}岁了`)}
    }


    /**
     * 4. 存取器
     */
    class VisitPerson {
        private _name: string;

        set name(value) {
            this._name = value;
        }
        
        get name(): string {
            return this._name;
        }

    }

    let visitPerson = new VisitPerson()
    visitPerson.name = 'oldman'
    console.log(visitPerson.name)

    /**
     * 5. 静态属性
     * 静态属性存在于类本身上而不是实例上
     * 一般用来存储静态变量和作为工厂函数
     */
    class StaticPerson {
        static SEX_N = 1;
        
        constructor(public name: string) {  }
    }

    let staticPerson = new StaticPerson('oldman');
    console.log(StaticPerson.SEX_N)

    /**
     * 6. 抽象类
     * 抽象类不能被实例化，只能通过其派生类实例化
     * 抽象类的抽象属性和抽象方法必须在派生类中实现
     */

    abstract class AbstractPerson {
        name: string;
        abstract age: number;
        constructor(name: string) {
            this.name = name
        }
        sayHi() {console.log(`Hi, ${this.name}`)}
        abstract sayAge(): void;
    }

    // new AbstractPerson('oldman') //Error
    
    class OlderAbstractPerson extends AbstractPerson {
        age: number;
        constructor(name: string, age: number) {
            super(name);
            this.age = age;
        }
        sayAge() {
            console.log(`我今年${this.age}岁`);
        }
        laugh() {
            console.log('哈哈哈哈哈')
        }
    }

    let olderAbstractPerson = new OlderAbstractPerson('oldman', 24);
    olderAbstractPerson.sayAge();
    olderAbstractPerson.laugh();

    /**
     * 7. 构造函数
     * 类能分为实例部分和静态部分
     * typeof 获取构造函数类型，这样能访问类的静态部分
     */
    class ConstructorPerson {
        static SEX_N = 1;

        constructor(public name: string) {}
    }

    let personConstructor: typeof ConstructorPerson = ConstructorPerson;
    console.log(personConstructor.SEX_N)
    let personConstructorIns = new personConstructor('oldman');
    
})()