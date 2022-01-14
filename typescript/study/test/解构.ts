

/**
 * 主要是解构的一些应用
 * 1. 对象解构
 * 2. 数组、元组解构
 */

namespace TestDeconstruction {

    /* 1.对象解构 */
    let person = {
        name: '费涛',
        age: 25,
        education: {
            university: '湖南商学院'
        }
    }
    
    let { name, age, education: { university }  } : {name: string, age: number, education: { university: string }} = person;

    function getPersonInfo({name = '怪老头', age = 80, education: {university = '湖南商学院'}} : {name: string, age: number, education: { university: string }}): void {

    }

    getPersonInfo(person);


    interface Person {
        name: string, 
        age: number, 
        education: { university: string }
    }

    function getPersonInfo1({name = '怪老头', age = 80, education: {university = '湖南商学院'}} : Person) {

    }

    //person虽然未被定义成Person类型，但拥有Person的所有属性类型，会被类型兼容
    getPersonInfo1(person);
    


    /* 2.数组、元组解构 */
    let arr: number[] = [1,2, 3, 4];
    let [one, two] = arr;


    let tuple: [string, number, boolean] = ['rect', 4, true];
    const [shape, sides] = tuple;


    //hook常用 
    let [visible, setVisible] = useState(true);

    type SetState<T> = (arg: T) => void;

    function useState<T>(initialValue: T): [T, SetState<T>] {
        let value = initialValue;
        return [value, (arg: T) => {}];
    }
}