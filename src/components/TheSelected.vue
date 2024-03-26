<script setup lang="ts">
const props = defineProps({ values: Array, label: String })
const emmits = defineEmits(['selected'])

const handleSelect = (event: Event) => {
  const selectedValue = (event.target as HTMLSelectElement).value
  emmits('selected', selectedValue)
}
</script>
<template>
  <label for="select">{{ props.label }}</label>
  <div class="">
    <select name="select" id="information" @change="handleSelect">
      <option selected disabled>Choise</option>
      <option v-for="value of props.values" :value="value">{{ value }}</option>
    </select>
  </div>
</template>
<style></style>
 