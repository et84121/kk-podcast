import { describe, expect, beforeEach, it, test } from '@jest/globals';
import { mount } from '@vue/test-utils';

import BottomPlayerVue from '/@/pages/common/BottomPlayer.vue';

describe('BottomPlayer.vue', () => {
  it('有一個 soundplayer-time-controller 元素', async () => {
    const wrapper = mount(BottomPlayerVue);

    expect(
      wrapper.find("[data-test='soundplayer-time-controller']"),
    ).toBeTruthy();
  });

  it('有一個 soundplayer-state-controller 元素', async () => {
    const wrapper = mount(BottomPlayerVue);

    expect(
      wrapper.find("[data-test='soundplayer-state-controller']"),
    ).toBeTruthy();
  });

  it('有一個 soundplayer-state-info 元素', async () => {
    const wrapper = mount(BottomPlayerVue);

    expect(wrapper.find("[data-test='soundplayer-state-info']")).toBeTruthy();
  });
});
