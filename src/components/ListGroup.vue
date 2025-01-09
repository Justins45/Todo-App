<script setup lang="ts">
import ListItem from '@/components/ListItem.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'
import localforage from 'localforage'

import { type TypeListItem } from '../types'

const props = defineProps<{
  id: string
  group_name: string
  data?: Array<TypeListItem>
}>()

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
    <!-- TODO: if checked => move to collapsed dropdown list of completed -->
    <!-- TODO: add delete button for all completed todo items -->
  </div>
</template>
