import { defineStore } from 'pinia';
import { useRssParser } from '../composable/useRssParser';

import type { PodcastChannel } from '/@/type/channel';

export const usePodcastChannelStore = defineStore('PodcastChannelStore', {
  state: (): {
    channel?: PodcastChannel;
  } => ({
    channel: undefined,
  }),
  actions: {
    async load() {
      const url = '/v2/podcasts/954689a5-3096-43a4-a80b-7810b219cef3/feed.xml';

      if (this.channel) {
        return;
      }

      const feed = await useRssParser(url);

      this.channel = feed;
    },
  },
  persist: true,
});
