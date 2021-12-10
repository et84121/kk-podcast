import type { createApp, InjectionKey, Ref } from 'vue';
import { inject, ref, readonly, watch, reactive, toRef } from 'vue';
import { useMediaControls } from '@vueuse/core';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import type { PodcastChannel } from '../type/channel';
import type { AsyncReturnType } from 'type-fest';

type Plugin = Parameters<ReturnType<typeof createApp>['use']>['0'];

function defindePlugin<T extends Plugin>(Plugin: T) {
  return Plugin;
}

const instanceOfPodcastPlayer: InjectionKey<
  ReturnType<typeof initPodcastPlayer>
> = Symbol('instanceOfPodcastPlayer');

/**
 * Podcast Player plugin
 */
export const podcastPlayer = defindePlugin({
  install: async (app, option) => {
    const instance = initPodcastPlayer();
    app.provide(instanceOfPodcastPlayer, instance);
  },
});

export function usePodcastPlayer(): ReturnType<typeof initPodcastPlayer> {
  const instance = inject(instanceOfPodcastPlayer);

  if (!instance) {
    throw new Error('Cannot get the instance of podcastPlayer');
  }

  return instance;
}

/**
 * Factory function for podcast player
 *
 * Rely on PodcastChannelStore to play podcast
 */
function initPodcastPlayer() {
  const PodcastStore = usePodcastChannelStore();

  if (!PodcastStore.channel) {
    // 沒資料先載入一次試試
    PodcastStore.load();
  }

  type EpisodeMeta = PodcastChannel['items'][number];

  let episodes = reactive<EpisodeMeta[]>([]);

  watch(
    PodcastStore.$state,
    newState => {
      if (newState.channel) {
        episodes = newState.channel.items;
      }
    },
    { immediate: true, deep: true },
  );

  const episodeIndex = ref(0);

  const audioElement = ref<HTMLAudioElement | undefined>(new Audio());

  let controls = useMediaControls(audioElement, {
    src: episodes[episodeIndex.value].enclosure.url,
  });
  const episodeGuid = ref(episodes[episodeIndex.value].guid);

  const episodeMeta = ref<EpisodeMeta>(episodes[episodeIndex.value]);

  watch(
    [episodeGuid, episodeIndex],
    ([newGuid, newIndex], [oldGuid, oldIndex]) => {
      let newEpisode: EpisodeMeta | undefined = undefined;

      // when new ep. GUID set
      if (newGuid !== oldGuid) {
        const newEpisodeIndex = episodes.findIndex(e => e.guid === newGuid);

        if (newEpisodeIndex === -1) {
          console.error('Cannot find the episode with new GUID');
          return;
        }

        episodeIndex.value = newEpisodeIndex;
        newEpisode = episodes[newEpisodeIndex];
      }
      // when new ep. Index set
      else if (newIndex !== oldIndex) {
        // new index inbound
        if (newIndex > 0 && newIndex < episodes.length) {
          episodeIndex.value = newIndex;
          newEpisode = episodes[newIndex];
          episodeGuid.value = newEpisode.guid;
        }
        // new index outbound
        else {
          // remain old value
          console.error('new episode index is outbound');
          episodeIndex.value = oldIndex;
          return;
        }
      }

      if (!newEpisode) {
        console.error("Can't find new episode with newIndex or newGuid");
        return;
      }

      episodeMeta.value = newEpisode;

      const newEpisodeUrl = newEpisode.enclosure.url;

      controls.playing.value;

      audioElement.value = new Audio();

      controls = useMediaControls(audioElement, { src: newEpisodeUrl });
    },
  );

  const autoNextFlag = ref(false);

  // when sound playing reach end, check autoNext flag to play or not play
  watch(toRef(controls, 'ended'), (newVal, oldVal) => {
    if (newVal && !oldVal && autoNextFlag) {
      // play next ep.
      next();
    }
  });

  const status = ref({
    playing: controls.playing,
    ended: controls.ended,
    waiting: controls.waiting,
    // seeking: controls.seeking,
    // stalled: controls.stalled,
  });

  controls.onSourceError(e => {
    console.error('SoundPlayer Error');
  });

  /**
   * 停止播放(播放進度歸零)
   */
  function stop() {
    controls.playing.value = false;
    controls.currentTime.value = 0;
  }

  /**
   * 播放
   * @param episodeGuid
   * @returns
   */
  function play(_episodeGuid?: string) {
    if (!_episodeGuid) {
      controls.playing.value = true;
      return;
    }
    episodeGuid.value = _episodeGuid;
    controls.playing.value = true;
  }

  function pause() {
    controls.playing.value = false;
  }

  function next() {
    episodeIndex.value += 1;
  }

  function previous() {
    episodeIndex.value -= 1;
  }

  return {
    /**
     * 播放狀態
     */
    status: readonly(status),
    /**
     * 播放源 guid
     */
    EpisodeGuid: readonly(episodeGuid),
    EpisodeMeta: readonly(episodeMeta),
    /**
     * The time of current playback (in seconds).
     */
    currentTime: toRef(controls, 'currentTime'),
    duration: toRef(controls, 'duration'),
    autoNextFlag,
    stop,
    play,
    pause,
    next,
    previous,
  };
}
