export default () => ({
  mount({ container }) {
    container.innerHTML = `
    <nav>
      <a is="web-link" href="/">Home</a> |
      <a is="web-link" href="/vue2">Vue2</a> |
      <a is="web-link" href="/vue-router">Vue Router</a> |
      <a is="web-link" href="/react">React</a> |
      <a is="web-link" href="/404">404</a> |
      <a is="web-link" href="https://google.com">Google</a>
    </nav>
    <div>404</div>
    `
  },
  unmount({ container }) {
    container.innerHTML = ''
  },
})
