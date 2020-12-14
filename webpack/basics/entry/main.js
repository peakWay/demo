

import { show } from '@/show'

import '@/style.css'

import '@/other.scss'

import img from '@/photo.JPG'
import { funcA } from '../utils'
window.document.getElementById('photo').innerHTML = `<img src="${img}" style="width: 100px;height: 100px;" />`

funcA();

show('Entry1');
