<template>
  <div class="index">
    <Todolist></Todolist>
  </div>
</template>

<script>
import Todolist from './Todolist.vue'
export default {
  name: 'app',
  components: {
    Todolist,
  },
}
</script>
