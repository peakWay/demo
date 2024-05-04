import { createApp } from 'vue/dist/vue.esm-bundler.js'

function vueRender(loading) {
    return createApp({
        template: `
            <div>
                <h4 v-if="loading" class="subapp-loading">Loading...</h4>
                <div id="subapp-viewport"></div>
            </div>
        `,
        data() {
            return {
                loading
            }
        }
    }).mount('#subapp-container')
}

let app = null
export default function render(loading) {
    if (!app) {
        app = vueRender(loading)
    } else {
        app.loading = loading
    }
}