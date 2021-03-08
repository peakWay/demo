import * as React from 'react';
import { Component, Suspense } from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FirstComponent from './components/first'

console.log(FirstComponent)

import(/* webpackChunkName: "math" */'./components/math').then(math => {
    console.log(math.add(15, 19))
    return math.add(15, 19)
})

// let Second = import(/* webpackChunkName: "second" */'./components/second').then(e => {
//     console.log(e.default, 'e.default')
//     return e.default
// })
// console.log(Second)

/* TODO: 疑问, lazy方法实现了什么 */
let SecondComponent = React.lazy(() => import(/* webpackChunkName: "second" */'./components/second'))

console.log(SecondComponent, 'SecondComponent')

let AlwaysComponent = (props) => {
    console.log(props, 'match')
    return (
        <div>我一直都在</div>
    )
}


class App extends Component{
    render () {
        // return (
        //     <div>
        //         <FirstComponent />
        //         <Suspense fallback={<div>Loading...</div>}>
        //             <SecondComponent />
        //         </Suspense>
        //     </div>
        // )

        return (
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path="/" component={props => <FirstComponent link></FirstComponent>}></Route>
                        <Route path="/about" component={SecondComponent}></Route>

                        <Route component={AlwaysComponent}></Route>

                    </Switch>

                </Suspense>

            </Router>
        )
    }
}

render(<App />, window.document.getElementById('app'))