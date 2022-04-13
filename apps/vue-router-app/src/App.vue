<template>
  <div id="app">
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from '@growing-web/nav/Nav.vue'
export default {
  name: 'app',
  components: {
    Nav,
  },
}
</script>
