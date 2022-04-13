import React from 'react'
import ReactDOM from 'react-dom'
import './index.css?style-provider'
import App from './App'
import styleProvider from 'virtual:style-provider?query=~/*'
import nav from '@growing-web/nav'

export default () => {
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

      vdom = ReactDOM.render(
        <>
          <div dangerouslySetInnerHTML={{ __html: nav() }}></div>
          <App />
        </>,
        appElement,
      )
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
}
