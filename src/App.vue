<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <div>
        <p>Loading...</p>
      </div>
    </template>
  </Suspense>
</template>
