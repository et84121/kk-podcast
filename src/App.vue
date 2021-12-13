<template>
  <Header></Header>
  <div :class="{ 'pb-20': playerVisbility }">
    <router-view />
  </div>

  <BottomPlayer v-model:player-visbility="playerVisbility"></BottomPlayer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePodcastChannelStore } from './store/podcastChannelStore';
const podcastChannelStore = usePodcastChannelStore();
// load rss feed
podcastChannelStore.load();

const playerVisbility = ref(false);
</script>
