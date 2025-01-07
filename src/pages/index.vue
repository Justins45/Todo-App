<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid'

import ListGroup from '@/components/ListGroup.vue'

const todo_data = ref([])
const counter = ref(0)

const new_group_name = ref('')
const err = ref()

function runTest() {
  // TODO: make button show modal + input form
  alert('test ran')
}

//TODO: sort by group_name alphabeticaly
const sortArray = arr => {
  //NOTE: Remove extra array wrapper
  for (let i = 0; i < arr.length; i++) {
    todo_data.value.push(arr[i][0])
  }

  // sort array by group_name value
  todo_data.value.sort((a, b) => a.group_name.localeCompare(b.group_name))
}

//TODO: maybe make mnaual function that removes the localforage Array<Array<object>> and makes it just Array<object>
const getItems = () => {
  const array_holder = ref([])

  localforage
    .iterate(function (value) {
      array_holder.value.push(value)
    })
    .then(function () {
      sortArray(array_holder.value)
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err)
    })
}

function onSubmit(group_name: string) {
  if (group_name == '') {
    err.value = 'please enter a name for a new todo group'
    return
  }

  // get data
  const inputData = ref()
  const uuid = uuidv4()

  //TODO: turn localforage scripts into functions in another file ?? | make this area cleaner
  // add data to
  inputData.value = [
    {
      id: uuid,
      group_name: group_name.toLowerCase(),
    },
  ]

  console.log(inputData.value)
  // NOTE: turn a proxy array into a readable array with previous json formatted data
  const item = JSON.parse(JSON.stringify(inputData.value))
  console.log(item)

  // add data to storage
  localforage
    .setItem(uuid, item)
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
      @submit.prevent="onSubmit(new_group_name)"
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
    <div v-for="data in todo_data" :key="data.id">
      <!-- {{ data }} -->
      <ListGroup
        :id="data.id"
        :group_name="data.group_name"
        :data="data.data"
      />
    </div>
  </template>
  <template v-else>
    <p>you have no todo groups</p>
  </template>
</template>
