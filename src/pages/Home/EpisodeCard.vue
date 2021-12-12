<template>
  <div
    ref="cardElement"
    class="flex flex-row gap-4 rounded-2xl p-2 cursor-pointer shadow-md hover:shadow-lg"
    data-test="episode-card"
    @click="routeToEpisodePage"
  >
    <!-- ep. image -->
    <div
      class="w-1/3 lg:max-w-30 min-w-20 flex flex-row justify-center items-center rounded-2xl"
    >
      <img
        v-if="props.value?.itunes?.image && imageLoadFlag"
        class="object-center object-cover"
        :src="imageLoadFlag && props.value.itunes.image"
      />
      <p v-else>沒有圖片</p>
    </div>

    <!-- ep. meta info -->
    <div
      class="flex flex-col items-start justify-center hover:(underline underline-2 underline-blue-400 underline-offset-2)"
    >
      <h2 class="lg:text-2xl text-lg font-bold">
        {{ props.value?.title }}
      </h2>
      <p class="text-sm">{{ pubDate }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import type { PodcastChannel } from '/@/model/channel';
import type { SetRequired } from 'type-fest';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
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

const pubDate = computed(() => {
  if (!props.value?.isoDate) return;

  return format(new Date(props.value.isoDate), 'yyyy年MM月dd日 hh:mm', {
    locale: zhTW,
  });
});
</script>
