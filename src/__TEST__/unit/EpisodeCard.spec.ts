import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import { describe, expect, beforeEach, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { routes } from '/@/router';
import EpisodeCardVue from '/@/pages/Home/EpisodeCard.vue';
import { useComponentMock } from '../../util/utils';

describe('Header.vue', () => {
  const router = createRouterMock({
    // mock vue-router with real routes
    routes: routes,
  });
  beforeEach(() => {
    injectRouterMock(router);
  });

  it('has route', async () => {
    const wrapper = mount(EpisodeCardVue);
    expect(wrapper.vm.$router).toBe(router);
  });

  it('routing to episode page after clicking Card', async () => {
    const { propsConstructor } =
      useComponentMock<InstanceType<typeof EpisodeCardVue>>();

    const props = propsConstructor({ value: { title: 'test', guid: 'eeee' } });

    const wrapper = mount(EpisodeCardVue);
    const headerElement = wrapper.get('[data-test="episode-card"]');
    await headerElement.trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'episode',
        params: { guid: props.value.guid },
      }),
    );
  });
});
