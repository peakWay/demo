

import React, {Component} from "react";
import { render } from "react-dom";

// const App = () => {
//     return (
//         <div>Hellow world!</div>
//     )
// }

class App extends Component {
    render() {
        return (<div>Hellow world!</div>)
    }
}


render(<App />, document.getElementById('root'))