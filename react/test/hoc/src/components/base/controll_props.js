

import React, {Component} from "react";

const controllPropsHoc = WrapperComponent => {
    return class ControllPropsHoc extends Component {
        render() {

            //可以进行增删改操作
            const newProps = {
                age: 24
            }

            console.log(WrapperComponent, 'WrapperComponent')

            return <WrapperComponent {...this.props} {...newProps} />
        }
    }
}
    

export default controllPropsHoc;

