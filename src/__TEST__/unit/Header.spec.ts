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

  it('有一個 h1 元素', async () => {
    const wrapper = mount(HeaderVue);
    const headerElement = wrapper.get('[data-test="header"]');
    expect(headerElement.html()).toContain('</h1>');
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
