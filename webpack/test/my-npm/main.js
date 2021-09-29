

import React, { Component } from "react";
import { render } from 'react-dom';
import {Hello} from 'public-hello';

console.log(Hello)

// class Hello extends Component {
//     render () {
//         return (
//             <div className="hello">Hello</div>
//         );
//     }
// }

class App extends Component {
    render() {
        return (
            <div>sds<Hello></Hello></div>
        )
    }
}

render(<App />, document.getElementById('root'))