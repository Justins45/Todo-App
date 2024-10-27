<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    completed: boolean
    name: string
    id: string
  }>(),
  { completed: false },
)

const checked = ref(props.completed)
// TODO: add UUID for each list item
</script>
<template>
  <input type="checkbox" :id="props.id" class="mr-2" v-model="checked" />
  <label :for="props.id" :class="[checked ? 'underline' : '']">{{
    props.name
  }}</label>
</template>
