
/**
 * 如何定义一个泛型类的静态属性和构造函数?
 * 还没解决
 */

class Father<P> {
    constructor (props: P) {}
}

interface StateProps {
    name: string,
    age: number
}

type Belong = Pick<StateProps, 'name'>

let a = new Father<StateProps>({name: 'oldman', age: 25});

interface FatherClass<P = {}> {
    new (): any;
    defaultProps?: Partial<P> | undefined
}

function createFather<P extends {}>(type: FatherClass<P>): Father<P> {
    return new type();
}



class Child extends Father<StateProps> {
    
}

interface ClockConstructor<P> {
    new (): ClockInstance<P>;
}

interface ClockInstance<P> {
    data?: P
}

class AClock {
    constructor() {}

    data;
}

function createClock<P>(ctor: ClockConstructor<P>): ClockInstance<P> {
    return new ctor();
}

let b = createClock<StateProps>(AClock)
b.data?.name




// createFather<StateProps>(Child)