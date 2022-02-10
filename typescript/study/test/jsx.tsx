
/**
 * jsx定义来源于jsx.test.d.ts
 * 类型检查主要有以下几个部分
 * 1. 固有元素：IntrinsicElements
 * 2. 基于值的元素（自定义元素）
 * (1)无状态函数组件 
 * (2)类组件 ElementClass
 * 3. 属性检查 ElementAttributesProperty
 * 4. 子孙类型检查 ElementChildrenAttribute
 */
(function() {
    //固有元素的定义
    let a = <a href=""></a>

    //无状态函数组件
    interface ButtonInterface {
        text: string,
        style?: object
        onClick?: () => void
    }

    type PropsWithChildren<P> = P & {children?: any}

    interface FunctionComponent<P = {}> {
        (props: PropsWithChildren<P>, context?: any): any | null
        defaultProps?: Partial<P> | undefined
    }

    type FC<T> = FunctionComponent<T>

    let Button: FC<ButtonInterface> = ({text, style, onClick, children}) => {
        return (
            <div>
                { text }
            </div>
        );
    }
    Button.defaultProps = { 
        text: '保存'
    }
    let myButton = <Button text="保存" />

    //类组件
    //类实例部分通过ElementClass限制类型以符合接口(比如React组件实例必须有render属性)
    class MyComponent {
        render() {
            
        }
    }

    let myComponent = <MyComponent />
    //ReactComponent都有生命周期属性，所有JSX类定义ElementClass需要拓展生命周期属性定义
    
    
    //属性类型检查
    class MyComponent1 {
       props: {
           name: string;
           age: number;
       } 
       render() {

       }
    }

    //当ElementAttributesProperty未指定props属性为属性类型依据时不报错，否则报错
    // let myComponent1 = <MyComponent1 />  //Error
    let myComponent2 = <MyComponent1 name="怪老头" age={28} />

    
    //子孙类型检查
    class MyComponent3 {
        props: {
            children?: string
        }
        render() {

        }
    }

    // let myComponent3 = (
    //     <MyComponent3 >
    //         <span>fdf</span>
    //         <span>fdf</span>
    //     </MyComponent3>
    // )   //Error: "children" 属性需要 "string" 类型的子级，但提供了多个子级

    let myComponent3 = (
        <MyComponent3 >
            <span>fdf</span>
        </MyComponent3>
    )
    
})()