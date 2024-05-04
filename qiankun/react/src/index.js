import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './public-path';
import './index.css';


let root
function render(props = {}) {
    const { container } = props
    root = ReactDOM.createRoot(container ? container.querySelector('#root') : document.querySelector('#root'))
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

if (!window.__POWERED_BY_QIANKUN__) {
    render()
}

export async function bootstrap() {
    console.log('[react16] react app bootstraped');
}

// 监听通信
function listenerGlobalState(props) {
    props.onGlobalStateChange((value, prev) => console.log(`[${props.name}子项目收到状态变化]: `, value, prev), true);
    props.setGlobalState({
        ignore: props.name,
        user: {
            name: props.name,
        },
    })
}

export async function mount(props) {
    console.log('[react16] props from main framework', props);
    listenerGlobalState(props)
    render(props);
}

export async function unmount(props) {
    root.unmount()
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

