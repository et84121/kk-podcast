<template>
  <div
    class="
      flex flex-row flex-wrap
      gap-4
      border border-2 border-blue-400
      rounded-2xl
      p-2
      cursor-pointer
      shadow-md
      hover:shadow-lg
    "
    @click="router.push({ name: 'episode' })"
  >
    <!-- ep. image -->
    <div
      class="
        w-25
        h-25
        flex flex-row
        justify-center
        items-center
        border border-2 border-dashed border-gray-400
        rounded-2xl
      "
    >
      <img />
      <p>沒有圖片</p>
    </div>

    <!-- ep. meta info -->

    <div class="flex flex-col items-start justify-end">
      <h2 class="text-lg font-bold">ep. name</h2>
      <p class="text-sm">ep. date</p>
      <p class="text-sm">ep. duration</p>
      <p class="text-sm">ep. description</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
</script>
