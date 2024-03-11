<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const authToken = sessionStorage.getItem('auth')
if (authToken) {
  router.push({ name: 'home' })
}
</script>
<template>
  <div class="container-main">
    <div>
      <div><span>Create account for employe</span></div>
      <form action="">
        <span>First name</span>
        <div>
          <input type="text" />
        </div>
        <span>Last name</span>
        <div>
          <input type="" />
        </div>
        <span>Age</span>
        <div>
          <input type="" />
        </div>
        <span>Address</span>
        <div>
          <input type="" />
        </div>
        <span>Username</span>
        <div>
          <input type="" />
        </div>
        <span>Email</span>
        <div>
          <input type="" />
        </div>
        <span>Password</span>
        <div>
          <input type="" />
        </div>
        <label for="role">Choose role</label>
        <select>
          <option value="ADMIN">Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="ADMIN">Admin</option>
          <option value="ADMIN">Admin</option>
        </select>
      </form>
    </div>
  </div>
</template>
<style>
.container-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
