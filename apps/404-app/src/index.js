import nav from '@growing-web/nav'

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
