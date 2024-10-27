<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import ListGroup from '@/components/ListGroup.vue'
import TodoData from '../assets/data.json'

const new_group_name = ref('')
const err = ref()

function runTest() {
  // TODO: make button show modal + input form
  alert('test ran')
}

function onSubmit() {
  if (new_group_name.value !== '') {
    // remove any error messages present
    err.value = ''

    // add data to json file
    TodoData.push({
      id: '3',
      group_name: new_group_name.value,
      data: [],
    })

    const new_data_sheet = JSON.stringify(TodoData, null, 4)
    console.log('new data sheet', new_data_sheet)

    // remove input value
    new_group_name.value = ''
  } else {
    // return error if no value in input
    err.value = 'please input a value'
  }
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
        v-model="new_group_name"
        class="rounded-md border p-1"
        :class="[
          err ? 'border-red-500 placeholder:text-red-500' : 'border-zinc-500',
        ]"
      />
      <template v-if="err">
        <p class="p-1 font-bold text-red-500">{{ err }}</p>
      </template>
      <button type="submit" class="w-min rounded-md bg-blue-300 p-1">
        Submit
      </button>
    </form>
  </div>
  <div v-for="data in TodoData" :key="data.id">
    <ListGroup :id="data.id" :group_name="data.group_name" :data="data.data" />
  </div>
</template>
