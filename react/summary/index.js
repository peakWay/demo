
// import { createReactButton } from 'my-library';
import React from 'react';
import ReactDOM from 'react-dom';

console.log(React.version, '外部react版本')  
// console.log(createReactButton())

// import TsTypeDemo from "ts-type-demo";
import App from './src/app';
console.log(React.isValidElement(<React.Fragment>323</React.Fragment>), 11212);
ReactDOM.render(<App/>, document.getElementById('app'))