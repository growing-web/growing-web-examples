import { createApp } from 'vue'
import App from './App.vue'
import allStyleProvider from 'virtual:style-provider?query=~/*'

export default (props) => {
  let appWrap
  let app
  let allStyle

  return {
    async bootstrap({ container }) {
      allStyle = allStyleProvider(container)
    },
    async mount(props) {
      appWrap = document.createElement('div')

      props.container.appendChild(appWrap)
      allStyle.mount()

      app = createApp(App, {
        provide: {
          host: props,
        },
      })
      app.mount(appWrap)
    },
    async unmount({ container }) {
      app.unmount()
      allStyle.unmount()
      container.innerHTML = ''
      appWrap = app = null
    },
  }
}
