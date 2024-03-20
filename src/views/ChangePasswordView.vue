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
        router.push("/login")
        sessionStorage.removeItem("verification")
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
  <div>
    <div>
      <form action="" @submit.prevent="onChangePassword">
        <input type="text" placeholder="input password" v-model="password" />
        <input type="text" placeholder="re enter the password" v-model="reEnterPassword" />
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
<style></style>
