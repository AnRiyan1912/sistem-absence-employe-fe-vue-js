<script setup lang="ts">
import client from '@/axios/config'
import Toast from '@/components/toast/Toast.vue'
import type { ToastData } from '@/components/toast/Toast.vue'
import { AUTH } from '@/util/ApiUrl'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const password = defineModel('password')
const reEnterPassword = defineModel('reEnterPassword')
const showNotification = ref(false)
const toastData: ToastData = { message: '', backgroundColor: '' }
const router = useRouter()
const onChangePassword = async () => {
  try {
    const getVerificationData = sessionStorage.getItem('verification')
    if (getVerificationData !== null) {
      const verificationData = JSON.parse(getVerificationData)
      const response = await client.post(AUTH + 'update_password', {
        id: verificationData.id,
        email: verificationData.email,
        password: password.value,
        passwordAgain: reEnterPassword.value
      })
      if (response.status == 200) {
        toastData.message = response.data.message
        toastData.backgroundColor = 'green'
        showNotification.value = true
        setTimeout(() => {
          showNotification.value = false
        }, 1800)
        router.push('/login')
        sessionStorage.removeItem('verification')
      }
    }
  } catch (err: any) {
    toastData.message = err.response.data.message
    toastData.backgroundColor = 'red'
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 1800)
  }
}
</script>
<template>
  <Toast
    :message="toastData.message"
    :background-color="toastData.backgroundColor"
    v-if="showNotification"
  />
  <div class="flex justify-center container-header"><h4>Change password</h4></div>
  <div>
    <div></div>
    <div class="flex justify-center">
      <form action="" @submit.prevent="onChangePassword" class="container-form">
        <div class="container-input">
          <input type="text" placeholder="input password" v-model="password" class="input" />
        </div>
        <div class="container-input">
          <input
            type="text"
            placeholder="input password again"
            v-model="reEnterPassword"
            class="input"
          />
        </div>
        <div class="flex justify-center"><button type="submit" class="button">Submit</button></div>
      </form>
    </div>
  </div>
  <div class="container-footer"></div>
</template>
<style>
@media screen and (max-width: 430px) {
  .container-header {
    background: rgb(59, 144, 100);
    background: linear-gradient(0deg, rgba(59, 144, 100, 1) 10%, rgba(50, 222, 132, 1) 100%);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    color: white;
    height: 60px;
    z-index: -1;
  }
  .container-footer {
    background: rgb(59, 144, 100);
    background: linear-gradient(0deg, rgba(59, 144, 100, 1) 10%, rgba(50, 222, 132, 1) 100%);
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    color: white;
    height: 40px;
  }
  .container-form {
    margin-top: 70px;
    background-color: #ffffff;
    height: 400px;
    width: 370px;
  }
  .container-input {
    border: solid 1px black;
    border-radius: 10px;
    transition: box-shadow 0.3s ease;
    margin-top: 10px;
  }
  .input {
    width: 300px;
    height: 40px;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
    border: none;
    outline: none;
  }
  .container-input:focus-within {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  }
  .button {
    padding: 10px;
    background-color: #3b9064;
    color: #ffffff;
    width: 200px;
    border-radius: 10px;
    font-weight: 700;
    margin-top: 20px;
  }
  .mt-30 {
    margin-top: 30px;
  }
}
</style>
