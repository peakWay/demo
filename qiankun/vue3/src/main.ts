import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import './public-path'
import routes from './router'
import { createRouter, createWebHistory } from 'vue-router'

// @ts-ignore
const base = process.env.BASE_URL + window.__POWERED_BY_QIANKUN__ ? '/vue3' : ''

let router = null
// @ts-ignore
let instance = null

function render(props = {}) {
    router = createRouter({
        history: createWebHistory(base),
        routes
    })

    instance = createApp(App)
    instance.use(store)
        .use(router)
        .mount('#app')
}

// 独立运行时
// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap() {
    console.log('[vue] vue3 app bootstraped');
}

// 监听通信
function listenerGlobalState(props: any) {
    // @ts-ignore
    props.onGlobalStateChange((value, prev) => console.log(`[${props.name}子项目收到状态变化]: `, value, prev), true);
    props.setGlobalState({
        ignore: props.name,
        user: {
            name: props.name,
        },
    })
}

export async function mount(props: any) {
    console.log('[vue3] props from main framework', props);
    listenerGlobalState(props)
    render(props);
}

export async function unmount() {
    // @ts-ignore
    instance.unmount()
    
}
