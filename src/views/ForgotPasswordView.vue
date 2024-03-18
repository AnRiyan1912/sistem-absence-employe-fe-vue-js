<script setup lang="ts">
import type client from '@/axios/config';


</script>
<template>
  <div class="flex justify-center align-center">
    <div>
      <div class="flex justify-center"><h4>Get verification code</h4></div>
      <div class="flex">
        <input type="text" placeholder="input your email account here" />
        <div><button>Send</button></div>
      </div>
      <div><input type="text" placeholder="input verification code" /></div>
      <div class="flex justify-center align-center"><button>Check verification code</button></div>
    </div>
  </div>
</template>
<style></style>
