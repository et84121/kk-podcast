import type { createApp, InjectionKey } from 'vue';
import { initPodcastPlayer } from './initPodcastPlayer';
import { setActivePodcastPlayer } from '.';

type Plugin = Parameters<ReturnType<typeof createApp>['use']>['0'];

function defindePlugin<T extends Plugin>(Plugin: T) {
  return Plugin;
}

export const instanceOfPodcastPlayer: InjectionKey<
  ReturnType<typeof initPodcastPlayer>
> = Symbol('instanceOfPodcastPlayer');

/**
 * Podcast Player plugin
 */
export const podcastPlayerPlugin = defindePlugin({
  install: (app, option) => {
    const instance = initPodcastPlayer();
    setActivePodcastPlayer(instance);
    app.provide(instanceOfPodcastPlayer, instance);
  },
});

export const createTestingPodcastPlayer = (
  spyOnFn?: (
    fn?: (...args: unknown[]) => unknown,
  ) => (...args: unknown[]) => unknown,
) =>
  defindePlugin({
    install: (app, option) => {
      const instance = initPodcastPlayer();

      const createSpy =
        spyOnFn ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        (typeof jest !== 'undefined' && jest.spyOn);

      if (!createSpy) {
        throw new Error('You must configure the `spyOnFn` option.');
      }

      createSpy(instance, 'play');
      createSpy(instance, 'stop');
      createSpy(instance, 'pause');
      createSpy(instance, 'next');
      createSpy(instance, 'previous');

      setActivePodcastPlayer(instance);
      app.provide(instanceOfPodcastPlayer, instance);
    },
  });
