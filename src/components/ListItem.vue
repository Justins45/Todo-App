<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  id: string
  todo_title: string
  completed: boolean
}>()

const checked = ref(props.completed)
// TODO: when completed move to bottom of group

const deleteItem = () => {
  console.log(`Deleting item ${props.todo_title}`)

  // TODO: emit click event with id attached
}
</script>
<template>
  <div class="flex justify-between">
    <div>
      <input type="checkbox" :id="props.id" class="mr-2" v-model="checked" />
      <label
        :for="props.id"
        :class="[checked ? 'text-zinc-400 line-through' : '']"
        >{{ props.todo_title }}</label
      >
    </div>
    <div @click="deleteItem()">
      <TrashIcon class="h-5 w-5 text-red-500 hover:underline" />
    </div>
  </div>
</template>
