import nav from '@growing-web-example/nav'

export default () => ({
  mount({ container }) {
    container.innerHTML = `
    ${nav()}
    </br>
    404 page
    `
  },
  unmount({ container }) {
    container.innerHTML = ''
  },
})
