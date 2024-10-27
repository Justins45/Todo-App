<script setup lang="ts">
import ListGroup from '@/components/ListGroup.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

import TodoData from '../assets/data.json'

function runTest() {
  alert('test ran')
}
</script>

<template>
  <!-- Add todo group -->
  <div class="flex justify-end">
    <button @click="runTest()">
      <PlusIcon class="h-10 w-10 text-green-500" />
    </button>
  </div>
  <div v-for="data in TodoData" :key="data.id">
    <ListGroup :id="data.id" :group_name="data.group_name" :data="data.data" />
  </div>
</template>
