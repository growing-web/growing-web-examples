import { auth } from '@growing-web-examples/shared'

export default function () {
  return {
    async mount({ container }) {
      window.addEventListener('userInfo', (e) => {
        console.log('[nav-widget]: 收到login-layout信息:', e.detail)
        auth.emit('user', e.detail)
      })

      container.innerHTML = `
      <nav>
        <a is="web-link" href="/">Login</a> |
        <a is="web-link" href="/cdm-app">cdm</a>
      </nav>`
    },

    async unmount({ container }) {
      container.innerHTML = ''
    },
  }
}
