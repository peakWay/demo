
import * as React from 'react';
import {render} from 'react-dom';
import { Component } from 'react';
import Fancy2Button from './components/log'

const Number = 2

const FancyButton = React.forwardRef((props, ref) => (

    <div>
        <input ref={ref} />
        <button className="fancyButton"  onClick={props.onClick}>
            { props.children }
        </button>
    </div>
))

function Fancy1Button (props) {
    return (
        <div>
            <input ref={props.inputRef} />
            <button className="fancyButton"  onClick={props.onClick}>
                { props.children }
            </button>
        </div>
    )
}


class App extends Component {
    constructor(props) {
        super(props);

        this.forwardRef = React.createRef();
        this.propsRef = React.createRef();
        this.logPropsRef = React.createRef();
    }

    setPropsFoucs = () => {
        console.log(this.propsRef)
        this.propsRef.current.focus()
    }

    setForwardRef = () => {
        this.forwardRef.current.focus()
    }

    setLogPropsRef = () => {
        this.logPropsRef.current.focus()
    }

    render() {
        return (
            <div>

                <Fancy1Button onClick={() => this.setPropsFoucs()} inputRef={this.propsRef}>
                    propsRef
                </Fancy1Button>

                <FancyButton ref={this.forwardRef} onClick={this.setForwardRef}>
                    forwardRef
                </FancyButton>

                <Fancy2Button name="oldman" ref={this.logPropsRef} onClick={this.setLogPropsRef}>
                    logProps
                </Fancy2Button>

                <div ref={el => console.log(el, '什么')}></div>
                
            </div>
        )
    }
}

render(<App/>, window.document.getElementById('app'))
