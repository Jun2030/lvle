import { piniaPersistConfig } from '@/stores/helper'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const counter = ref(0)
    function counterIncrease() {
      counter.value++
    }
    return { counter, counterIncrease }
  },
  {
    persist: piniaPersistConfig('counter'),
  },
)
