/**
 * 主要介绍redux的基本用法和简单实现
 * 1.redux设计思想
 * (1)web是状态的表现，视图与状态是一一对应的
 * (2)所有的状态都保存在一个对象里
 * 2.redux的基本概念和API
 * (1)redux是个纯函数
 * (2)Store
 * <1>Store是个保存数据的容器
 * <2>createStore(Reducer, [initState])：创建
 * (3)State
 * <1>State对象就是唯一的那个对象，也是某个时点的集合
 * <2>Store.getState()：获取当前时点的状态集State
 * (4)Action和Action Creator
 * <1>View正常是无法接触到State，action就是View与State之间的桥梁，action是View发出的通知，告知State需要变化了
 * <2>基础格式: {type: 'ADD', payload: 'value'}
 * <3>由于一个项目可能会发出很多中类型一致的action，可以通过Action Creator来创建Action。例：const AddText = (value) {return {type: 'ADD', payload: value}}
 * (5)Store.dispatch()
 * <1>dispatch是View发送Action的唯一方式
 * <2>例: store.dispatch(AddText('Redux'))
 * (6)Reducer
 * <1>Store接收到通知后必须返回一个新的State对象来更新View，这个计算过程就叫Reducer
 * <2>Reducer是个函数，接收两个参数，一个是当前时点State，一个是Action，例：    const reducer = (state, action) => { 
            switch(action.type) {
                case 'ADD':
                    return {...state, value: action.payload}
                default:
                    return state
            }
        }
 * <3>为什么叫Reducer呢，其实当actions是个action组成列表时，类似actions.reduce(reducer, initValue)
 *(7)Store.substribe(fn)
 *<1>当返回新的State时，Store需要通知每个订阅者更新View。订阅者这时候就可以通过substribe订阅该Store，传入函数作为参数，如果想收到订阅时更新dom，就将更新View的方法写入函数中(在React中为render或setState)
 *<2>Store.substribe(fn)函数返回一个函数，调用该函数可以取消订阅
 *(8)Reducer拆分
 *<1>由于整个项目就只有一个State，这样State就会非常大，Reducer函数也会非常大，也非常难维护
 *<2>所有当State的属性之间没有联系时，可以将Reducer拆分,例：
 拆分前：
    const reducer: (state, action) => {
        switch(action.type) {
            case 'ChangeName': 
                return {...state, name: action.payload}
            case 'ChangeAge':
                return {...sate, age: action.age}
        }
    }
 拆分后：
    const ChangeName = (name, action) {
        return action.payload
    }
    ...省略部分代码
    const reducer: (state, action) => {
        return {
            name: ChangeName(state.name, action),
            age: ChangeAge(state.age, action)
        }
    }
 拆分后就如模块化，子reducer对应一个模块/组件
 *<3>Redux的combineReducers，这个方法实现了Reducer拆分并简化了状态与方法同名设计，和省略参数赋值
 例：const reducer = combineReducers({
        ChangeName,
        ChangeAge
    }),
 若不同名，如下
    const reducer = combineReducers({
        name: ChangeName,
        age: ChangeAge
    })
 */


//store简单实现
const createStore = (reducer, [initState]) => {
    let state = initState;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const substribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    //初始化默认值
    dispatch({})

    return { getState, dispatch, substribe }
}


//combineReducers简单实现
const combineReducers = reducers => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextReducer, key) => {
                nextReducer[key] = reducers[key](state[key], action)
                return nextReducer
            }, 
            {}
        )
    }
}