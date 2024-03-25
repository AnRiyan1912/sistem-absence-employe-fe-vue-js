<template>
  <section>
    <div class="form-group">
      <label for="date">Select a date</label>
      <div class="input-group">
        <flat-pickr
          v-model="date"
          :config="config"
          class="form-control"
          placeholder="Select date"
          name="date"
        />
      </div>
      <div class="mt-3">
        <label for="time">Input or click to get time now for entry time</label>
        <div class="input-group">
          <input type="time" class="form-control" id="time" v-model="entyTime" />
          <button class="btn btn-primary" @click.prevent="setEntryTimeNow()">Time now</button>
        </div>
      </div>
      <div class="mt-3">
        <label for="time">Input or click to get time now for Exit time</label>
        <div class="input-group">
          <input type="time" class="form-control" id="time" v-model="exitTime" />
          <button class="btn btn-primary" @click.prevent="setExitTimeNow()">Time now</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'flatpickr/dist/themes/material_blue.css'
import { Indonesian } from 'flatpickr/dist/l10n/id.js'
import { format } from 'date-fns'

const getDate = new Date(Date.now())
const date = ref(getDate.toISOString().slice(0, 10))
const entyTime = ref()
const exitTime = ref()
const config = ref({
  wrap: true,
  altFormat: 'M j, Y',
  altInput: true,
  dateFormat: 'Y-m-d',
  locale: Indonesian
})
const setEntryTimeNow = () => {
  entyTime.value = format(getDate, 'HH:mm')
}

const setExitTimeNow = () => {
  exitTime.value = format(getDate, 'HH:mm')
}
</script>

<style>
.input-group-append .btn {
  border-radius: 0 0.25rem 0.25rem 0;
}
.input-group-append .btn i {
  font-size: 1rem;
}
</style>
