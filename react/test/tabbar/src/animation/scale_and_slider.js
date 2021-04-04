
import React, { Component } from "react";
import Animate from 'react-smooth'
import styles from './style.scss';
import CSSModules from "react-css-modules";


@CSSModules(styles)
export default class ScaleAndSliderAnimation extends Component {

    render() {

        const steps = [{
            style: {
                transform: 'translateX(-100%) scale(0)'
            },
            duration: 500
        }, {
            style: {
                transform: 'translateX(0) scale(1)'
            },
            duration: 2000
        }]

        return (
            <Animate steps={steps} >
                <img src="https://oss.pocketuniversity.cn/media/2019-09-19/5d82dea62ca69.JPG" />
            </Animate>
        );
    }
}