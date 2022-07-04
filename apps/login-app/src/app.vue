<template>
  <div>
    <center><h1>Login Form</h1></center>
    <form>
      <div class="container">
        <label>Username : </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          required
        />
        <label>Password : </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>
<script>
import { auth } from '@growing-web-examples/shared'
export default {
  created() {
    auth.watch('user', (info) => {
      console.log('[login-app] 收到user信息:', info)
    })
  },
}
</script>

<style style-provider>
button {
  background-color: #4caf50;
  width: 100%;
  color: orange;
  padding: 15px;
  margin: 10px 0px;
  border: none;
  cursor: pointer;
}
input[type='text'],
input[type='password'] {
  width: 100%;
  margin: 8px 0;
  padding: 12px 20px;
  display: inline-block;
  border: 2px solid green;
  box-sizing: border-box;
}
button:hover {
  opacity: 0.7;
}

.container {
  padding: 25px;
}
</style>
