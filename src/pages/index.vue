<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/solid'

function runTest() {
  alert('test ran')
}

console.log('wasda')
</script>

<template>
  <!-- Add todo group -->
  <div class="flex justify-end">
    <button @click="runTest()">
      <PlusIcon class="h-10 w-10 text-green-500" />
    </button>
  </div>
  <!-- List group start -->
  <div class="px-5 py-3">
    <!-- List title -->
    <h2 class="h-10 uppercase">Make To-do app</h2>
    <div class="h-0.5 w-full rounded-xl bg-zinc-300"></div>
    <!-- List container start -->
    <ul class="ml-3 mt-3 lowercase">
      <!-- List items -->
      <li>
        <input type="checkbox" id="item1" class="mr-2" />
        <label for="item1">make CONTAINER</label>
      </li>
      <!-- List items -->
      <li>
        <input type="checkbox" id="item2" class="mr-2" />
        <label for="item2">make components</label>
      </li>
      <!-- List items -->
      <li>
        <input type="checkbox" id="item3" class="mr-2" />
        <label for="item3">make styling</label>
      </li>
      <!-- List items -->
      <li>
        <input type="checkbox" id="item4" class="mr-2" />
        <label for="item4">combine all items</label>
      </li>
    </ul>
    <!-- List containter end -->
  </div>
  <!-- List group end -->
</template>
