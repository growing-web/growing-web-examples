<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from '@growing-web-examples/nav/Nav.vue'
export default {
  name: 'app',
  components: {
    Nav,
  },
}
</script>
