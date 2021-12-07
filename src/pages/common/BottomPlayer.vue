<template>
  <div
    class="
      fixed
      bottom-0
      w-full
      flex flex-row
      justify-start
      items-center
      gap-2
      px-16
      py-4
    "
  >
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range -->
    <input
      class="absolute -top-2 right-0 left-0 w-full"
      type="range"
      min="0"
      max="100"
      step="any"
    />

    <button class="rounded-full border border-black border-4 w-10 h-10">
      II
    </button>

    <p class="text-lg">Now Playing... Ep. Name</p>
  </div>
</template>

<script setup lang="ts"></script>
