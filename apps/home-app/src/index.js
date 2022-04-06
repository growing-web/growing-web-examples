import nav from '@growing-web-examples/nav'
export default () => ({
  mount({ container }) {
    container.innerHTML = `
      ${nav()}
      <p>Hello World</p>
    `
  },
  unmount({ container }) {
    container.innerHTML = ''
  },
})
