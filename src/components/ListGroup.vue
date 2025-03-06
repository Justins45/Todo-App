<script setup lang="ts">
import { ref } from 'vue'
import ListItem from '@/components/ListItem.vue'
import {
  EllipsisHorizontalIcon,
  TrashIcon,
  SquaresPlusIcon,
  BackspaceIcon,
} from '@heroicons/vue/24/outline'
import localforage from 'localforage'

import { type TypeListItem } from '../types'

const props = defineProps<{
  id: string
  group_name: string
  data?: Array<TypeListItem>
}>()

const emit = defineEmits(['add-todo-item', 'delete-todo-group'])

const is_hidden = ref(true)
const show_delete = ref(false)

const deleteGroup = () => {
  emit('delete-todo-group', props.id, props.group_name)
  is_hidden.value = true
}

const addTodoItem = () => {
  emit('add-todo-item', props.id, props.group_name, props.data)
  is_hidden.value = true
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

const RemoveTodoItems = () => {
  show_delete.value = !show_delete.value
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
</script>
<template>
  <div class="mb-10" :id="props.id">
    <div class="flex justify-between">
      <h2 class="text-lg uppercase">{{ props.group_name }}</h2>
      <div class="relative">
        <div
          class="border-1 absolute -right-1 -top-32 rounded-lg bg-white p-3 shadow-md"
          :class="[is_hidden ? 'hidden' : '']"
        >
          <div class="flex w-48 flex-col">
            <button @click="addTodoItem()" class="flex justify-between">
              Add Todo item
              <SquaresPlusIcon class="h-5 w-5 text-emerald-400" />
            </button>
            <div class="my-1.5 h-0.5 w-full bg-slate-300"></div>
            <button @click="deleteGroup()" class="flex justify-between">
              Remove Todo Group
              <TrashIcon class="h-5 w-5 text-red-500" />
            </button>
            <div class="my-1.5 h-0.5 w-full bg-slate-300"></div>
            <button @click="RemoveTodoItems()" class="flex justify-between">
              Remove todo items
              <BackspaceIcon class="h-5 w-5 text-red-500" />
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
        <ListItem
          :id="item.id"
          :todo_title="item.todo_title"
          :completed="item.completed"
          @delete-item="deleteItem"
          @update-completed="updateCompleted"
          :show_delete="show_delete"
        />
      </li>
    </ul>
  </div>
</template>
