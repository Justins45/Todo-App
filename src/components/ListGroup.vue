<script setup lang="ts">
import { ref } from 'vue'
import ListItem from '@/components/ListItem.vue'
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  SquaresPlusIcon,
} from '@heroicons/vue/24/outline'
import localforage from 'localforage'
import { v4 as uuidv4 } from 'uuid'

import { type TypeListItem } from '../types'

const props = defineProps<{
  id: string
  group_name: string
  data?: Array<TypeListItem>
}>()

const todo_title = ref('')
const input_err = ref('')
const show_form = ref(false)
const is_hidden = ref(false)

const deleteGroup = (id: string) => {
  localforage
    .removeItem(id)
    .then(function () {})
    .catch(function (err) {
      //TODO: make err_catch_all a global function
      console.log(err)
    })

  // refresh list with removed key
  location.reload()
}

const addTodoItem = () => {
  // TODO: make click show modal
  // FIXME: FOR NOW ITS A POP UP FORM UNDER THE TODO GROUP
  show_form.value = !show_form.value
}

const onSubmit = (todo_title: string) => {
  if (todo_title == '') {
    input_err.value = 'please enter a todo item'
    return
  }
  const uuid = uuidv4()

  const input_data = ref([])

  const old_data = props.data

  const new_data = {
    id: uuid,
    todo_title: todo_title,
    completed: false,
  }

  if (typeof old_data == 'undefined') {
    input_data.value.push({
      id: props.id,
      group_name: props.group_name,
      data: [new_data],
    })
  } else if (typeof old_data !== 'undefined') {
    input_data.value.push({
      id: props.id,
      group_name: props.group_name,
      data: [...old_data, new_data],
    })
  } else {
    console.error('There was an error adding a todo item')
  }

  // NOTE: turn a proxy array into a readable array with previous json formatted data
  const item = JSON.parse(JSON.stringify(input_data.value))

  localforage
    .setItem(props.id, item)
    .then(function () {})
    .catch(function (err) {
      console.log(err)
    })

  location.reload()
}

const deleteItem = (itemID: string) => {
  const item = ref([])
  const item_list = props.data

  if (item_list) {
    for (let i = 0; i < item_list.length; i++) {
      const element = item_list[i]
      console.log(element.id)
      if (element.id === itemID) {
        // NOTE: splice will return with the value removed if set to a variable
        item_list.splice(i, 1)
        break
      }
    }

    item.value.push({
      id: props.id,
      group_name: props.group_name,
      data: item_list,
    })

    const reclone = JSON.parse(JSON.stringify(item.value))

    localforage
      .setItem(props.id, reclone)
      .then(function () {})
      .catch(function (err) {
        console.error(err)
      })
    location.reload()
  } else {
    console.error('sorry there is no items to try and delete')
  }
}

const updateCompleted = (itemID: string) => {
  const item = ref([])
  const item_list = props.data

  if (item_list) {
    for (let i = 0; i < item_list.length; i++) {
      const element = item_list[i]
      if (element.id === itemID) {
        if (element.completed) {
          item_list[i].completed = false
        } else {
          item_list[i].completed = true
        }

        break
      } else {
        console.error(`no item with ${itemID} found`)
      }
    }

    item.value.push({
      id: props.id,
      group_name: props.group_name,
      data: item_list,
    })

    const reclone = JSON.parse(JSON.stringify(item.value))

    localforage
      .setItem(props.id, reclone)
      .then(function () {})
      .catch(function (err) {
        console.error(err)
      })

    location.reload()
  } else {
    console.error('sorry there is no items to try and delete')
  }
}

// TODO: add a button to add todo items | + use same modal popup from adding todo group
</script>
<template>
  <div class="mb-10" :id="props.id">
    <div class="flex justify-between">
      <h2 class="text-lg uppercase">{{ props.group_name }}</h2>
      <div class="relative">
        <div
          class="border-1 absolute -right-1 -top-24 rounded-lg bg-white p-3 shadow-md"
          :class="[is_hidden ? '' : 'hidden']"
        >
          <div class="flex w-48 flex-col">
            <button @click="addTodoItem()" class="flex justify-between">
              Add Todo item
              <SquaresPlusIcon class="h-5 w-5 text-emerald-400" />
            </button>
            <div class="my-1.5 h-0.5 w-full bg-slate-300"></div>
            <button @click="deleteGroup(props.id)" class="flex justify-between">
              Remove Todo Group
              <TrashIcon class="h-5 w-5 text-red-500" />
            </button>
          </div>
        </div>

        <button @click="is_hidden = !is_hidden" class="float-right">
          <EllipsisHorizontalIcon class="h-7 w-7" />
        </button>
      </div>
    </div>

    <div class="h-0.5 w-full rounded-xl bg-zinc-300"></div>
    <ul class="ml-3 mt-3 lowercase">
      <li v-for="item in props.data" :key="item.id">
        <!-- {{ item }} -->
        <ListItem
          :id="item.id"
          :todo_title="item.todo_title"
          :completed="item.completed"
          @delete-item="deleteItem"
          @update-completed="updateCompleted"
        />
      </li>
    </ul>

    <!-- TEMP FORM ADDITION -->
    <div :class="[show_form ? '' : 'hidden']">
      <form
        @submit.prevent="onSubmit(todo_title)"
        class="flex flex-col space-y-3"
      >
        <label for="todo-group-name-input">Add todo item</label>
        <input
          type="text"
          placeholder="Add Todo Item"
          id="todo-group-name-input"
          v-model="todo_title"
          class="rounded-md border p-1"
          :class="[
            input_err
              ? 'border-red-500 placeholder:text-red-500'
              : 'border-zinc-500',
          ]"
        />
        <template v-if="input_err">
          <p class="p-1 font-bold text-red-500">{{ input_err }}</p>
        </template>
        <button type="submit" class="w-min rounded-md bg-emerald-300 p-1">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
