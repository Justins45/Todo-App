<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  id?: any
  name?: any
  completed?: any
}>()

const checked = ref(props.completed)
// TODO: add UUID for each list item
// TODO: when completed update data.json at corrent location
// TODO: when completed move to bottom of group
</script>
<template>
  <input type="checkbox" :id="props.id" class="mr-2" v-model="checked" />
  <label
    :for="props.id"
    :class="[checked ? 'text-zinc-400 line-through' : '']"
    >{{ props.name }}</label
  >
</template>
