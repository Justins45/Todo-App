<script setup lang="ts">
import { ref } from 'vue'
import { PlusIcon } from '@heroicons/vue/24/solid'
import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid'

import ListGroup from '@/components/ListGroup.vue'
import Modal from '@/components/Modal.vue'

// TODO: put functions into their own files ?? might not work for everything / learn how to make it work and not be a mess

const todo_data = ref([])
const todo_item_data = ref()
const delete_group_data = ref()

const show_item_modal = ref(false)
const show_delete_modal = ref(false)

const new_group_name = ref('')
const todo_item_name = ref('')
const delete_todo_group_name = ref('')

const input_err = ref()
const input_item_err = ref<string | null>()
const delete_group_err = ref('')
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
    input_item_err.value = 'Todo item cannot be empty'
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

const deleteTodoGroup = (
  todo_group_id: string,
  todo_group_name_original: string,
) => {
  show_delete_modal.value = true

  delete_group_data.value = {
    id: todo_group_id,
    original_name: todo_group_name_original.toUpperCase(),
  }
}

const onDeleteTodoGroup = (delete_input_name: string) => {
  if (delete_input_name != delete_group_data.value.original_name) {
    delete_group_err.value = 'Todo Group name does not match'
    return
  }

  localforage
    .removeItem(delete_group_data.value.id)
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
          @add-todo-item="addTodoItems"
          @delete-todo-group="deleteTodoGroup"
        />
      </div>
    </template>
    <template v-else>
      <p>you have no todo groups</p>
    </template>
  </div>
  <Modal :hidden="show_item_modal">
    <form
      @submit.prevent="onTodoItemSubmit(todo_item_name)"
      id="todo_item_input_form"
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
          <p class="ml-5 p-1 font-bold text-red-500">
            {{ input_item_err }}
          </p>
        </template>
      </div>
    </form>
    <div class="mt-8 flex flex-row justify-end text-lg">
      <button
        @click="show_item_modal = false"
        class="mr-3 rounded-md bg-zinc-300 px-5 py-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        form="todo_item_input_form"
        class="w-min rounded-md bg-emerald-300 px-5 py-2"
      >
        Submit
      </button>
    </div>
  </Modal>

  <Modal :hidden="show_delete_modal">
    <form
      @submit.prevent="onDeleteTodoGroup(delete_todo_group_name)"
      id="todo_delete_group_form"
    >
      <div>
        <label for="todo-group-name-input" class="text-2xl font-bold"
          >WAIT!! Are you sure you want to Delete your Todo Group?
        </label>
        <p class="my-3">
          Please type the name of the todo group to confirm deletion.
        </p>
        <input
          type="text"
          placeholder="Todo Group Name"
          id="todo-delete-group-name-input"
          v-model="delete_todo_group_name"
          class="ml-3 mt-5 w-11/12 border-b-2 bg-transparent pl-3 placeholder:text-lg"
          :class="[
            delete_group_err
              ? 'border-red-500 placeholder:text-red-500'
              : 'border-zinc-500',
          ]"
        />
        <template v-if="delete_group_err">
          <p class="ml-5 p-1 font-bold text-red-500">
            {{ delete_group_err }}
          </p>
        </template>
      </div>
    </form>
    <div class="mt-8 flex flex-row justify-end text-lg">
      <button
        @click="show_delete_modal = false"
        class="mr-3 rounded-md bg-zinc-300 px-5 py-2"
      >
        Keep
      </button>
      <button
        type="submit"
        form="todo_delete_group_form"
        class="w-min rounded-md bg-red-500 px-5 py-2 uppercase"
      >
        Delete
      </button>
    </div>
  </Modal>
</template>
