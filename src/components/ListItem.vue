<script setup lang="ts">
import { ref } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    id: string
    todo_title: string
    completed: boolean
    show_delete?: boolean
  }>(),
  {
    show_delete: false,
  },
)

const checked = ref(props.completed)
// TODO: when completed move to bottom of group

const emit = defineEmits(['delete-item', 'update-completed'])

const deleteItem = (itemID: string) => {
  emit('delete-item', itemID)
}

const updateCompleted = (itemID: string) => {
  emit('update-completed', itemID)
}
</script>
<template>
  <div class="flex justify-between">
    <div>
      <input
        type="checkbox"
        :id="props.id"
        class="mr-2"
        v-model="checked"
        @click="updateCompleted(props.id)"
      />
      <label
        :for="props.id"
        :class="[checked ? 'text-zinc-400 line-through' : '']"
        >{{ props.todo_title }}</label
      >
    </div>
    <div @click="deleteItem(props.id)" v-show="show_delete">
      <TrashIcon class="h-5 w-5 text-red-500 hover:underline" />
    </div>
  </div>
</template>
