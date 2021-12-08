<template>
  <div class="w-full flex flex-row justify-center py-4 shadow-sm">
    <h1
      class="text-5xl cursor-pointer"
      data-test="header"
      @click="router.push({ name: 'home' })"
    >
      KK-Podcast
    </h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
