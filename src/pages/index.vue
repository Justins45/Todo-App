<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid'

import ListGroup from '@/components/ListGroup.vue'

// TODO: put functions into their own files ?? might not work for everything / learn how to make it work and not be a mess

const todo_data = ref([])
const todo_item_data = ref()
const show_item_modal = ref(false)

const new_group_name = ref('')
const todo_item_name = ref('')

const input_err = ref('')
const input_item_err = ref('')
const err_catch_all = ref('')

const sortArray = arr => {
  //NOTE: Remove extra array wrapper
  for (let i = 0; i < arr.length; i++) {
    todo_data.value.push(arr[i][0])
  }

  // sort array by group_name value
  todo_data.value.sort((a, b) => a.group_name.localeCompare(b.group_name))
}

const errCatch = (err: string) => {
  err_catch_all.value = err
}

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
      errCatch(err)
    })
}

function onSubmit(group_name: string) {
  if (group_name == '') {
    input_err.value = 'value cannot be empty'
    return
  }

  // get data
  const inputData = ref()
  const uuid = uuidv4()

  //TODO: turn localforage scripts into functions in another file ?? | make this area cleaner
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
    //TODO: is this .then and .catch needed? -- maybe .catch if theres an error.... hmmmm
    .then(function (value) {
      console.log(`${value} has been added to the database`)
    })
    .catch(function (err) {
      errCatch(err)
    })
  console.log(inputData.value)

  // remove data to prevent adding duplicates
  inputData.value = []

  getItems()
  // NOTE: using reload to prevent a duplicate list from appearing when adding / changing a todo group

  location.reload()
}

// localforage
//   .clear()
//   .then(function () {
//     // Run this code once the database has been entirely deleted.
//     console.log('Database is now empty.')
//   })
//   .catch(function (err) {
//     // This code runs if there were any errors
//     console.log(err)
//   })

// NOTE: grab todo items parent group info and set it, Cannot pause a function in JS to wait on a submit to continue function.
const addTodoItems = (
  todo_groupID: string,
  todo_group_name: string,
  todo_group_data: any,
) => {
  show_item_modal.value = true

  todo_item_data.value = {
    todo_groupID: todo_groupID,
    todo_group_name: todo_group_name,
    todo_group_data: todo_group_data,
  }
}

const onTodoItemSubmit = (todo_item_name: string) => {
  if (todo_item_name == '') {
    input_item_err.value = 'value cannot be empty'
    return
  }

  const uuid = uuidv4()

  const input_data = ref([])

  const old_data = todo_item_data.value.todo_group_data

  const new_data = {
    id: uuid,
    todo_title: todo_item_name,
    completed: false,
  }

  if (typeof old_data == 'undefined') {
    input_data.value.push({
      id: todo_item_data.value.todo_groupID,
      group_name: todo_item_data.value.todo_group_name,
      data: [new_data],
    })
  } else if (typeof old_data !== 'undefined') {
    input_data.value.push({
      id: todo_item_data.value.todo_groupID,
      group_name: todo_item_data.value.todo_group_name,
      data: [...old_data, new_data],
    })
  } else {
    console.error('There was an error adding a todo item')
  }

  // NOTE: turn a proxy array into a readable array with previous json formatted data
  const item = JSON.parse(JSON.stringify(input_data.value))

  localforage
    .setItem(todo_item_data.value.todo_groupID, item)
    .then(function () {})
    .catch(function (err) {
      console.log(err)
    })

  location.reload()
}

getItems()
</script>

<template>
  <div class="mb-5 bg-[#f0e7d1] pt-24">
    <div class="mx-auto w-10/12 pb-5">
      <form @submit.prevent="onSubmit(new_group_name)" class="">
        <label for="todo-group-input" class="text-2xl font-bold"
          >Your To Do</label
        >
        <div class="mt-5 flex">
          <div class="w-full">
            <input
              type="text"
              placeholder="eg: yard work"
              id="todo-group-name-input"
              v-model="new_group_name"
              class="w-full border-b-2 bg-transparent pl-3"
              :class="[
                input_err
                  ? 'border-red-500 placeholder:text-red-500'
                  : 'border-zinc-500',
              ]"
            />
            <template v-if="input_err">
              <p class="p-1 font-bold text-red-500">{{ input_err }}</p>
            </template>
          </div>
          <button
            type="submit"
            class="mx-3 h-7 w-7 rounded-md bg-blue-300 p-0.5"
          >
            <PlusIcon class="h-6 w-6" />
          </button>
        </div>
      </form>
    </div>
  </div>
  <div class="mx-auto w-10/12">
    <template v-if="todo_data">
      <div v-for="data in todo_data" :key="data.id">
        <ListGroup
          :id="data.id"
          :group_name="data.group_name"
          :data="data.data"
          @addTodoItem="addTodoItems"
        />
      </div>
    </template>
    <template v-else>
      <p>you have no todo groups</p>
    </template>
  </div>
  <div :class="[show_item_modal ? '' : 'hidden']">
    <div class="absolute top-0 z-0 h-lvh w-lvw bg-zinc-300 opacity-60"></div>
    <div
      class="absolute left-1/2 top-1/2 z-10 h-1/4 w-10/12 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white"
    >
      <div class="h-full p-5">
        <form
          @submit.prevent="onTodoItemSubmit(todo_item_name)"
          class="flex h-full flex-col justify-between"
        >
          <div>
            <label for="todo-group-name-input" class="text-2xl font-bold"
              >Add todo item</label
            >
            <input
              type="text"
              placeholder="Add Todo Item"
              id="todo-group-name-input"
              v-model="todo_item_name"
              class="ml-3 mt-5 w-11/12 border-b-2 bg-transparent pl-3 placeholder:text-lg"
              :class="[
                input_item_err
                  ? 'border-red-500 placeholder:text-red-500'
                  : 'border-zinc-500',
              ]"
            />
            <template v-if="input_item_err">
              <p class="p-1 font-bold text-red-500">{{ input_item_err }}</p>
            </template>
          </div>
          <div class="flex flex-row justify-end text-lg">
            <button class="mr-3 rounded-md bg-zinc-300 px-5 py-2">
              Cancel
            </button>
            <button
              type="submit"
              class="w-min rounded-md bg-emerald-300 px-5 py-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
