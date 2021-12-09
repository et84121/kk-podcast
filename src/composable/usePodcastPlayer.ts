import { ref, readonly, watch, reactive, toRef, toRaw } from 'vue';
import { useMediaControls } from '@vueuse/core';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import type { PodcastChannel } from '../type/channel';

/**
 * 依靠 PodcastChannelStore 播放 podcast
 */
export async function usePodcastPlayer() {
  const PodcastStore = usePodcastChannelStore();

  if (!PodcastStore.channel) {
    // 沒資料先載入一次試試
    await PodcastStore.load();

    // 還是沒資料就 return
    if (!PodcastStore.channel) {
      return;
    }
  }

  const episodes = PodcastStore.channel.items;

  const episodeIndex = ref(0);

  let controls = reactive(
    useMediaControls(new Audio(), {
      src: episodes[episodeIndex.value].enclosure.url,
    }),
  );

  const episodeGuid = ref(episodes[episodeIndex.value].guid);

  type EpisodeMeta = PodcastChannel['items'][number];
  const episodeMeta = ref<EpisodeMeta>();

  watch(
    [episodeGuid, episodeIndex],
    ([newGuid, newIndex], [oldGuid, oldIndex]) => {
      let newEpisode = undefined;

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

      controls = reactive(
        useMediaControls(new Audio(), { src: newEpisodeUrl }),
      );
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

  const status = reactive({
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
    controls.playing = false;
    controls.currentTime = 0;
  }

  /**
   * 播放
   * @param episodeGuid
   * @returns
   */
  function play(_episodeGuid?: string) {
    if (!_episodeGuid) {
      controls.playing = true;
      return;
    }
    episodeGuid.value = _episodeGuid;
    controls.playing = true;
  }

  function pause() {
    controls.playing = false;
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
    autoNextFlag,
    stop,
    play,
    pause,
    next,
    previous,
  };
}
