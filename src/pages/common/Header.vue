<template>
  <div class="w-full flex flex-row justify-center py-4 shadow-sm">
    <h1 class="text-5xl cursor-pointer" @click="router.push({ name: 'home' })">
      KK-Podcast
    </h1>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
