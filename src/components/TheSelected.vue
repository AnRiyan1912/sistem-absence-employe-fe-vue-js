<script setup lang="ts">
const props = defineProps({ values: Array, label: String })
const emmits = defineEmits(['selected'])

const handleSelect = (event: any) => {
  const selectedValue = event.target.value
  emmits('selected', selectedValue)
}

console.log(sessionStorage.getItem("auth"));

</script>
<template>
  <label for="select">{{ props.label }}</label>
  <div class="">
    <select name="select" id="information" @change="handleSelect">
      <option v-for="value of props.values" :value="value">{{ value }}</option>
    </select>
  </div>
</template>
<style></style>
