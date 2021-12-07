<template>
  <div class="container mx-auto flex flex-col gap-4 py-4">
    <ChannelIntro></ChannelIntro>

    <div class="flex flex-col gap-4">
      <EpisodeCard v-for="(ep, index) in new Array(3)" :key="index">
      </EpisodeCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChannelIntro from './ChannelIntro.vue';
import EpisodeCard from './EpisodeCard.vue';
</script>
