import { defineStore } from 'pinia';
import { useRssParser } from '../composable/useRssParser';
import type { z } from 'zod';
import { podcastChannelSchema } from '/@/model/channel';

export const usePodcastChannelStore = defineStore('PodcastChannelStore', {
  state: (): {
    channel?: z.infer<typeof podcastChannelSchema>;
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

      this.channel = podcastChannelSchema.parse(feed);
    },
  },
  persist: true,
});
