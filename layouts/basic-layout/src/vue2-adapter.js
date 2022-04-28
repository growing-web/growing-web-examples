import allStyleProvider from 'virtual:style-provider?query=~/*'

export function vue2Adapter(
  Vue,
  App,
  { vueOptions = {}, lifeCycle = {} } = {},
) {
  let appWrap
  let app
  let allStyle
  return {
    async bootstrap(props) {
      allStyle = allStyleProvider(props.container)
    },
    async mount(props) {
      appWrap = document.createElement('div')
      props.container.appendChild(appWrap)
      allStyle.mount()

      app = new Vue({
        ...vueOptions,
        el: appWrap,
        render: (h) => h(App),
      })
    },
    async unmount(props) {
      app.$destroy()
      allStyle.unmount()
      props.container.innerHTML = ''
      appWrap = app = null
    },
  }
}
