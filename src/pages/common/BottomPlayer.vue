<template>
  <div
    class="
      fixed
      bottom-0
      w-full
      flex flex-row
      justify-start
      items-center
      gap-2
      px-16
      pt-6
      pb-4
      bg-white
    "
    :class="{
      hidden: !visbility,
    }"
  >
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range -->
    <div class="absolute -top-2 right-0 left-0 w-full flex flex-row">
      <p class="mx-2 whitespace-nowrap w-15 text-center">
        {{
          formatDuration(
            { minutes: 0, seconds: Math.round(currentTime) },
            { locale: zhTW },
          ) || '0'
        }}
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
      <p class="mx-2 w-15 text-center">{{ Math.round(duration) }}</p>
    </div>

    <button
      v-if="status.playing"
      class="playerButton"
      data-test="soundplayer-controller-pause"
      :disabled="!playable"
      @click="pause()"
    >
      Pause
    </button>

    <button
      v-else
      class="playerButton"
      data-test="soundplayer-controller-play"
      :disabled="!playable"
      @click="play()"
    >
      Play
    </button>

    <div
      v-if="episode"
      data-test="soundplayer-state-info"
      class="text-lg flex flex-row flex-wrap gap-4"
    >
      <p>Now Playing...</p>
      <p>
        <router-link :to="{ name: 'episode', params: { guid: episode.guid } }">
          {{ episode.title }}
        </router-link>
      </p>
    </div>

    <p v-else>請選擇集數</p>
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
  @apply rounded-full border border-black border-2 w-20 h-10  disabled:(text-gray-400 border-gray-500 ) hover:();
}
</style>
