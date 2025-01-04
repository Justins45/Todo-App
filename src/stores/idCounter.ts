import { ref } from 'vue'
import { defineStore } from 'pinia'

export const idCounterStore = defineStore('idCounter', () => {
  const count = ref(0)
  function increaseID() {
    count.value++
  }

  return { count, increaseID }
})
