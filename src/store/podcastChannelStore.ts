import { defineStore } from 'pinia';
import Parser from 'rss-parser';
import type { PodcastChannel } from '/@/type/channel';

export const usePodcastChannelStore = defineStore('PodcastChannelStore', {
  state: (): {
    channel?: PodcastChannel;
  } => ({
    channel: undefined,
  }),
  actions: {
    async load() {
      const parser = new Parser();

      const feedUrl =
        'https://feeds.soundon.fm/podcasts/954689a5-3096-43a4-a80b-7810b219cef3.xml';

      const feed = await parser.parseURL(feedUrl);

      this.channel = feed as unknown as PodcastChannel;
    },
  },
  persist: true,
});
