import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import routes from './router'
import store from './store'
import './public-path';

Vue.config.productionTip = false


const base = process.env.BASE_URL + window.__POWERED_BY_QIANKUN__ ? '/vue2' : ''

let instance = null
let router = null

function render(props = {}) {
    const { container } = props

    router = new VueRouter({
        mode: 'history',
        base,
        routes
    })

    instance = new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('[vue] vue app bootstraped');
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
    console.log('[vue] props from main framework', props);
    listenerGlobalState(props)
    render(props);
}

export async function unmount() {
    instance.$destroy();
    instance.$el.innerHTML = '';
    instance = null;
    router = null;
}




