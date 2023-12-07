<script setup lang="tsx">
const appStore = useAppStore()
</script>

<template>
  <el-config-provider :locale="appStore.getLocale">
    <router-view v-slot="{ Component, route }">
      <keep-alive max="5">
        <component :is="Component" v-if="$route.meta.isKeepAlive" :key="route" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.isKeepAlive" :key="route" />
    </router-view>
  </el-config-provider>
</template>
