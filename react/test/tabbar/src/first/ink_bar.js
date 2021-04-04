

import React, { Component } from "react";
import CSSModules from "react-css-modules";
import styles from './style.scss';


@CSSModules(styles)
class InkBar extends Component {
    render() {
        const classes = 'inkBar';
        const { left, width } = this.props;

        return (
            <div styleName={classes} style={{ left: left, width: width }}></div>
        )
    }
}


export default InkBar;