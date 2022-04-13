import nav from '@growing-web-example/nav'
export default () => ({
  mount({ container }) {
    container.innerHTML = `
      ${nav()}
      <p>Hello World </p>
    `
  },
  unmount({ container }) {
    container.innerHTML = ''
  },
})
