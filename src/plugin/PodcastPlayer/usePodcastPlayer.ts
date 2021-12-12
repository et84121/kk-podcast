import type { InjectionKey } from 'vue';
import { inject } from 'vue';
import { getActivePodcastPlayer } from '.';
import type { instanceOfPodcastPlayer } from './podcastPlayerPlugin';

type returnType = typeof instanceOfPodcastPlayer extends InjectionKey<infer R>
  ? R
  : never;

export function usePodcastPlayer(): returnType {
  const instance = getActivePodcastPlayer();

  if (!instance) {
    throw new Error('Cannot get the instance of podcastPlayer');
  }

  return instance;
}
