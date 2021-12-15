import { getCurrentInstance, inject } from 'vue';
import {
  createTestingPodcastPlayer,
  instanceOfPodcastPlayer,
  podcastPlayerPlugin,
} from './podcastPlayerPlugin';
import { usePodcastPlayer } from './usePodcastPlayer';

export { podcastPlayerPlugin, usePodcastPlayer, createTestingPodcastPlayer };

type instancePodcastPlayer = ReturnType<typeof usePodcastPlayer>;

export let activePodcastPlayer: instancePodcastPlayer | undefined;

export const setActivePodcastPlayer = (player: instancePodcastPlayer) => {
  activePodcastPlayer = player;
};

export const getActivePodcastPlayer = () =>
  (getCurrentInstance() && inject(instanceOfPodcastPlayer)) ||
  activePodcastPlayer;
