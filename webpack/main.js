
import Vue from 'vue'
import App from '@/app.vue'


import { show } from '@/show'

import './style.css'

import './other.scss'

show('Entry1')

new Vue({
    el: '#vue_app',
    render: h => h(App)
})