
import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import {ThemeContext, themes} from './context';


//动态用法
// import App from './usage/dynamic'

import App from './usage/nesting-update'

render(<App />,window.document.getElementById('app'))