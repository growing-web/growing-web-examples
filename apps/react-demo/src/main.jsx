import React from 'react'
import ReactDOM from 'react-dom'
import './index.css?style-provider'
import App from './App'
import styleProvider from 'virtual:style-provider?query=~/*'
import { createLayout } from '@growing-web-examples/basic-layout'
import nav from '@growing-web-examples/widget-nav'

const layout = createLayout()

layout.setSlot('main', () => {
  let vdom
  let appElement
  let style
  return {
    async bootstrap({ container }) {
      style = styleProvider(container)
    },
    async mount({ container, data }) {
      appElement = document.createElement('div')
      container.appendChild(appElement)

      vdom = ReactDOM.render(<App />, appElement)
      style.mount()
    },

    async unmount() {
      style.unmount()
      if (vdom.unmount) {
        // React >= 18
        vdom.unmount()
      } else {
        // React < 18
        ReactDOM.unmountComponentAtNode(appElement)
      }
    },
  }
})

layout.setSlot('nav', () => nav)

export default layout.getLifeCycle()