import Vue from 'vue'
import App from './app.vue'
import { createLayout } from '@growing-web-examples/login-layout'
import { vue2Adapter } from '@growing-web-examples/login-layout/vue2-adapter'
import nav from '@growing-web-examples/nav-widget'

const layout = createLayout()

layout.setSlot('main', () => vue2Adapter(Vue, App))

layout.setSlot('nav', () => nav)

window.addEventListener('userInfo', (e) => {
  console.log('[login-app]: 收到login-layout信息:', e.detail)
})

export default layout.getLifeCycle()
