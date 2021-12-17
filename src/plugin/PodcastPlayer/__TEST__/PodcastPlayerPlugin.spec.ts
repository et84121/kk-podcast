import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';
import { initPodcastPlayer } from '../initPodcastPlayer';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import {
  episodeFactory,
  podcastChannelFactory,
} from '/@/__TEST__/unit/mock/mockDataFactory';

function factory() {
  let audioEl: HTMLAudioElement | undefined = undefined;

  const backupAudio = window.Audio;
  // eslint-disable-next-line no-global-assign
  window.Audio = jest.fn(val => {
    const el = new backupAudio(val);
    audioEl = el;
    return el;
  });

  window.HTMLMediaElement.prototype.play = jest.fn();
  window.HTMLMediaElement.prototype.pause = jest.fn();

  const pinia = createTestingPinia();

  const store = usePodcastChannelStore();

  const player = initPodcastPlayer(store);

  // inject fake data

  const mockData = podcastChannelFactory.buildSync({
    items: episodeFactory.batchSync(3),
  });

  const mockEpisodes = mockData.items;

  store.channel = mockData;

  return {
    store,
    player,
    mockData,
    mockEpisodes,
    audioEl: (audioEl as unknown) as HTMLAudioElement,
  };
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

  describe('playing first episode', () => {
    const { store, player, mockEpisodes, audioEl } = factory();

    const episodeIndex = 0;

    player.play(mockEpisodes[episodeIndex].guid);

    audioEl.dispatchEvent(new window.Event('play', { bubbles: true }));
    it('should have right episode meta && guid', async () => {
      await nextTick();

      expect(player.EpisodeGuid.value).toBe(mockEpisodes[episodeIndex].guid);
      expect(player.EpisodeMeta.value).toEqual(mockEpisodes[episodeIndex]);
    });

    it('should have right src', async () => {
      await nextTick();

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const punycode = require('punycode');

      const url = punycode.toASCII(
        new URL(mockEpisodes[episodeIndex].enclosure.url).hostname,
      );

      expect(audioEl.src).toContain(url);
    });

    it('should trigger audioEl.play()', async () => {
      await nextTick();

      expect(window.HTMLAudioElement.prototype.play).toBeCalled();
    });

    it('status.playing should true', async () => {
      await nextTick();

      expect(player.status.value.playing).toBeTruthy;
    });

    it('player.currentTime', async () => {
      const newTime = 3;

      player.currentTime.value = newTime;

      await nextTick();

      expect(audioEl.currentTime).toBe(newTime);
    });
  });

  describe('should play next episode at ended event', () => {
    const { store, player, mockEpisodes, audioEl } = factory();

    const episodeIndex = 0;

    player.play(mockEpisodes[episodeIndex].guid);

    audioEl.dispatchEvent(new window.Event('play', { bubbles: true }));

    audioEl.dispatchEvent(new window.Event('ended', { bubbles: true }));

    it('should have next episode meta && guid', async () => {
      await nextTick();

      expect(player.EpisodeGuid.value).toBe(
        mockEpisodes[episodeIndex + 1].guid,
      );
      expect(player.EpisodeMeta.value).toEqual(mockEpisodes[episodeIndex + 1]);
    });

    it('should have next episode src', async () => {
      await nextTick();

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const punycode = require('punycode');

      const url = punycode.toASCII(
        new URL(mockEpisodes[episodeIndex + 1].enclosure.url).hostname,
      );

      expect(audioEl.src).toContain(url);
    });

    it('should trigger audioEl.play() after canplaythrough event', async () => {
      audioEl.dispatchEvent(
        new window.Event('canplaythrough', { bubbles: true }),
      );

      await nextTick();

      expect(window.HTMLAudioElement.prototype.play).toBeCalled();
    });
  });

  describe('should stop playing if have no next episode', () => {
    const { store, player, mockEpisodes, audioEl } = factory();

    const episodeIndex = 2;

    player.play(mockEpisodes[episodeIndex].guid);

    audioEl.dispatchEvent(new window.Event('play', { bubbles: true }));

    audioEl.dispatchEvent(new window.Event('ended', { bubbles: true }));

    it('should have current episode meta && guid', async () => {
      await nextTick();

      expect(player.EpisodeGuid.value).toBe(mockEpisodes[episodeIndex].guid);
      expect(player.EpisodeMeta.value).toEqual(mockEpisodes[episodeIndex]);
    });

    it('should have next episode src', async () => {
      await nextTick();

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const punycode = require('punycode');

      const url = punycode.toASCII(
        new URL(mockEpisodes[episodeIndex].enclosure.url).hostname,
      );

      expect(audioEl.src).toContain(url);
    });
  });
});
