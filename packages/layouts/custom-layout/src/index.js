import { Layout } from './layout'

export function createLayout() {
  const layout = new Layout()

  const event = new CustomEvent('userInfo', {
    detail: {
      userId: '1',
      username: 'growing web',
    },
  })

  setTimeout(() => {
    window.dispatchEvent(event)
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
