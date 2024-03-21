<script setup lang="ts">
import { defineProps } from 'vue'
export interface ToastData {
  message: string
  backgroundColor: string
}
const { message, backgroundColor } = defineProps({
  message: String,
  backgroundColor: {
    type: String,
    default: 'transparent'
  }
})
</script>

<template>
  <div class="content flex justify-center align-center">
    <p
      :style="{
        position: 'fixed',
        padding: '10px',
        backgroundColor: backgroundColor,
        color: 'white',
        borderRadius: '4px',
        zIndex: 99999999
      }"
    >
      {{ message }}
    </p>
  </div>
</template>

<style>
.content {
  opacity: 0;
  transform: translateY(-50px);
  animation: slideIn 0.5s ease forwards;
}
.content.show {
  animation: slideOut 0.5s ease forwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideOut {
  from {
    opacity: 1;
    transform: translateY();
  }
  to {
    opacity: 0;
    transform: translateY(-50px);
  }
}
</style>
