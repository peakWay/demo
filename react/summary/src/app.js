
/**
 * 写在JSX元素上的属性和回调更新都会是PureComponent无效
 */

import React, { Component } from "react";
import Pure from "./class/pure";
import SetTimeout from "./hook/setTimeout";
import UseMemo from "./Hook/useMemo";
import HookTest from "./Hook/useReducer";
import RequestExample from "./hook/useRequest";


class App extends Component { 

    render() {
        return (
            <div>
                {/* <div>
                    <h2>class</h2>
                    <Pure></Pure>

                    <h2>hook</h2>
                    <UseMemo></UseMemo>
                </div> */}

                {/* <HookTest/> */}

                {/* <SetTimeout /> */}

                <RequestExample />
            </div>
            
        )
    }
}

App.propTypes = {

}


export default App;