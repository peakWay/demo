
/**
 * JSX
 * 1. 类型断言限制
 * 2. 类型检查
 */
/// <reference types="lodash" />


const jsx = (function(){
    /**
     * 1. 类型断言限制
     * 之前类型断言有两种方式：尖括号<Type>和as，尖括号的方式会与JSX中的元素冲突，所以在JSX中只能使用as做类型断言
     */
    interface MouseEvent {x: number, y: number};
    function listenEvent(e) {
        // (<MouseEvent>e).x  //Error
        (e as MouseEvent).x
    }

    
    /**
     * 类型检查
     * (1) 固有元素
     * (2) 基于值的元素(自定义组件)
     * <1>无状态组件
     * <2>类组件
     * (3) 属性类型检查
     * (4) 子孙类型检查
     */
    
    /* 固有元素 */
    //如果不设置JSX.IntrinsicElements就不会对固有元素进行类型检查，否则固有元素名字就需要在JSX.IntrinsicElements里
    // <div></div>  //设置JSX.IntrinsicElements报错

    /* 基于值的元素 */
    //无状态组件
    const Button = (props: {value: string}) => <button value={props.value}></button>

    //类组件
    //通过JSX.ElementClass让类组件实例具有特定属性，比如(React类组件必须有render函数)
    class MyComponent {
        render() {}
    }

    let myComponent = <MyComponent />;


    class NotAValidComponent {}
    // let notAValidComponent = <NotAValidComponent />  //Error
    function MyFactoryFunction() {
        
    }
    let myFactoryFunction = <MyFactoryFunction />  //文档上通过工厂函数创建的类组件未返回render会报错，但并没有
    
    /* 属性类型检查 */
    class MyComponent1 {
        props: {
            name: string
        }
        render() {}
    }

    // let myComponent1 = <MyComponent1 />;  //Error
    //注：React中的设置ts的Props的属性设置可能来源于这，之后可以尝试


    /* 子孙类型检查 */
    const CustomComp = (props) => <span>props.children</span>

    let customComp = (
        <CustomComp>
            <span>a</span>
            <span>b</span>
        </CustomComp>
    )

})()