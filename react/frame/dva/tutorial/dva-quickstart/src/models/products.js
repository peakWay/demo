

function asyncFn() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('a1b2c3')
        }, 5000)
    })
}

export default {
    namespace: 'products',
    state: [
        {name: 'qwqw', id: 1},
        {name: 'react', id: 2}
    ],
    reducers: {
        // ['getData'](state) {
        //     console.log('reducer', state)
        //     return state;
        // }
    },
    effects: {
        *getData(action, {select}) {
            console.log(yield select())
            yield asyncFn()
            console.log('继续')
        }
    }
}

