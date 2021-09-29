

import React, { Component } from "react";


const referenceRef = WrapperComponent => {
    class ReferenceRef extends Component {
        constructor(props) {
            super(props);
            this.textRef = React.createRef();
            console.log(this.textRef, 'textRef')
        }

        componentDidMount() {
            this.textRef.current.focus()
        }
        
        render() {
            // const {forwardRef, ...rest} = this.props

            return <WrapperComponent {...this.props} forwardRef={this.textRef} />
        }
    }

    return ReferenceRef

    // return React.forwardRef(())
}

export default referenceRef