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
      <div class="container-information"><span>Create account for employe</span></div>
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
.container-information {
  background: rgb(59, 144, 100);
  background: linear-gradient(0deg, rgba(59, 144, 100, 1) 10%, rgba(50, 222, 132, 1) 100%);
  width: 100vw;
  height: 30px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: end;
  padding-bottom: 10px;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  color: #ffffff;
}
</style>
