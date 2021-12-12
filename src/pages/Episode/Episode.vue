<template>
  <div class="container mx-auto flex flex-col py-4 px-4">
    <!-- ep. header -->
    <div class="flex flex-row flex-wrap gap-4 justify-between">
      <div class="flex flex-row flex-warp gap-4 lg:w-5/6">
        <!-- ep image -->
        <div
          class="
            w-3/5
            lg:(w-2/5
            min-h-100)
            flex flex-row
            justify-center
            items-center
            border-2 border-gray-300 border-dashed
            rounded-lg
          "
          data-test="episode-image"
        >
          <img v-if="episode?.itunes.image" :src="episode?.itunes.image" />
          <p v-else>沒有圖片</p>
        </div>

        <!-- ep meta info -->
        <div
          class="flex flex-col justify-end items-start"
          data-test="episode-meta"
        >
          <h2
            class="
              my-2
              text-2xl
              font-bold
              underline underline-blue-400 underline-offset-4 underline-4
            "
          >
            {{ episode?.title }}
          </h2>
          <p class="text-sm">{{ formatPubDate }}</p>
          <p class="text-sm">{{ episode?.itunes.duration }}</p>
        </div>
      </div>

      <!-- ep. play button -->
      <div class="flex flex-col justify-end">
        <button
          v-motion-pop
          class="
            border-1 border-gray-200
            pt-4
            pb-4
            px-6
            rounded-3xl
            text-5xl
            shadow-md
            hover:shadow-lg
            active:shadow-sm
          "
          data-test="episode-play"
          @click="podcastPlayer.play(episode?.guid)"
        >
          Play
        </button>
      </div>
    </div>

    <!-- ep. description -->
    <div class="flex flex-col">
      <h2 class="text-4xl my-4">Episode Description</h2>
      <div v-html="episode?.['content:encoded']"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRef } from 'vue';
import { usePodcastPlayer } from '/@/plugin/PodcastPlayer';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

const props = defineProps<{ guid: string }>();

const podcastPlayer = usePodcastPlayer();

const podcastChannelStore = usePodcastChannelStore();

const episode = computed(() => {
  return podcastChannelStore.channel?.items.find(
    e => e.guid == toRef(props, 'guid').value,
  );
});

const formatPubDate = computed(() => {
  if (episode.value) {
    return format(new Date(episode.value?.pubDate), 'yyy年MM月d日', {
      locale: zhTW,
    });
  } else {
    return '';
  }
});
</script>
