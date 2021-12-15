import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { mount } from '@vue/test-utils';

import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import { episodeFactory, podcastChannelFactory } from './mock/mockDataFactory';
import {
  createTestingPodcastPlayer,
  usePodcastPlayer,
} from '/@/plugin/PodcastPlayer';
import { createRouterMock, getRouter, injectRouterMock } from 'vue-router-mock';
import { routes } from '/@/router';
import { createTestingPinia } from '@pinia/testing';
import { nextTick } from 'vue';

import BottomPlayerVue from '/@/pages/common/BottomPlayer.vue';
import { RouterLink } from 'vue-router';

function factory() {
  // @vueuse/motion mock
  const motionSlideBottom = jest.fn();

  // mock data
  const episodes = episodeFactory.batchSync(3);

  const episode = episodes[0];

  // component wrapper
  const wrapper = mount(BottomPlayerVue, {
    global: {
      plugins: [createTestingPinia(), createTestingPodcastPlayer()],
      directives: {
        'motion-slide-bottom': motionSlideBottom,
      },
      stubs: {
        RouterLink: RouterLink,
      },
    },
  });

  // pinia store
  const store = usePodcastChannelStore();

  // store inject data
  store.channel = podcastChannelFactory.buildSync({
    items: episodes,
  });

  // podcastPlayer
  const podcastPlayer = usePodcastPlayer();

  return { wrapper, episode, podcastPlayer, store };
}

describe('BottomPlayer.vue', () => {
  const router = createRouterMock({
    // mock vue-router with real routes
    routes: routes,
  });
  beforeEach(() => {
    injectRouterMock(router);
  });

  it('Player visbility test', async () => {
    const { wrapper } = factory();

    // make component unvisible
    wrapper.setProps({ visbility: false });

    await wrapper.vm.$nextTick();

    let bottomPlayer = wrapper.find("[data-test='bottom-player']");

    expect(bottomPlayer.exists()).toBeFalsy();

    // make component visible
    wrapper.setProps({ visbility: true });

    await wrapper.vm.$nextTick();

    bottomPlayer = wrapper.find("[data-test='bottom-player']");

    expect(bottomPlayer.exists()).toBeTruthy();
  });

  it('update:visbility event test', async () => {
    const { wrapper, episode, podcastPlayer, store } = factory();

    // make podcastPlayer play specify episode
    podcastPlayer.play(episode.guid);

    await nextTick();

    expect(wrapper.emitted()['update:visbility'][0]).toEqual([false]);
    expect(wrapper.emitted()['update:visbility'][1]).toEqual([true]);
  });

  it('stop state while podcastPlay is not playing any episode', async () => {
    const { wrapper, episode, podcastPlayer, store } = factory();

    wrapper.setProps({ visbility: true });

    await nextTick();

    expect(wrapper.html()).toContain('請選擇集數');

    let playButton = wrapper.find('[data-test="soundplayer-controller-play"]');

    expect(playButton.exists()).toBeTruthy();

    expect(playButton.attributes('disabled')).toEqual('');

    // make podcastPlayer play specify episode
    podcastPlayer.play(episode.guid);
    podcastPlayer.pause();

    await nextTick();

    playButton = wrapper.find('[data-test="soundplayer-controller-play"]');

    await playButton.trigger('click');

    expect(playButton.attributes('disabled')).toBeUndefined();

    expect(podcastPlayer.play).toBeCalledTimes(2);
  });

  describe('playing state while podcastPlay is playing a episode', () => {
    it('info block', async () => {
      const { wrapper, episode, podcastPlayer, store } = factory();

      podcastPlayer.play(episode.guid);

      wrapper.setProps({ visbility: true });

      await nextTick();

      const infoBlock = wrapper.find('[data-test="soundplayer-state-info"]');

      expect(infoBlock.find('a').attributes('href')).toEqual(
        `/episode/${episode.guid}`,
      );
    });

    it('pause button', async () => {
      const { wrapper, episode, podcastPlayer, store } = factory();

      podcastPlayer.play(episode.guid);

      wrapper.setProps({ visbility: true });

      await nextTick();

      const pauseButton = wrapper.find(
        '[data-test="soundplayer-controller-pause"]',
      );

      expect(pauseButton.exists()).toBeTruthy();

      expect(pauseButton.attributes('disabled')).toBeUndefined();

      await pauseButton.trigger('click');

      expect(podcastPlayer.pause).toBeCalled();
    });

    it('time seeker', async () => {
      const { wrapper, episode, podcastPlayer, store } = factory();

      podcastPlayer.play(episode.guid);

      podcastPlayer.duration.value = 30;

      wrapper.setProps({ visbility: true });

      await nextTick();

      const seekBar = wrapper.find('input');

      expect(seekBar.exists()).toBeTruthy();

      await seekBar.setValue(2);

      const currentTime = wrapper.find(
        '[data-test="soundplayer-current-time"]',
      );

      expect(currentTime.text()).toBe('2秒');
    });
  });
});
