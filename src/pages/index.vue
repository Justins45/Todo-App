<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import ListGroup from '@/components/ListGroup.vue'
// import TodoData from '../assets/data.json'
// NOTE: used in commented out code, commented out to prevent errors throwinga
// import pushTodoGroup from '../scripts/groupNamePush'

import localforage from 'localforage'

const new_group_name = ref('')
const err = ref()

const TodoData = ref()

function runTest() {
  // TODO: make button show modal + input form
  alert('test ran')
}
/*
// NOTE: This is the old submit function and the new one is on line #50
async function onSubmit() {
  if (new_group_name.value !== '') {
    // remove any error messages present
    err.value = ''

    // add data to json file
    // TODO: add pina store to keep track of id number increasing + setting default to new "top" number each time
    TodoData.push({
      id: '3',
      group_name: new_group_name.value,
      data: [],
    })

    const new_data_sheet = JSON.stringify(TodoData, null, 4)
    console.log('new data sheet', new_data_sheet)

    // FIXME: cors error not allowing json post - Axios / npm cors install might be needed + moving request to a .js file

    pushTodoGroup(new_data_sheet)

    // TODO: get data to stay in local json file and not in local json file - NOTE: might need a local server to run for this

    // remove input value
    new_group_name.value = ''
  } else {
    // return error if no value in input
    err.value = 'please input a value'
  }
}
*/
// Start of LocalForage submit method

function onSubmit() {
  localforage
    .setItem('1', {
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
    })
    .then(function (value) {
      // Do other things once the value has been saved.
      console.log(value, 'set item')
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

function getItems() {
  localforage
    .getItem('1')
    .then(function (value) {
      // This code runs once the value has been loaded
      // from the offline store.
      TodoData.value = value
      // console.log(TodoData.value, 'get item')
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

localforage
  .keys()
  .then(function (keys) {
    // An array of all the key names.
    console.log(keys)
  })
  .catch(function (err) {
    // This code runs if there were any errors
    console.log(err)
  })

// Run funtions to grab data on load
getItems()

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
    <p>{{ data }}</p>
    <ListGroup :id="data.id" :group_name="data.group_name" :data="data.data" />
  </div>
</template>
