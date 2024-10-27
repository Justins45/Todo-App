<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import ListGroup from '@/components/ListGroup.vue'
import TodoData from '../assets/data.json'

const text = ref()

function runTest() {
  alert('test ran')
}

function onSubmit() {
  alert(text.value)
  text.value = ''
}

// TODO: get form working for adding new todo groups | + make form a modal / popup
</script>

<template>
  <div class="flex justify-end">
    <button @click="runTest()">
      <PlusIcon class="h-10 w-10 text-green-500" />
    </button>
  </div>
  <!-- todo group form -->
  <div class="mx-3 my-5">
    <form @submit.prevent="onSubmit" class="flex flex-col space-y-3">
      <label for="todo-group-input">Todo group name input</label>
      <input
        type="text"
        placeholder="Todo Group Name"
        id="todo-group-name-input"
        v-model="text"
        class="rounded-md border border-zinc-500 p-1"
      />
      <button type="submit" class="w-min rounded-md bg-blue-300 p-1">
        Submit
      </button>
    </form>
  </div>
  <div v-for="data in TodoData" :key="data.id">
    <ListGroup :id="data.id" :group_name="data.group_name" :data="data.data" />
  </div>
</template>
