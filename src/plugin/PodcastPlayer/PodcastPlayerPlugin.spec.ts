import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { initPodcastPlayer } from './initPodcastPlayer';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import { podcastChannelFactory } from '/@/__TEST__/unit/mock/mockDataFactory';

function factory() {
  const pinia = createTestingPinia();

  const store = usePodcastChannelStore();

  const player = initPodcastPlayer(store);

  // inject fake data

  const mockData = podcastChannelFactory.buildSync();

  const mockEpisodes = mockData.items;

  store.channel = mockData;

  return { store, player, mockData, mockEpisodes };
}

describe('PodcastPlayer Plugin', () => {
  describe('stop state ', () => {
    const { store, player, mockData } = factory();

    it('player.state check', async () => {
      await nextTick();

      expect(player.status.value).toEqual({
        playing: false,
        ended: false,
        waiting: false,
        seeking: false,
        stalled: false,
      });
    });

    it('player.EpisodeGuid should be undefined', async () => {
      await nextTick();
      expect(player.EpisodeGuid.value).toBeUndefined();
    });

    it('player.EpisodeMeta should be undefined', async () => {
      await nextTick();
      expect(player.EpisodeMeta.value).toBeUndefined();
    });
  });

  describe('playing specify episode', () => {
    const { store, player, mockEpisodes } = factory();

    const episodeIndex = 0;

    const guid = mockEpisodes[episodeIndex].guid;

    player.play(guid);

    it('check episode meta && guid', async () => {
      await nextTick();

      expect(player.EpisodeGuid.value).toBe(guid);
      expect(player.EpisodeMeta.value).toEqual(mockEpisodes[episodeIndex]);
    });
  });
});
