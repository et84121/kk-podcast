import { createRouterMock, injectRouterMock } from 'vue-router-mock';
import { describe, expect, beforeEach, it } from '@jest/globals';
import { mount } from '@vue/test-utils';
import { routes } from '/@/router';
import HeaderVue from '/@/pages/common/Header.vue';

describe('Header.vue', () => {
  const router = createRouterMock({
    // mock vue-router with real routes
    routes: routes,
  });
  beforeEach(() => {
    injectRouterMock(router);
  });

  it('has on h1 tag', async () => {
    const wrapper = mount(HeaderVue);
    const headerElement = wrapper.get('[data-test="header"]');
    expect(headerElement.find('h1').exists()).toBeTruthy();
  });

  it('has route', async () => {
    const wrapper = mount(HeaderVue);
    expect(wrapper.vm.$router).toBe(router);
  });

  it('routing to home page after clicking element', async () => {
    const wrapper = mount(HeaderVue);
    const headerElement = wrapper.get('[data-test="header"]');
    await headerElement.trigger('click');

    expect(wrapper.vm.$router.push).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'home' }),
    );
  });
});
