<template>
  <div class="container mx-auto flex flex-col gap-4 py-4 px-4">
    <ChannelIntro :value="podcastChannelStore.channel"></ChannelIntro>

    <div class="flex flex-col gap-4">
      <EpisodeCard v-for="(ep, index) in Episodes" :key="index" :value="ep">
      </EpisodeCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChannelIntro from './ChannelIntro.vue';
import EpisodeCard from './EpisodeCard.vue';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';

const podcastChannelStore = usePodcastChannelStore();

const Episodes = podcastChannelStore.channel?.items;
</script>
