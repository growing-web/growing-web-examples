import { Layout } from '@growing-web/layout'

export function createLayout() {
  const layout = new Layout()
  const event = layout.createCustomEvent('userInfo', {
    userId: '1',
    username: 'growing web',
  })

  setTimeout(() => {
    layout.dispatchEvent(event)
  }, 3000)

  layout.setLifecycle({
    async mount({ container }) {
      container.innerHTML = `
      <style>
        nav {
          height: 50px;
          width: 100%;
          border-bottom: 1px solid #000;
        }
        main {
          flex: 1;
          background: #ddd;
          height: 100%;
        }
      </style>

      <nav slot="nav"></nav>
      <main slot="main"></main>
      `
    },
    async unmount({ container }) {
      container.innerHTML = ''
    },
  })

  return layout
}
