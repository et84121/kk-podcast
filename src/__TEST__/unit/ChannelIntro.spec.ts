import { describe, expect, beforeEach, it, test } from '@jest/globals';
import { mount } from '@vue/test-utils';
import type { Simplify } from 'type-fest';
import ChannelIntroVue from '/@/pages/Home/ChannelIntro.vue';

describe('ChannelIntro.vue', () => {
  it('when pass normal props, should have all element. [image,title,author,link,description]', async () => {
    type Props = Simplify<InstanceType<typeof ChannelIntroVue>['$props']>;

    function propsFactory<P extends Props>(o: P) {
      return o;
    }

    const props = propsFactory({
      value: {
        author: 'test-author',
        image: {
          link: 'test-image-link',
          title: 'test-image-title',
          url: 'test-image-url',
        },
        description: 'test-description',
        title: 'test-title',
        link: 'test-link',
      },
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
      props.value.author,
    );

    expect(wrapper.find("[data-test='channel-link']").attributes('href')).toBe(
      props.value.link,
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
    ).toBeFalsy();
  });
});
