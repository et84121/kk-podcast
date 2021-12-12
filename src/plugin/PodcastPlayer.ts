import type { createApp, InjectionKey } from 'vue';
import { Ref, toRaw } from 'vue';
import { inject, ref, readonly, watch, reactive, toRef, nextTick } from 'vue';
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

  const audioElement = ref(new Audio());

  const controls = useMediaControls(audioElement);

  const episodeGuid = ref<string | undefined>();

  const episodeMeta = ref<EpisodeMeta | undefined>();

  const autoNextEpisodeFlag = ref(true);

  audioElement.value.addEventListener('canplaythrough', () => {
    if (autoNextEpisodeFlag.value) {
      audioElement.value.play();
    }
  });

  watch(
    [episodeGuid, episodeIndex],
    ([newGuid, newIndex], [oldGuid, oldIndex]) => {
      let newEpisode: EpisodeMeta | undefined = undefined;

      // when new episode GUID set
      if (newGuid !== oldGuid) {
        const newEpisodeIndex = episodes.findIndex(e => e.guid === newGuid);

        if (newEpisodeIndex === -1) {
          console.error('Cannot find the episode with new GUID');
          return;
        }

        episodeIndex.value = newEpisodeIndex;
        newEpisode = episodes[newEpisodeIndex];
      }
      // when new episode index set
      else if (newIndex !== oldIndex) {
        // new index inbound
        if (newIndex > 0 && newIndex < episodes.length) {
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

      audioElement.value.src = newEpisodeUrl;
    },
  );

  watch(controls.ended, (newVal, oldVal) => {
    if (newVal && autoNextEpisodeFlag) {
      // play next ep.
      next();
      controls.ended.value = false;
    }
  });

  const status = ref({
    /**
     * The playing event is fired after playback is first started, and whenever it is restarted. For example it is fired when playback resumes after having been paused or delayed due to lack of data.
     */
    playing: controls.playing,
    /**
     * The ended event is fired when playback or streaming has stopped because the end of the media was reached or because no further data is available.
     */
    ended: controls.ended,
    /**
     * The waiting event is fired when playback has stopped because of a temporary lack of data.
     */
    waiting: controls.waiting,
    /**
     * The seeking event is fired when a seek operation starts, meaning the Boolean seeking attribute has changed to true and the media is seeking a new position.
     */
    seeking: controls.seeking,
    /**
     * The stalled event is fired when the user agent is trying to fetch media data, but data is unexpectedly not forthcoming.
     */
    stalled: controls.stalled,
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
    if (_episodeGuid) {
      episodeGuid.value = _episodeGuid;
    }

    controls.playing.value = true;
  }

  function pause() {
    controls.playing.value = false;
  }

  function next() {
    const newIndex = episodeIndex.value + 1;

    if (newIndex >= episodes.length || newIndex < 0) {
      return;
    }

    episodeIndex.value = newIndex;
  }

  function previous() {
    const newIndex = episodeIndex.value - 1;

    if (newIndex >= episodes.length || newIndex < 0) {
      return;
    }

    episodeIndex.value = newIndex;
  }

  return {
    /**
     * Player status
     */
    status: readonly(status),
    /**
     * Episode GUID
     */
    EpisodeGuid: readonly(episodeGuid),
    /**
     * Current episode meta data
     */
    EpisodeMeta: readonly(episodeMeta),
    /**
     * The time of current playback (in seconds).
     */
    currentTime: toRef(controls, 'currentTime'),
    /**
     * The duration of the current media (in seconds).
     */
    duration: toRef(controls, 'duration'),
    /**
     * auto continue to next episode
     */
    autoNextEpisodeFlag,
    /**
     * Stop the player
     */
    stop,
    /**
     * Play the episode (with GUID)
     */
    play,
    /**
     * Pause the audio
     */
    pause,
    /**
     * Play next episode
     */
    next,
    /**
     * Play previous episode
     */
    previous,
  };
}
