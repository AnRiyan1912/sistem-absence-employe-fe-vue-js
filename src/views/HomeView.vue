<script setup lang="ts">
import TheCalender from '@/components/TheCalender.vue'
import TheSelected from '@/components/TheSelected.vue'

const selectedOption = ['PRESENT', 'SICK', 'PERMISSION', 'ANNUAL_LEAVE']

const handleSelect = (selectValue: String) => {
  console.log(selectValue)
}
</script>

<template>
  <main>
    <div class="flex justtify-center">
      <TheCalender />
    </div>
    <TheSelected :values="selectedOption" @selected="handleSelect" label="Select Information" />
  </main>
</template>
