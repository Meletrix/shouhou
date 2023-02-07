<script setup lang="ts">
import { RouterView } from "vue-router";
import { reactive } from "vue";

const themeOverrides = reactive({
  common: {
    primaryColor: "#C3A370",
    primaryColorHover: "#C3A370",
  },
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider>
      <RouterView />
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>

</style>
