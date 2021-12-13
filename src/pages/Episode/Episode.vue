<template>
  <div class="container mx-auto flex flex-col py-4 px-4">
    <!-- ep. header -->
    <div
      class="flex flex-row flex-wrap gap-4 md:justify-between justify-center"
    >
      <div
        v-motion-slide-bottom
        class="flex flex-row flex-wrap justify-center gap-4 lg:(w-6/7 justify-start)"
      >
        <!-- ep image -->
        <div
          class="w-full sm:w-3/5 min-w-30 lg:(w-2/5 min-h-100) flex flex-row justify-center items-center shadow-lg rounded-lg"
          data-test="episode-image"
          @click="router.push({ name: 'home' })"
        >
          <img
            v-if="episode?.itunes.image"
            :src="episode?.itunes.image"
            class="rounded-lg"
          />
          <p v-else>沒有圖片</p>
        </div>

        <!-- ep meta info -->
        <div
          class="flex flex-col justify-center items-center sm:(flex-row flex-wrap justify-center items-end) pb-4 gap-8"
          data-test="episode-meta"
        >
          <div class="flex flex-col">
            <h2
              class="my-2 text-4xl font-bold underline underline-blue-400 underline-offset-4 underline-4"
            >
              {{ episode?.title }}
            </h2>
            <p class="text-lg">{{ formatPubDate }}</p>
            <p class="text-sm">{{ `共 ${episode?.itunes.duration} 秒` }}</p>
          </div>
          <button
            class="border-1 border-gray-200 my-4 pt-4 pb-4 px-6 flex flex-row rounded-3xl text-5xl shadow-md hover:shadow-lg active:(shadow-sm ring-transparent)"
            data-test="episode-play"
            @click="podcastPlayer.play(episode?.guid)"
          >
            <span class="iconify" data-icon="bi:play-fill"></span>
            <p class="text-4xl">Play</p>
          </button>
        </div>
      </div>

      <!--  button -->
      <div class="flex flex-col gap-4 justify-end">
        <button
          class="py-2 px-2 border-1 border-gray-200"
          data-test="episode-go-home"
          @click="router.push({ name: 'home' })"
        >
          查看全部集數
        </button>
      </div>
    </div>

    <!-- ep. description -->
    <div v-motion-slide-bottom class="flex flex-col">
      <h2 class="text-4xl my-8">本集內容</h2>
      <div v-html="episode?.['content:encoded']"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, toRef } from 'vue';
import { usePodcastPlayer } from '/@/plugin/PodcastPlayer';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';

const props = defineProps<{ guid: string }>();

const router = useRouter();

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
