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

// export const mockPodcastPlayerPlugin = defindePlugin({
//     install:(app,option)=>{

//     }
// })
