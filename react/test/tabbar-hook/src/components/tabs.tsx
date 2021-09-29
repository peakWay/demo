

import React, { useEffect, useReducer, useState } from "react";
import classnames from 'classnames';
import TabNav from "./tab_nav";
import TabContent from "./tab_content";

interface TabsProps {
    classPrefix?: string,
    defaultActiveIndex?: number,
    activeIndex?: number,
    onChange?: ({activeIndex, prevIndex}: {activeIndex: number, prevIndex: number}) => void
}

const UseTab = (state, action) => {
    switch(action.type) {
        case 'change':
            return {
                ...state,
                ...action.payload
            }
        default: 
            return state;
    }
}

const Tabs: React.FC<TabsProps> = (props) => {

    const initialState = (): {activeIndex: number, prevIndex: number} => {
        let activeIndex;

        if ('activeIndex' in props) {
            activeIndex = props.activeIndex;
        }

        if ('defaultActiveIndex' in props) {
            activeIndex = props.defaultActiveIndex
        }

        return {
            activeIndex,
            prevIndex: activeIndex
        }
    }

    const [state, dispatch] = useReducer(UseTab, initialState());

    useEffect(() => {
        console.log(211244, props.activeIndex)
        if (props.activeIndex != state.activeIndex && 'defaultActiveIndex' in props) {
            dispatch({
                type: 'change', 
                payload: {
                    activeIndex: props.activeIndex, 
                    prevIndex: state.activeIndex
                }
            })

        }
    }, [props.activeIndex])

    // useEffect()

    const { onChange, classPrefix } = props;

    const handleTabClick = (activeIndex: number) => {
        if (activeIndex != state.activeIndex && 'defaultActiveIndex' in props) {

            console.log(activeIndex, state.activeIndex, 'activeIndex')

            const prevIndex = state.activeIndex
            
            dispatch({
                type: 'change',
                payload: {
                    activeIndex,
                    prevIndex: prevIndex
                }
            })

            onChange && onChange({
                activeIndex,
                prevIndex: prevIndex
            });
        }
    }

    const renderNav = (): JSX.Element => {
        return (
            <TabNav 
                classPrefix={ classPrefix || '' }
                activeIndex={ state.activeIndex }
                onTabClick={handleTabClick}
                panels={props.children as JSX.Element[]}
            />
        )
    }

    const renderContent = (): JSX.Element => {
        return (
            <TabContent
                classPrefix={classPrefix || ''}
                activeIndex={state.activeIndex}
                panels={props.children as JSX.Element[]}
            />
        )
    }

    const classes = classnames({
        [`${classPrefix}`]: true
    })

    return (
        <div className={classes}>
            { renderNav() }
            { renderContent() }
        </div>
    );
}

Tabs.defaultProps = {
    onChange: () => {},
    classPrefix: 'tabs'
}

export default Tabs;