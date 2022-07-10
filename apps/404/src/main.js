import { createLayout } from '@growing-web-examples/basic-layout'
import nav from '@growing-web-examples/widget-nav'

const layout = createLayout()

layout.setSlot('main', () => {
  return {
    mount({ container }) {
      container.innerHTML = '404'
    },
    unmount({ container }) {
      container.innerHTML = ''
    },
  }
})

layout.setSlot('nav', () => nav)

export default layout.getLifeCycle()
