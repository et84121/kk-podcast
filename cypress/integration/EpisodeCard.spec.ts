/* eslint-disable @typescript-eslint/ban-ts-comment */
import EpisodeCardVue from '../../src/pages/Home/EpisodeCard.vue';
import { useComponentMock } from '../../src/__TEST__/unit/mock/utils';
import { episodeFactory } from '../../src/__TEST__/unit/mock/mockDataFactory';

import { mount } from '@cypress/vue';
import { defineComponent } from 'vue';

function factory() {
  const episode = episodeFactory.buildSync();

  const { propsConstructor } = useComponentMock<
    InstanceType<typeof EpisodeCardVue>
  >();

  const props = propsConstructor({ value: episode });

  const wrapper = mount(defineComponent(EpisodeCardVue), {
    props,
  });

  return { wrapper, episode, propsConstructor };
}

describe('Header.vue', () => {
  // const router = createRouterMock({
  //   // mock vue-router with real routes
  //   routes: routes,
  // });
  // beforeEach(() => {
  //   injectRouterMock(router);
  // });

  //   it('routing to episode page after clicking Card', async () => {
  //     const { wrapper, episode } = factory();

  //     const headerElement = wrapper.find('[data-test="episode-card"]');

  //     headerElement.should('exist');

  //     headerElement.click();

  //     expect(wrapper.vm.$router.push).toHaveBeenCalledWith({
  //       name: 'episode',
  //       params: { guid: episode.guid },
  //     });
  //   });

  it('no image', async () => {
    const { wrapper, episode, propsConstructor } = factory();

    const props = propsConstructor({
      value: { guid: 'test', title: 'test' },
    });

    wrapper
      .then(async () => {
        await Cypress.vueWrapper.setProps(props);
      })
      .contains('沒有圖片')
      .should('be.visible');
  });

  it('lazyload image', async () => {
    const { wrapper, episode } = factory();

    // jest.mock('/@/composable/useLazyLoad', () => {
    //   return jest.fn().mockImplementationOnce(() => true);
    // });

    wrapper.then(async () => {
      await Cypress.vue.$nextTick();

      cy.find('img').should('exist');
    });
  });

  it('no pubDate', async () => {
    const { wrapper, episode, propsConstructor } = factory();

    const noPubDatePros = propsConstructor({
      value: { guid: 'test', title: 'test' },
    });

    wrapper.then(async () => {
      await Cypress.vueWrapper.setProps(noPubDatePros);

      cy.find('[data-test="episode-card-pubDate"]').should('be.a', '');
    });
  });

  it('have pubDate', async () => {
    const { wrapper } = factory();

    wrapper
      .then(async () => {
        //
      })
      .find('[data-test="episode-card-pubDate"]')
      .should('be.true');

    // expect(
    //   wrapper.find('[data-test="episode-card-pubDate"]').text(),
    // ).toBeTruthy();
  });
});
