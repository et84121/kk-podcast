<template>
  <div class="flex flex-row flex-wrap gap-4">
    <!-- channel image -->
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

    <!-- channel meta info -->
    <div class="flex flex-col justify-end items-start">
      <h2
        class="
          text-2xl
          font-bold
          underline underline-blue-400 underline-offset-2 underline-4
        "
      >
        Channel Name
      </h2>
      <p>Author</p>
      <a href="#">Link</a>
      <p class="">Channel Description</p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
