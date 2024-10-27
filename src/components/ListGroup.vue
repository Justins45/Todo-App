<script setup lang="ts">
import ListItem from '@/components/ListItem.vue'
import { type TypeListItem } from '../types'

const props = defineProps<{
  id: string
  group_name: string
  data: Array<TypeListItem>
}>()
</script>
<template>
  <div class="px-5 py-3" :id="props.id">
    <h2 class="h-10 uppercase">{{ props.group_name }}</h2>
    <div class="h-0.5 w-full rounded-xl bg-zinc-300"></div>
    <ul class="ml-3 mt-3 lowercase">
      <li v-for="item in props.data" :key="item.id">
        <ListItem :id="item.id" :name="item.name" :completed="item.completed" />
      </li>
    </ul>
  </div>
</template>
