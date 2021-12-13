import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { routes } from '/@/router';
import EpisodeCardVue from '/@/pages/Home/EpisodeCard.vue';
import { useComponentMock } from '/@/util/utils';
import { episodeFactory } from './mock/mockDataFactory';

function factory() {
  const episode = episodeFactory.buildSync();

  const { propsConstructor } = useComponentMock<
    InstanceType<typeof EpisodeCardVue>
  >();

  const props = propsConstructor({ value: episode });

  const wrapper = mount(EpisodeCardVue, { props });

  return { wrapper, episode, propsConstructor };
}

describe('Header.vue', () => {
  const router = createRouterMock({
    // mock vue-router with real routes
    routes: routes,
  });
  beforeEach(() => {
    injectRouterMock(router);
  });

  it('has route', async () => {
    const { wrapper, episode } = factory();
    expect(wrapper.vm.$router).toBe(router);
  });

  it('routing to episode page after clicking Card', async () => {
    const { wrapper, episode } = factory();

    const headerElement = wrapper.find('[data-test="episode-card"]');

    expect(headerElement.exists()).toBe(true);

    await headerElement.trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
      name: 'episode',
      params: { guid: episode.guid },
    });
  });

  it('no image', async () => {
    const { wrapper, episode, propsConstructor } = factory();

    const noImagePros = propsConstructor({
      value: { guid: 'test', title: 'test' },
    });

    await wrapper.setProps(noImagePros);

    expect(wrapper.html()).toContain('沒有圖片');
  });

  it('lazyload image', async () => {
    const { wrapper, episode } = factory();

    jest.mock('/@/composable/useLazyLoad', () => {
      return jest.fn().mockImplementationOnce(() => true);
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('img').exists()).toBeTruthy();
  });

  it('no pubDate', async () => {
    const { wrapper, episode, propsConstructor } = factory();

    const noPubDatePros = propsConstructor({
      value: { guid: 'test', title: 'test' },
    });

    await wrapper.setProps(noPubDatePros);

    expect(wrapper.find('[data-test="episode-card-pubDate"]').text()).toBe('');
  });

  it('have pubDate', async () => {
    const { wrapper } = factory();

    expect(
      wrapper.find('[data-test="episode-card-pubDate"]').text(),
    ).toBeTruthy();
  });
});
