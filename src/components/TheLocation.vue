<script setup lang="ts">
import { ref } from 'vue'

const coordinate = ref({ latitude: 0, longitude: 0 })
const watchId = navigator.geolocation.watchPosition((position) => {
  const { latitude, longitude } = position.coords
  coordinate.value.latitude = latitude
  coordinate.value.longitude = longitude
})

const handleStopGetCurrentLocation = () => {
  navigator.geolocation.clearWatch(watchId)
}
</script>
<template>
  <iframe
    width="100%"
    height="200"
    :src="`https://maps.google.com/maps?q=${coordinate.latitude}, ${coordinate.longitude}&amp;z=15&amp;output=embed`"
    frameborder="0"
  ></iframe>
  <button @click.prevent="handleStopGetCurrentLocation()">Clear location</button>
</template>
<style></style>
