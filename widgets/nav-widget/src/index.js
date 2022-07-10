export default function () {
  return {
    async mount({ container }) {
      container.innerHTML = `
      <a is="web-link" href="/">Home</a> |
      <a is="web-link" href="/vue-router-demo">Vue Router Demo</a> |
      <a is="web-link" href="/react">React Demo</a> |
      <a is="web-link" href="/404">404</a> |
      <a is="web-link" href="https://google.com">Google</a>
      `
    },

    async unmount({ container }) {
      container.innerHTML = ''
    },
  }
}
