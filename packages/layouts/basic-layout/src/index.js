import { Layout } from './layout'

export function createLayout() {
  const layout = new Layout()
  layout.setLifecycle({
    async mount({ container }) {
      container.innerHTML = `
      <style>
        nav {
          height: 50px;
          width: 100%;
          border-bottom: 1px solid #000;
        }
        .wrapper {
          display: flex;
          height: calc(100% - 50px);
        }
        .wrapper main {
          flex: 1;
          background: #ddd;
          height: 100%;
        }
      </style>

      <nav slot="nav"></nav>
      <section class="wrapper">
        <main slot="main"></main>
      </section>
        `
    },
    async unmount({ container }) {
      container.innerHTML = ''
    },
  })
  return layout
}
