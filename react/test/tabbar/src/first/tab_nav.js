
import React, { Component } from 'react';
import classnames from 'classname'
import PropTypes, { node } from 'prop-types';
import styles from './style.scss';
import CSSModules from 'react-css-modules';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';
import InkBar from './ink_bar';


function getOuterWidth(el) {
    return el.offsetWidth
}

function getOffset(el) {
    console.log(el.getBoundingClientRect())

    let html = el.ownerDocument.documentElement;
    let box = el.getBoundingClientRect()

    console.log(box.left, window.pageXOffset, html.clientLeft, '多少')

    return {
        left: box.left - box.width / 2,
        top: box.top
    }
}
@CSSModules(styles)
export default class TabNav extends Component {

    constructor(props) {
        super(props);

        this.state = {
            innerWidth: 0,
            left: 0
        }
    }

    componentDidMount() {
        const {activeIndex} = this.props;
        const node = ReactDOM.findDOMNode(this);
        const el = node.querySelectorAll('li')[activeIndex];
        
        this.setState({
            innerWidth: getOuterWidth(el),
            left: getOffset(el).left
        })
    }

    componentDidUpdate(nextProps) {
        if (nextProps.activeIndex != this.props.activeIndex) {
            const {activeIndex} = this.props;
            const node = ReactDOM.findDOMNode(this);
            const el = node.querySelectorAll('li')[activeIndex];
            
            getOuterWidth(el);
            getOffset(el);

            this.setState({
                innerWidth: getOuterWidth(el),
                left: getOffset(el).left
            })
        }
    }

    getTabs() {

        console.log(this.props), 'props';
        return this.props.panels.map((child, index) => {
            if (!child) return;

            const { classProfix, onTabClick, activeIndex } = this.props;

            console.log(child.props);
            const {order, disabled, tab} = child.props;
            

            //设置class
            let globalClasses = classnames({
                [`${classProfix}-active`]: activeIndex == order,
                [`${classProfix}-disabled`]: disabled,
            })

            let localClasses = classnames({
                [`${classProfix}-tab`]: true,
            })

            //绑定点击事件
            let events = {}
            if (!disabled) {
                events.onClick = onTabClick.bind(this, order);
            }

            return (
                <li
                    role="tab"
                    aria-disabled={disabled ? 'true' : 'false'}
                    {...events}
                    className={globalClasses}
                    styleName={localClasses}
                    key={index}
                >
                    { tab }
                </li>
            );
        })
    }

    render() {
        const { classProfix } = this.props;
        
        const rootClasses = classnames({
            [`${classProfix}-bar`]: true
        })

        const classes = classnames({
            [`${classProfix}-nav`]: true
        })


        return (
            <div styleName={rootClasses}>
                <Motion style={{ left: spring(this.state.left) }}>
                    {
                        ({left}) => <InkBar width={this.state.innerWidth} left={left} />
                    }
                </Motion>
                
                <ul styleName={classes}>
                    { this.getTabs() }
                </ul>
            </div>
        );
    }
}

TabNav.propTypes = {
    classProfix: PropTypes.string,
    panels: PropTypes.node,
    activeIndex: PropTypes.number,
    onTabClick: PropTypes.func
}