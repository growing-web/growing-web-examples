import Vue from 'vue'
import App from './app.vue'
import { createLayout } from '@growing-web-examples/basic-layout'
import { vue2Adapter } from '@growing-web-examples/basic-layout/vue2-adapter'
import nav from '@growing-web-examples/widget-nav'

const layout = createLayout()

layout.setSlot('main', () => vue2Adapter(Vue, App))

layout.setSlot('nav', () => nav)

export default layout.getLifeCycle()
