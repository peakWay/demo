interface Action<T> {
    payload?: T;
    type: string;
}

class EffectModule {
count = 1;
message = "hello!";

delay(input: Promise<number>) {
    return input.then(i => ({
    payload: `hello ${i}!`,
    type: 'delay'
    }));
}

setMessage(action: Action<Date>) {
    return {
    payload: action.payload!.getMilliseconds(),
    type: "set-message"
    };
}
}

type PickMethods<T> = {
    [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]
type EffectModuleMethods = PickMethods<EffectModule>

type asyncMethod<T, U> = (input: Promise<T>) => Promise<Action<U>>;
type newAsyncMethod<T, U> = (input: T) => Action<U>;
type syncMethod<T, U> = (action: Action<T>) => Action<U>;
type newSyncMethod<T, U> = (action: T) => Action<U>;

type MethodsTransformation<T> = T extends asyncMethod<infer A, infer B>
? newAsyncMethod<A, B>
: T extends syncMethod<infer A ,infer B>
? newSyncMethod<A, B>
: never


// 修改 Connect 的类型，让 connected 的类型变成预期的类型
type Connect = (module: EffectModule) => {
    [key in EffectModuleMethods]: MethodsTransformation<EffectModule[key]>
}


const connect: Connect = m => ({
delay: (input: number) => ({
    type: 'delay',
    payload: `hello 2`
}),
setMessage: (input: Date) => ({
    type: "set-message",
    payload: input.getMilliseconds()
})
});

type Connected = {
delay(input: number): Action<string>;
setMessage(action: Date): Action<number>;
};

export const connected: Connected = connect(new EffectModule());
  