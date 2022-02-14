
/**
 *
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
    new (): ClockInstance<P>;   //构造函数
    defaultProps: any;          //静态文件
}

interface ClockInstance<P> {
    data?: P
}

class AClock {
    constructor() {}

    static defaultProps = 1;

    data;
}

// AClock.defaultProps = 1;

function createClock<P>(ctor: ClockConstructor<P>): ClockInstance<P> {
    return new ctor();
}

let b = createClock<StateProps>(AClock)
b.data?.name
AClock.defaultProps

// createFather<StateProps>(Child)