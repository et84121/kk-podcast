<template>
  <div v-if="visbility" v-motion-slide-bottom class="bottom-player">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range -->
    <div class="absolute top-2 right-0 left-0 w-full flex flex-row">
      <p class="mx-2 whitespace-nowrap w-15 text-center">
        {{ Math.round(currentTime) + '秒' || '0' }}
      </p>
      <input
        v-model="currentTime"
        class="w-full"
        type="range"
        min="0"
        :max="duration"
        step="any"
        data-test="soundplayer-seek-bar"
      />
      <p class="mx-2 w-15 text-center whitespace-nowrap">
        {{ Math.round(duration) - Math.round(currentTime) + '秒' }}
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div
        v-if="episode"
        data-test="soundplayer-state-info"
        class="text-lg flex flex-row flex-wrap gap-4"
      >
        <p>現正播放...</p>
        <p>
          <router-link
            :to="{ name: 'episode', params: { guid: episode.guid } }"
          >
            {{ episode.title }}
          </router-link>
        </p>
      </div>

      <p v-else>請選擇集數</p>

      <div class="flex flex-row justify-center">
        <button
          v-if="status.playing"
          class="playerButton"
          data-test="soundplayer-controller-pause"
          :disabled="!playable"
          @click="pause()"
        >
          <span
            class="iconify-inline"
            data-icon="bi:pause"
            data-width="32"
          ></span>
          Pause
        </button>

        <button
          v-else
          class="playerButton"
          data-test="soundplayer-controller-play"
          :disabled="!playable"
          @click="play()"
        >
          <span
            class="iconify-inline"
            data-icon="bi:play-fill"
            data-width="32"
          ></span>
          Play
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePodcastPlayer } from '/@/plugin/PodcastPlayer';
import { computed, ref, watch } from 'vue';
import { formatDuration } from 'date-fns';
import { zhTW } from 'date-fns/locale';

const props = withDefaults(defineProps<{ visbility?: boolean }>(), {
  visbility: true,
});

const emit = defineEmits<{ (e: 'update:visbility', value: boolean): void }>();

const visbility = computed({
  get: () => props.visbility,
  set: val => emit('update:visbility', val),
});

const podcastPlayer = usePodcastPlayer();

const { currentTime, duration, play, pause, status } = podcastPlayer;

const episode = podcastPlayer.EpisodeMeta;

const playable = computed(() => {
  return Boolean(episode.value);
});

watch(
  playable,
  newVal => {
    if (newVal) visbility.value = true;
    else visbility.value = false;
  },
  { immediate: true },
);
</script>

<style>
.playerButton {
  @apply rounded-full shadow-lg  border border-1 border-gray-200  w-30 h-10 px-4 flex flex-row justify-around items-center  disabled:(text-gray-400 border-gray-500 ) hover:(bg-gray-200);
}

.bottom-player {
  @apply fixed bottom-0 w-full flex flex-row justify-center items-center gap-2 px-16 pt-8 pb-4  bg-white rounded-lg;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}
</style>
