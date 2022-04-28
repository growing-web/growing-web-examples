<template>
  <div class="app">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/page1">Page1</router-link>
      </li>
      <li>
        <router-link to="/page2">Page2</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import { auth } from '@growing-web-examples/shared'

export default {
  name: 'app',
  created() {
    auth.watch('user', (info) => {
      console.log('[cdm-app] 收到user信息:', info)
    })
  },
}
</script>
