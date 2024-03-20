<script setup lang="ts">
import client from '@/axios/config'
import { AUTH } from '@/util/ApiUrl'
import { ref } from 'vue'
import Toast, { type ToastData } from '../components/toast/Toast.vue'
import { useRouter } from 'vue-router'

interface VerifyResponse {
  id: number
  email: string
  verificationCode: number
  createdAt: Date
}

const email = defineModel('email')
const verificationCode = defineModel('verificationCode')
const notification = ref(false)
const toast: ToastData = { message: '', backgroundColor: '' }
const router = useRouter()
const requestVerificationCode = async () => {
  try {
    const response = await client.post(AUTH + 'forgot_password', { email: email.value })
    if (response.status == 200) {
      toast.message = 'Successfully request verification'
      toast.backgroundColor = 'green'
      sessionStorage.setItem('verification', JSON.stringify(response.data.data))
      notification.value = true
      setTimeout(() => {
        notification.value = false
      }, 1800)
    }
  } catch (err: any) {
    toast.message = err.response.data.message
    toast.backgroundColor = 'red'
    notification.value = true
    setTimeout(() => {
      notification.value = false
    }, 1800)
  }
}
const checkVerificationCode = async () => {
  try {
    const getVerificationData = await sessionStorage.getItem('verification')
    if (getVerificationData !== null) {
      const verificationDataParse = JSON.parse(getVerificationData)
      const response = await client.post(AUTH + 'verify_code', {
        id: verificationDataParse.id,
        email: verificationDataParse.email,
        verificationCode: verificationCode.value,
        createdAt: verificationDataParse.createdAt
      })
      if (response.status == 200) {
        toast.message = response.data.message
        toast.backgroundColor = 'green'
        notification.value = true
        setTimeout(() => {
          notification.value = false
        }, 1800)
        router.push({ name: 'change_password' })
      }
    }
  } catch (err: any) {
    toast.message = err.response.data.message
    toast.backgroundColor = 'red'
    notification.value = true
    setTimeout(() => {
      notification.value = false
    }, 1800)
  }
}
</script>
<template>
  <Toast :message="toast.message" :background-color="toast.backgroundColor" v-if="notification" />
  <div class="flex justify-center align-center">
    <div>
      <div class="flex justify-center"><h4>Get verification code</h4></div>
      <div class="flex">
        <input type="text" placeholder="input your email account here" v-model="email" />
        <div><button type="button" @click.prevent="requestVerificationCode()">Send</button></div>
      </div>
      <div>
        <input type="text" placeholder="input verification code" v-model="verificationCode" />
      </div>
      <div class="flex justify-center align-center">
        <button @click.prevent="checkVerificationCode()">Check verification code</button>
      </div>
    </div>
  </div>
</template>
<style></style>
