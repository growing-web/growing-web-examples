export default () => ({
  mount({ container }) {
    container.innerHTML = '404'
  },
  unmount({ container }) {
    container.innerHTML = ''
  },
})
