<script setup lang="tsx">
import ICON_LOGO from '~/public/icons/icon.png'
import { useAppStore } from '@/stores'
import { LocaleEnum } from '@/enums'

function toggleLocale() {
  useAppStore().SET_LOCALE(useAppStore().locale === LocaleEnum.ZH_CN ? LocaleEnum.EN_US : LocaleEnum.ZH_CN)
}

const toggleLocaleText = computed(() => {
  return `切换至${useAppStore().locale === LocaleEnum.ZH_CN ? '英文' : '中文'}`
})
</script>

<template>
  <div>
    <p>{{ $t('demo.count') }}</p>
    <img :src="ICON_LOGO" class="logo" alt="logo">
    <button @click="toggleLocale">
      {{ toggleLocaleText }}
    </button>
    <HelloWorld :msg="$t('app.name')" version="v1.2.1" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
