<template>
  <div
    ref="cardElement"
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
    data-test="episode-card"
    @click="routeToEpisodePage"
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
      <img
        v-if="props.value?.itunes?.image && imageLoadFlag"
        class="object-center object-cover"
        :src="imageLoadFlag && props.value.itunes.image"
      />
      <p v-else>沒有圖片</p>
    </div>

    <!-- ep. meta info -->
    <div class="flex flex-col items-start justify-center">
      <h2 class="text-2xl font-bold">{{ props.value?.title }}</h2>
      <p class="text-sm">{{ props.value?.isoDate }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import type { PodcastChannel } from '/@/type/channel';
import type { SetRequired } from 'type-fest';
import { useLazyLoad } from '/@/composable/useLazyLoad';

const cardElement = ref<Element>();

const router = useRouter();

type Episode = SetRequired<
  Partial<PodcastChannel['items'][number]>,
  'guid' | 'title'
>;

const props = defineProps<{ value?: Episode }>();

function routeToEpisodePage() {
  if (!props.value) {
    return;
  }

  router.push({ name: 'episode', params: { guid: props.value.guid } });
}

const imageLoadFlag = useLazyLoad(cardElement);
</script>
