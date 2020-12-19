
/**
 * 类私有域
 */

/**
 * 私有静态字段及方法
 * 1.私有静态字段及方法不能外部调用，可以被公开方法获取，调用(是否静态都可以)
 * 2.私有静态字段及方法不能被this调用
 * 3.实例可以通过公开方法调用私有静态字段，但不能调用私有静态方法
 * 
 * 子类
 * 1.子类无法获取,调用父类的私有静态字段及方法
 * 2.但可以通过继承过来的父类公开静态方法间接获取，调用
 */
class ClassWithPrivateStaticFields {
    static #filed

    static #privateStaticMethod () {
        ClassWithPrivateStaticFields.#filed = 56
        return ClassWithPrivateStaticFields.#filed
    }

    static publicStaticMethod () {
        ClassWithPrivateStaticFields.#filed = 42
        return ClassWithPrivateStaticFields.#filed
    }

    static publicStaticMethod1 () {
        return ClassWithPrivateStaticFields.#privateStaticMethod()
    }

    publicMethod () {
        console.log(ClassWithPrivateStaticFields.#filed)
        return ClassWithPrivateStaticFields.#privateStaticMethod()
    }

    publicMethod1 () {
        console.log(this.#filed)
    }
}

class SubClassWithPrivateStaticFields extends ClassWithPrivateStaticFields {
    static subCallStaticFieldsOrMethod () {
        //Error
        // SubClassWithPrivateStaticFields.#filed = 64
        // super.#filed = 64
        // return super.#privateStaticMethod()
        // return SubClassWithPrivateStaticFields.#privateStaticMethod()
    }
}

//父类
// console.log(ClassWithPrivateStaticFields.#filed) //Error
// console.log(ClassWithPrivateStaticFields.publicStaticMethod()) //42
// console.log(ClassWithPrivateStaticFields.publicStaticMethod1()) //56
// console.log(ClassWithPrivateStaticFields.publicMethod()) //not function
// console.log(new ClassWithPrivateStaticFields().publicMethod()) //undefinded 56
// console.log(new ClassWithPrivateStaticFields().publicMethod1()) //Error

//子类
// console.log(SubClassWithPrivateStaticFields.#filed)  //Error
// console.log(SubClassWithPrivateStaticFields.subCallStaticFieldsOrMethod()) //Error
// console.log(SubClassWithPrivateStaticFields.publicStaticMethod())  //42
// console.log(SubClassWithPrivateStaticFields.publicStaticMethod1()) //56
// console.log(SubClassWithPrivateStaticFields.publicMethod()) //not function

/**
 * 私有实例字段及方法
 * 1.不能调用未定义的私有实例字段及方法
 * 2.类本身、实例都无法调用私有实例字段及方法
 * 3.私有实例字段及方法不能外部调用，可以被公开方法获取
 * 4.私有getter、setter也可以
 */

class ClassWithPrivateFields {
    #field

    get #decoratedField() {
        return `包装后：${this.#field}`;
    }

    set #decoratedField(value) {
        this.#field = value
    }

    constructor () {
        this.#field = 42
        // this.#randomField = 50 //Error
    }

    #privateMethod() {
        this.#field = 56
        return this.#field
    }

    publicMethod () {
        this.#field = 70
        return this.#privateMethod()
    }

    publicMethod1 () {
        this.#decoratedField = 80
        return this.#decoratedField
    }
    
}

// console.log(ClassWithPrivateFields.#field) //Error
// new ClassWithPrivateFields().#field()   //Error
// new ClassWithPrivateFields().#privateMethod()  /Error
// console.log(new ClassWithPrivateFields().publicMethod()) 56
// console.log(new ClassWithPrivateFields().publicMethod1()) //包装后：80

