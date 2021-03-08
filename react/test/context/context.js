
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

export const ThemeFuncContext = React.createContext(
    {
        theme: themes.dart,
        changeTheme: () => {}
    }
)