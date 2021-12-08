import { describe, expect, beforeEach, it, test } from '@jest/globals';
import { mount } from '@vue/test-utils';
import EpisodeVue from '/@/pages/Episode/Episode.vue';

describe('Header.vue', () => {
  it('有一個 episode-image 元素', async () => {
    const wrapper = mount(EpisodeVue);

    expect(wrapper.find("[data-test='episode-image']")).toBeTruthy();
  });

  it('有一個 episode-meta 元素', async () => {
    const wrapper = mount(EpisodeVue);

    expect(wrapper.find("[data-test='episode-meta']")).toBeTruthy();
  });

  it('有一個 episode-play 元素', async () => {
    const wrapper = mount(EpisodeVue);

    expect(wrapper.find("[data-test='episode-play']")).toBeTruthy();
  });
});
