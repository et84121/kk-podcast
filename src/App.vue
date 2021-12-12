<template>
  <Header></Header>
  <router-view />

  <BottomPlayer></BottomPlayer>
</template>

<script lang="ts" setup>
import { usePodcastChannelStore } from './store/podcastChannelStore';
const podcastChannelStore = usePodcastChannelStore();
// load rss feed
podcastChannelStore.load();

</script>
