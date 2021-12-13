import { describe, expect, beforeEach, it, test } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { podcastChannelFactory } from './mock/mockDataFactory';
import ChannelIntroVue from '/@/pages/Home/ChannelIntro.vue';
import { useComponentMock } from '/@/util/utils';

describe('ChannelIntro.vue', () => {
  it('when pass normal props, should have all element. [image,title,author,description]', async () => {
    const { propsConstructor } = useComponentMock<
      InstanceType<typeof ChannelIntroVue>
    >();

    const props = propsConstructor({
      value: podcastChannelFactory.buildSync(),
    });

    const wrapper = mount(ChannelIntroVue, {
      props,
    });

    expect(wrapper.find("[data-test='channel-image']").exists()).toBeTruthy();
    expect(
      wrapper.find("[data-test='channel-image-fallback']").exists(),
    ).toBeFalsy();

    expect(wrapper.find("[data-test='channel-name']").text()).toBe(
      props.value.title,
    );

    expect(wrapper.find("[data-test='channel-author']").text()).toBe(
      props.value.itunes.author,
    );

    expect(wrapper.find("[data-test='channel-description']").text()).toBe(
      props.value.description,
    );
  });

  it('pass empty props', async () => {
    const wrapper = mount(ChannelIntroVue);

    expect(wrapper.find("[data-test='channel-image']").exists()).toBeFalsy();
    expect(
      wrapper.find("[data-test='channel-image-fallback']").exists(),
    ).toBeTruthy();

    expect(wrapper.find("[data-test='channel-name']").text()).toBe('無名頻道');

    expect(wrapper.find("[data-test='channel-author']").exists()).toBeFalsy();

    expect(wrapper.find("[data-test='channel-link']").exists()).toBeFalsy();

    expect(
      wrapper.find("[data-test='channel-description']").exists(),
    ).toBeTruthy();
  });
});
