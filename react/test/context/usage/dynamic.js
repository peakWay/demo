
import * as React from 'react';
import { Component } from 'react';
import {ThemeContext, themes} from '../context';

//按钮
class ThemeButton extends Component {
    render () {
        let theme = this.context

        console.log(theme)
        return (
            <button
                {...this.props}
                style={{backgroundColor: theme.background, color: 'orange'}}
            >
            </button>
        )
    }
}

ThemeButton.contextType = ThemeContext


//包装中间层
function ThemeChange (props) {
    return (
        <ThemeButton onClick={props.onClick}>
            Change Theme
        </ThemeButton>
    )
}

export default class App extends Component {

    constructor (props) {
        super(props);
        console.log(themes, 'themes')
        this.state = {
            theme: themes.dart
        }
    }
    
    changeTheme = () => {
        this.setState({
            theme: this.state.theme == themes.dart ? themes.light : themes.dart
        })
    }
    
    render () {
        return (
            <div>
                <ThemeContext.Provider value={this.state.theme}>
                    <ThemeChange onClick={this.changeTheme}></ThemeChange>
                </ThemeContext.Provider>
                <ThemeButton>无Context</ThemeButton>
            </div>
        )
    }
}