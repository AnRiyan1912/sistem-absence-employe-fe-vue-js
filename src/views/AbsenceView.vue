<script setup lang="ts">
import client from '@/axios/config'
import TheCalender from '@/components/TheCalender.vue'
import TheSelected from '@/components/TheSelected.vue'
import Toast from '@/components/toast/Toast.vue'
import { jwtDecode } from 'jwt-decode'
import { ref } from 'vue'

interface Absence {
  date: String
  entryTime: String
  exitTime: String
  information: String
}
const getTokenFromSession = sessionStorage.getItem('auth')
const tokenData = jwtDecode(String(getTokenFromSession))
let numberPerson: any
if ('userId' in tokenData) {
  numberPerson = tokenData.userId
}

const dataAbsence = ref<Absence>({ date: '', entryTime: '', exitTime: '', information: '' })
const toastValue = ref({ backgroundColor: '', message: '', status: false })
const selectedOption = ['PRESENT', 'SICK', 'PERMISSION', 'ANNUAL_LEAVE']

const handleSelectValue = (selectValue: String) => {
  dataAbsence.value.information = selectValue
  console.log(dataAbsence.value)
}
const handleDateSelect = (value: String) => {
  dataAbsence.value.date = value
}
const handleEntryTimeSelect = (value: String) => {
  dataAbsence.value.entryTime = value
}
const handleExitTimeSelect = (value: String) => {
  dataAbsence.value.exitTime = value
}

const handleSubmitAbsence = async () => {
  try {
    const response = await client.post('/absence_employe', {
      absenceDate: dataAbsence.value.date,
      entryTime: dataAbsence.value.entryTime,
      exitTime: dataAbsence.value.exitTime,
      information: dataAbsence.value.information,
      employeId: numberPerson
    })
    if (response.status == 200) {
      toastValue.value.status = true
      toastValue.value.backgroundColor = 'green'
      toastValue.value.message = 'Success send absence'
      setTimeout(() => {
        toastValue.value.status = false
      }, 1800)
    }
  } catch (err: any) {
    toastValue.value.status = true
    toastValue.value.backgroundColor = 'red'
    toastValue.value.message = err.response.data.message
    setTimeout(() => {
      toastValue.value.status = false
    }, 1800)
  }
}
</script>

<template>
  <Toast
    :background-color="toastValue.backgroundColor"
    :message="toastValue.message"
    v-if="toastValue.status"
  />
  <div>
    <div class="flex justtify-center">
      <TheCalender
        @date="handleDateSelect"
        @entry-time="handleEntryTimeSelect"
        @exit-time="handleExitTimeSelect"
      />
    </div>
    <TheSelected
      :values="selectedOption"
      @selected="handleSelectValue"
      label="Select Information"
    />
    <div class="flex justify-center mt-5">
      <div><button @click.prevent="handleSubmitAbsence()">Send absence</button></div>
    </div>
  </div>
</template>
