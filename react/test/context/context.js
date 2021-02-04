
import * as React from 'react';

export const themes = {
    light: {
        background: '#eee'
    },
    dart: {
        background: '#222'
    }
}

export const ThemeContext = React.createContext(
    themes.dart
)