import { describe, expect, beforeEach, it, test, jest } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import { routes } from '/@/router';
import { createTestingPinia } from '@pinia/testing';
import EpisodeVue from '/@/pages/Episode/Episode.vue';
import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import { episodeFactory, podcastChannelFactory } from './mockDataFactory';
import { podcastPlayerPlugin, usePodcastPlayer } from '/@/plugin/PodcastPlayer';
import { RouterLink } from 'vue-router';

function factory() {
  jest.mock('/@/plugin/PodcastPlayer');

  const motionSlideBottom = jest.fn();

  const episodes = episodeFactory.batchSync(3);

  const episode = episodes[0];

  const wrapper = mount(EpisodeVue, {
    props: { guid: episodes[0].guid },
    global: {
      plugins: [createTestingPinia(), podcastPlayerPlugin],
      components: { 'router-link': RouterLink },
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

  it('image', async () => {
    const { wrapper, episode } = factory();

    expect(
      wrapper.find("[data-test='episode-image']").find('img').attributes('src'),
    ).toBe(episode.itunes.image);
  });

  it('episode-play', async () => {
    const { wrapper, episode, podcastPlayer } = factory();

    const playButton = wrapper.find("[data-test='episode-play']");

    await playButton.trigger('click');

    expect(podcastPlayer.play).toBeCalledWith(episode.guid);
  });
});
