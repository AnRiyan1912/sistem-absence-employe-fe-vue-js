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
const toLoginView = () => {
  router.push({name: "login"})
}
</script>
<template>
  <Toast :message="toast.message" :background-color="toast.backgroundColor" v-if="notification" />
  <div class="flex justify-center container-header"><h4>Get verification code</h4></div>
  <div class="flex justify-center align-center">
    <div class="container-form">
      <div class="flex mt-10 container-input">
        <input
          class="input"
          type="text"
          placeholder="input your email account here"
          v-model="email"
        />
        <div>
          <button type="button" @click.prevent="requestVerificationCode()" class="button-send">
            Send
          </button>
        </div>
      </div>
      <div class="mt-10 container-input">
        <input
          class="input"
          type="text"
          placeholder="input verification code"
          v-model="verificationCode"
        />
      </div>
      <div class="flex justify-center align-center mt-10">
        <button @click.prevent="checkVerificationCode()" class="button">
          Check verification code
        </button>
      </div>
    </div>
  </div>
  <div class="container-footer flex justify-center align-center">
    <h5>Do you remember account?</h5>
    <u @click="toLoginView()"><p>login</p></u>
  </div>
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
  }
  .input {
    width: 320px;
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
  .button-send {
    padding-left: 10px;
    padding-top: 5px;
    padding-right: 10px;
    padding-bottom: 5px;
    background-color: #3b9064;
    color: #ffffff;
    width: 60px;
    height: 100%;
    border-radius: 10px;
    /* font-weight: 700; */
  }
}
</style>
