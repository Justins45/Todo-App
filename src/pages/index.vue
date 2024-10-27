<script setup lang="ts">
import ListGroup from '@/components/ListGroup.vue'
import { PlusIcon } from '@heroicons/vue/24/solid'

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
  <ListGroup />
</template>
