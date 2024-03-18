<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { AUTH } from '@/util/ApiUrl'
import client from '@/axios/config'
import { useRouter } from 'vue-router'

const router = useRouter()
const showPassword = ref(false)
const username = defineModel('username')
const password = defineModel('passsword')

const handleShowPassword = (event: MouseEvent) => {
  event.preventDefault()
  if (showPassword.value == false) {
    showPassword.value = true
  } else {
    showPassword.value = false
  }
}
const onLogin = async () => {
  const response = await client.post(AUTH + 'login', {
    usernameOrEmail: username.value,
    password: password.value
  })
  if (response.data.accessToken) {
    await sessionStorage.setItem('auth', response.data.accessToken)
    router.push({ name: 'home' })
    alert('Success login')
  } else if (response.data.status != 200) {
    alert('Failed login wrong username or password')
  }
}
const gotToForgotPasswordView = () => {
  router.push('/forgot_password')
}
onMounted(() => {
  const authToken = sessionStorage.getItem('auth')
  if (authToken) {
    router.push('/')
  }
})
</script>
<template>
  <div class="flex container-main">
    <div class="flex">
      <div class="container-information flex">
        <img
          src="../assets/Employee-Engagement-Plan-Header.png"
          alt="iamge-employe"
          class="image"
        />
        <div class="flex"><p class="text-white">Welcome back happy good work</p></div>
      </div>
    </div>

    <div class="flex padding-l-r-10">
      <form action="" class="container-form" @submit.prevent="onLogin">
        <div class="flex"><h4>SignIn</h4></div>
        <span class="padding-l-r-10">Username or Email</span>
        <div class="flex padding-l-r-10 margin-bottom-30">
          <div class="container-input">
            <input type="text" class="input" placeholder="Input your password" v-model="username" />
          </div>
        </div>
        <span class="padding-l-r-10">Password</span>
        <div class="padding-l-r-10 margin-bottom-30">
          <div class="flex container-input" v-show="showPassword == false">
            <input
              type="password"
              class="input"
              placeholder="input your password"
              v-model="password"
            />
            <div class="padding-l-r-5" @click="handleShowPassword($event)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M19.604 2.562l-3.346 3.137c-1.27-.428-2.686-.699-4.243-.699-7.569 0-12.015 6.551-12.015 6.551s1.928 2.951 5.146 5.138l-2.911 2.909 1.414 1.414 17.37-17.035-1.415-1.415zm-6.016 5.779c-3.288-1.453-6.681 1.908-5.265 5.206l-1.726 1.707c-1.814-1.16-3.225-2.65-4.06-3.66 1.493-1.648 4.817-4.594 9.478-4.594.927 0 1.796.119 2.61.315l-1.037 1.026zm-2.883 7.431l5.09-4.993c1.017 3.111-2.003 6.067-5.09 4.993zm13.295-4.221s-4.252 7.449-11.985 7.449c-1.379 0-2.662-.291-3.851-.737l1.614-1.583c.715.193 1.458.32 2.237.32 4.791 0 8.104-3.527 9.504-5.364-.729-.822-1.956-1.99-3.587-2.952l1.489-1.46c2.982 1.9 4.579 4.327 4.579 4.327z"
                />
              </svg>
            </div>
          </div>
          <div class="flex container-input" v-show="showPassword == true">
            <input type="text" class="input" placeholder="input your password" v-model="password" />
            <div class="padding-l-r-5" @click="handleShowPassword($event)">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M15 12c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-.199.02-.393.057-.581 1.474.541 2.927-.882 2.405-2.371.174-.03.354-.048.538-.048 1.657 0 3 1.344 3 3zm-2.985-7c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 12c-2.761 0-5-2.238-5-5 0-2.761 2.239-5 5-5 2.762 0 5 2.239 5 5 0 2.762-2.238 5-5 5z"
                />
              </svg>
            </div>
          </div>
          <div class="flex justify-between">
            <div></div>
            <div><u @click="gotToForgotPasswordView()">Forgot password</u></div>
          </div>
        </div>

        <div class="flex">
          <button class="button" type="submit"><p>Login</p></button>
        </div>
      </form>
    </div>
  </div>
</template>
<style scoped>
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.container-information {
  background: rgb(59, 144, 100);
  background: linear-gradient(0deg, rgba(59, 144, 100, 1) 10%, rgba(50, 222, 132, 1) 100%);
}
.text-white {
  color: #ffffff;
}
.image {
  width: 100vw;
}

@media screen and (max-width: 430px) {
  .container-main {
    display: block;
  }
  .container-information {
    width: 100vw;
    height: 300px;
    display: block;
    position: absolute;
    top: 0;
    border-bottom-left-radius: 60px;
    border-bottom-right-radius: 60px;
  }
  .container-form {
    margin-top: 280px;
    background-color: #ffffff;
    height: 400px;
    width: 100vw;
  }
  .container-form h4 {
    font-size: 26px;
  }
  .padding-l-r-10 {
    padding-left: 10px;
    padding-right: 10px;
  }
  .padding-l-r-5 {
    padding-left: 5px;
    padding-right: 5px;
  }
  .margin-bottom-30 {
    margin-bottom: 30px;
  }
  .container-input {
    border: solid 1px black;
    border-radius: 10px;
    transition: box-shadow 0.3s ease;
  }
  .input {
    width: 350px;
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
  .justify-between {
    justify-content: space-between;
    align-items: center;
  }
  .button {
    padding-left: 10px;
    padding-top: 5px;
    padding-right: 10px;
    padding-bottom: 5px;
    background-color: #3b9064;
    color: #ffffff;
    width: 200px;
    border-radius: 10px;
    font-weight: 700;
  }
}
</style>
