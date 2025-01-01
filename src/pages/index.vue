<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import localforage from 'localforage'

import ListGroup from '@/components/ListGroup.vue'

const todo_keys = ref()
const todo_data = ref()

const new_group_name = ref('')
const err = ref()

function runTest() {
  // TODO: make button show modal + input form
  alert('test ran')
}

/**
 *
 * TODO: add functuion perameters
 * id - pina store value
 * new_group_name - from add group input
 *
 */

function onSubmit() {
  // get data
  const inputData = ref()
  // add data to
  inputData.value = [
    {
      id: '1',
      group_name: 'make todo app',
      data: [
        {
          id: 'item-1',
          name: 'make CONTAINERS',
          completed: false,
        },
        {
          id: 'item-2',
          name: 'make components',
          completed: false,
        },
        {
          id: 'item-3',
          name: 'make styling',
          completed: false,
        },
        {
          id: 'item-4',
          name: 'combine all items',
          completed: false,
        },
      ],
    },
  ]

  console.log(inputData.value)
  // NOTE: turn a proxy array into a readable array with previous json formatted data
  const item = JSON.parse(JSON.stringify(inputData.value))
  console.log(item)

  // add data to storage
  localforage
    .setItem('1', item)
    // is this .then and .catch needed? -- maybe .catch if theres an error.... hmmmm
    .then(function (value) {
      // Do other things once the value has been saved.
      console.log(value, 'set item')
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })

  // remove data to prevent adding duplicates
  inputData.value = []
}

// get all keys to be used in a loop to grab each item
localforage
  .keys()
  .then(function (keys) {
    // An array of all the key names.
    console.log(keys)
    // add all keys to an array
    todo_keys.value = keys
  })
  .catch(function (err) {
    // This code runs if there were any errors
    console.log(err)
  })

localforage
  .getItem('1')
  .then(function (value) {
    // This code runs once the value has been loaded
    // from the offline store.
    todo_data.value = value
    console.log(todo_data.value, 'get item')
  })
  .catch(function (err) {
    // This code runs if there were any errors
    console.log(err)
  })

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
  <div v-for="data in todo_data" :key="data.id">
    <ListGroup :id="data.id" :group_name="data.group_name" :data="data.data" />
  </div>
</template>
