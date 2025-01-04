<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import localforage from 'localforage'

import ListGroup from '@/components/ListGroup.vue'

const todo_keys = ref()
const todo_data = ref([])
const counter = ref(0)

const new_group_name = ref('')
const err = ref()

function runTest() {
  // TODO: make button show modal + input form
  alert('test ran')
}

// get all keys to be used in a loop to grab each item
const getKeys = () => {
  localforage
    .keys()
    .then(function (keys) {
      // An array of all the key names.
      // console.log(keys, 'get keys')
      // add all keys to an array
      todo_keys.value = keys
      // console.log(todo_keys.value, 'todo_keys.value')
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

const getItems = () => {
  getKeys()

  watchEffect(async () => {
    const response = JSON.parse(JSON.stringify(todo_keys.value))
    const todo_keys_list = await response

    for (let i = 0; i < todo_keys_list.length; i++) {
      localforage
        .getItem(i.toString())
        .then(function (value) {
          // This code runs once the value has been loaded
          // from the offline store.
          todo_data.value.push(value)
          /*
            console.log(`value list item ${i}`)
            console.log(`get item ${i} ${value}`)
            console.log(todo_data.value, `todo_data.value after ${i}`)
          */
        })
        .catch(function (err) {
          // This code runs if there were any errors
          console.log(err)
        })
    }
  })
}

function onSubmit(idCount: number, group_name: string) {
  if (group_name == '') {
    err.value = 'please enter a name for a new todo group'
    return
  }

  // get data
  const inputData = ref()
  //TODO: turn localforage scripts into functions in another file ?? | make this area cleaner
  // add data to
  inputData.value = [
    {
      id: idCount,
      group_name: group_name,
    },
  ]

  console.log(inputData.value)
  // NOTE: turn a proxy array into a readable array with previous json formatted data
  const item = JSON.parse(JSON.stringify(inputData.value))
  console.log(item)

  // add data to storage
  localforage
    .setItem(idCount.toString(), item)
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

  counter.value++
  getItems()
  // NOTE: using reload to prevent a duplicate list from appearing when adding / changing a todo group
  location.reload()
}

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
    <form
      @submit.prevent="onSubmit(counter, new_group_name)"
      class="flex flex-col space-y-3"
    >
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
  <template v-if="todo_data">
    <div v-for="data in todo_data" :key="data[0].id">
      <!-- {{ data[0] }} -->
      <ListGroup
        :id="data[0].id"
        :group_name="data[0].group_name"
        :data="data[0].data"
      />
    </div>
  </template>
  <template v-else>
    <p>you have no todo groups</p>
  </template>
</template>
