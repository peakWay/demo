
/**
 * 写在JSX元素上的属性和回调更新都会是PureComponent无效
 */

import React, { Component } from "react";
import Pure from "./class/pure";
import SetTimeout from "./hook/setTimeout";
import UseEffect from "./hook/useEffect";
import UseMemo from "./Hook/useMemo";
import HookTest from "./Hook/useReducer";
import RequestExample from "./hook/useRequest";
import UsePropsValueTest from "./hook/usePropsValue";
import HookPageData from './hook/pageData'
import ClassPageData from './class/pageData'


class App extends Component { 
    state = {
        visible: true
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({
        //         visible: false
        //     })
        // }, 2000)
        document.title = 'react 测试'
    }

    render() {
        return (
            <div>
                {/* <div>
                    <h2>渲染优化</h2>
                    <h3>Class</h3>
                    <Pure></Pure>

                    <h3>Hook</h3>
                    <UseMemo></UseMemo>
                </div> */}

                <div>
                    <h2>编程方式</h2>
                    <h3>Class</h3>
                    <ClassPageData />
                    <h3>Hook</h3>
                    <HookPageData />
                </div>

                {/* <HookTest/> */}

                {/* <SetTimeout /> */}

                {/* <RequestExample /> */}

                {/* { this.state.visible ? <UseEffect /> : null } */}

                {/* <UsePropsValueTest /> */}

            </div>
            
        )
    }
}


export default App;