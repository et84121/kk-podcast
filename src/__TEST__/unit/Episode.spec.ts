import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import { routes } from '/@/router';
import { createTestingPinia } from '@pinia/testing';
import EpisodeVue from '/@/pages/Episode/Episode.vue';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import { episodeFactory, podcastChannelFactory } from './mock/mockDataFactory';
import { podcastPlayerPlugin, usePodcastPlayer } from '/@/plugin/PodcastPlayer';
import { nextTick } from 'vue';

function factory() {
  const motionSlideBottom = jest.fn();

  const episodes = episodeFactory.batchSync(3);

  const episode = episodes[0];

  const wrapper = mount(EpisodeVue, {
    props: { guid: episodes[0].guid },
    global: {
      plugins: [createTestingPinia(), podcastPlayerPlugin],
      directives: {
        'motion-slide-bottom': motionSlideBottom,
      },
    },
  });

  const store = usePodcastChannelStore();

  store.channel = podcastChannelFactory.buildSync({
    items: episodes,
  });

  const podcastPlayer = usePodcastPlayer();

  podcastPlayer.play = jest.fn();
  // jest.spyOn(podcastPlayer, 'play');

  return {
    wrapper,
    store,
    episodes,
    episode,
    podcastPlayer,
    motionSlideBottom,
  };
}

describe('Episode.vue', () => {
  const router = createRouterMock({
    // mock vue-router with real routes
    routes: routes,
  });
  beforeEach(() => {
    injectRouterMock(router);
  });

  it('has right episode image', async () => {
    const { wrapper, episode } = factory();

    const imgBlock = wrapper.find("[data-test='episode-image']");

    expect(imgBlock.exists()).toBeTruthy();

    // waiting computed properties change
    await nextTick();

    const img = imgBlock.find('img');

    expect(img.exists()).toBeTruthy();

    expect(img.attributes('src')).toBe(episode.itunes.image);
  });

  it('route to home page after clicking image', async () => {
    const { wrapper } = factory();

    const img = wrapper.find("[data-test='episode-image']");

    expect(img.exists()).toBeTruthy();

    await img.trigger('click');

    expect(wrapper.vm.$router.push).toBeCalledWith({ name: 'home' });
  });

  it('route to home page after clicking 查看全部集數', async () => {
    const { wrapper } = factory();

    const img = wrapper.find("[data-test='episode-go-home']");

    expect(img.exists()).toBeTruthy();

    await img.trigger('click');

    expect(wrapper.vm.$router.push).toBeCalledWith({ name: 'home' });
  });

  it('should trigger podcastPlayer play() after clicking episode play button', async () => {
    const { wrapper, episode, podcastPlayer } = factory();

    const playButton = wrapper.find("[data-test='episode-play']");

    expect(playButton.exists()).toBeTruthy();

    await playButton.trigger('click');

    expect(podcastPlayer.play).toBeCalledWith(episode.guid);
  });
});
