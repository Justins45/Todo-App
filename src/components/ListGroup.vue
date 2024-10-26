<script setup lang="ts">
import ListItem from '@/components/ListItem.vue'

// TODO: add for each of list items
</script>
<template>
  <div class="px-5 py-3">
    <!-- List title -->
    <h2 class="h-10 uppercase">Make To-do app</h2>
    <div class="h-0.5 w-full rounded-xl bg-zinc-300"></div>
    <!-- List container start -->
    <ul class="ml-3 mt-3 lowercase">
      <!-- List items -->
      <ListItem name="make CONTAINERS" id="item1" />
      <!-- List items -->
      <ListItem name="make components" id="item" />
      <!-- List items -->
      <ListItem name="make styling" id="item3" />
      <!-- List items -->
      <ListItem name="combine all items" id="item4" />
    </ul>
    <!-- List containter end -->
  </div>
</template>
