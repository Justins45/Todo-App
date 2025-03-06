<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    hidden?: boolean
  }>(),
  { hidden: false },
)
</script>
<template>
  <div :class="[props.hidden ? '' : 'hidden']">
    <div class="absolute top-0 z-0 h-lvh w-lvw bg-zinc-300 opacity-60"></div>
    <div
      class="absolute left-1/2 top-1/2 z-10 h-1/4 w-10/12 -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white"
    >
      <div class="h-full p-5">
        <div class="flex h-full flex-col justify-between">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
