<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    checked?: boolean
    name: string
    id: string
  }>(),
  { checked: false },
)

const checked = ref(props.checked)
</script>
<template>
  <li>
    <input type="checkbox" :id="props.id" class="mr-2" v-model="checked" />
    <label :for="props.id" :class="[checked ? 'underline' : '']">{{
      props.name
    }}</label>
  </li>
</template>
