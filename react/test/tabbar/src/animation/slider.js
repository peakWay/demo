

import React, { Component } from "react";
import Animate from 'react-smooth'
import styles from './style.scss';
import CSSModules from "react-css-modules";


@CSSModules(styles)
export default class SlideAnimation extends Component {

    render() {
        return (
            <Animate from="translateX(-100%)" to="translateX(0)" attributeName="transform" >
                <img src="https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG" />
            </Animate>
        );
    }
}