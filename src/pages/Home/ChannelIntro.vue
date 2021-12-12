<template>
  <div class="flex flex-row flex-wrap justify-around gap-4">
    <!-- channel image -->
    <div
      class="
        lg:w-2/5
        flex flex-row
        justify-center
        items-center
        border-2 border-gray-300 border-dashed
        rounded-lg
      "
    >
      <img
        v-if="props.value?.image"
        :src="props.value.image.url"
        :alt="props.value.image.title"
        class="object-center object-cover"
        data-test="channel-image"
      />
      <p v-else data-test="channel-image-fallback">沒有圖片</p>
    </div>

    <!-- channel meta info -->
    <div class="flex flex-col justify-end items-start gap-2 py-2 lg:w-4/7">
      <h2
        class="
          text-5xl
          font-bold
          underline underline-blue-400 underline-offset-2 underline-4
        "
        data-test="channel-name"
      >
        {{ props.value?.title || '無名頻道' }}
      </h2>
      <p
        v-if="props.value?.itunes.author"
        data-test="channel-author"
        class="text-3xl"
      >
        {{ props.value?.itunes.author }}
      </p>

      <div>
        <p
          v-for="(p, index) in props.value?.description.split('\n')"
          :key="index"
          class=""
          data-test="channel-description"
        >
          {{ p }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Except } from 'type-fest';
import type { PodcastChannel } from '/@/type/channel';

type ChannelIntro = Except<PodcastChannel, 'items'>;

const props = defineProps<{ value?: ChannelIntro }>();
</script>
