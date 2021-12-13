import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { shallowMount } from '@vue/test-utils';

import { usePodcastChannelStore } from '/@/store/podcastChannelStore';
import { episodeFactory, podcastChannelFactory } from './mock/mockDataFactory';
import { createTestingPinia } from '@pinia/testing';
import IndexVue from '/@/pages/Home/Index.vue';

const numberOfEpisode = 3;

function factory() {
  // mock data
  const episodes = episodeFactory.batchSync(numberOfEpisode);

  const episode = episodes[0];

  // component wrapper
  const wrapper = shallowMount(IndexVue, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  // pinia store
  const store = usePodcastChannelStore();

  // store inject data
  store.channel = podcastChannelFactory.buildSync({
    items: episodes,
  });

  return { wrapper, episode, store };
}

describe('Index.vue', () => {
  it('has ChannelIntro', async () => {
    const { wrapper } = factory();

    await wrapper.vm.$nextTick();

    expect(wrapper.find('channel-intro-stub').exists()).toBeTruthy();
  });

  it('has correct number of Episode Card', async () => {
    const { wrapper } = factory();

    await wrapper.vm.$nextTick();

    expect(wrapper.findAll('episode-card-stub').length).toBe(numberOfEpisode);
  });
});
