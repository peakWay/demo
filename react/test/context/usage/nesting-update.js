
import * as React from 'react';
import { Component } from 'react';
import {ThemeFuncContext, themes} from '../context';

// class ThemeButton extends Component {
    
// }

function ThemeButton () {
    return (
        <ThemeFuncContext.Consumer>
            {
                ({theme, changeTheme}) => (
                    <button onClick={changeTheme} style={{ background: theme.background, color: 'orange' }}>
                        Change Theme
                    </button>
                )
            }
        </ThemeFuncContext.Consumer>
    )
}

export default class App extends Component {
    constructor (props) {
        super(props)

        this.state = {
            theme: themes.dart,
            changeTheme: this.handleChangeTheme
        }
    }

    handleChangeTheme =  () => {
        this.setState({
            theme: this.state.theme == themes.dart ? themes.light : themes.dart
        })
    }
    
    render () {
        return (
            <ThemeFuncContext.Provider value={this.state}>
                <ThemeButton></ThemeButton>
            </ThemeFuncContext.Provider>
        )
    }
}