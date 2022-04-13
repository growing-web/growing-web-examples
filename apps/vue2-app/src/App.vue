<template>
  <div class="index">
    <Nav></Nav>
    <Todolist></Todolist>
  </div>
</template>

<script>
import Nav from '@growing-web/nav/Nav.vue'
import Todolist from './Todolist.vue'
export default {
  name: 'app',
  components: {
    Nav,
    Todolist,
  },
}
</script>
