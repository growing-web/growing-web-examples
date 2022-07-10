import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './app.css?style-provider'
import { createLayout } from '@growing-web-examples/basic-layout'
import { vue2Adapter } from '@growing-web-examples/basic-layout/vue2-adapter'
import nav from '@growing-web-examples/widget-nav'

Vue.config.productionTip = false

const layout = createLayout()

layout.setSlot('main', () => vue2Adapter(Vue, App, { vueOptions: { router } }))

layout.setSlot('nav', () => nav)

export default layout.getLifeCycle()
