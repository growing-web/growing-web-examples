import Vue from 'vue'
import App from './app.vue'
import router from './router'
import { createLayout } from '@growing-web-examples/basic-layout'
import { vue2Adapter } from '@growing-web-examples/basic-layout/vue2-adapter'
import nav from '@growing-web-examples/nav-widget'

const layout = createLayout()

layout.setSlot('main', () => vue2Adapter(Vue, App, { vueOptions: { router } }))

layout.setSlot('nav', () => nav)

export default layout.getLifeCycle()
