

import Temp from "@/temp";
import React, {Component} from "react";
import { render } from "react-dom";
class App extends Component {
    render() {
        return (<div><Temp /></div>)
    }
}


render(<App />, document.getElementById('root'))