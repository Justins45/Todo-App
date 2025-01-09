<script setup lang="ts">
import { ref } from 'vue'
import ListItem from '@/components/ListItem.vue'
import { TrashIcon, SquaresPlusIcon } from '@heroicons/vue/24/outline'
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
  console.log(`group ${props.id} wants to add an item to its list`)
  // TODO: make click show modal
  // FIXME: FOR NOW ITS A POP UP FORM UNDER THE TODO GROUP
  show_form.value = !show_form.value
}

const onSubmit = (todo_title: string) => {
  console.log(`starting submit of todo item on group ${props.group_name}`)

  if (todo_title == '') {
    input_err.value = 'please enter a todo item'
    return
  }
  const uuid = uuidv4()

  const input_data = {
    id: props.id,
    group_name: props.group_name,
    data: {
      id: uuid,
      todo_title: todo_title,
      completed: false,
    },
  }

  // NOTE: turn a proxy array into a readable array with previous json formatted data
  const item = JSON.parse(JSON.stringify(input_data))
  console.log('input data', item)

  localforage
    .setItem(props.id, item)
    .then(function (value) {
      // Do other things once the value has been saved.
      console.log(`${value} has been added`)
    })
    .catch(function (err) {
      // This code runs if there were any errors
      console.log(err, 'WASDASDASDASDA')
    })
}

// TODO: add a button to add todo items | + use same modal popup from adding todo group
</script>
<template>
  <div class="px-5 py-3" :id="props.id">
    <div class="flex justify-between">
      <h2 class="h-10 uppercase">{{ props.group_name }}</h2>
      <div @click="deleteGroup(props.id)">
        <TrashIcon class="h-5 w-5 text-red-500 hover:underline" />
      </div>
    </div>

    <!-- TODO: add remove group button -->
    <div class="h-0.5 w-full rounded-xl bg-zinc-300"></div>
    <ul class="ml-3 mt-3 lowercase">
      <li v-for="item in props.data" :key="item.id">
        <ListItem :id="item.id" :name="item.name" :completed="item.completed" />
      </li>
    </ul>
    <div class="flex justify-start" @click="addTodoItem()">
      <SquaresPlusIcon class="mr-3 h-5 w-5 text-emerald-400" />
      <p>add todo item</p>
    </div>

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
    <!-- TODO: if checked => move to collapsed dropdown list of completed -->
    <!-- TODO: add delete button for all completed todo items -->
  </div>
</template>
