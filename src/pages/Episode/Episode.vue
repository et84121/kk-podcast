<template>
  <div class="container mx-auto flex flex-col py-4">
    <!-- ep. header -->
    <div class="flex flex-row flex-wrap gap-4 justify-between">
      <div class="flex flex-row flex-warp gap-4">
        <!-- ep image -->
        <div
          class="
            w-50
            h-50
            flex flex-row
            justify-center
            items-center
            border-2 border-gray-300 border-dashed
            rounded-lg
          "
        >
          <img />
          <p>沒有圖片</p>
        </div>

        <!-- ep meta info -->
        <div class="flex flex-col justify-end items-start">
          <h2
            class="
              my-2
              text-2xl
              font-bold
              underline underline-blue-400 underline-offset-4 underline-4
            "
          >
            Episode Name
          </h2>
          <p class="text-sm">ep. date</p>
          <p class="text-sm">ep. duration</p>
        </div>
      </div>

      <!-- ep. play button -->
      <div class="flex flex-col justify-end">
        <button class="border border-gray-500 py-2 px-4">play</button>
      </div>
    </div>

    <!-- ep. description -->
    <div class="flex flex-col">
      <h2 class="text-4xl my-4">Episode Description</h2>
      <p>ep. description</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
