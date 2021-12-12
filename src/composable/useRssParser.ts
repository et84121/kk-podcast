//@ts-expect-error https://github.com/vitejs/vite/issues/1770
import RSSParser from 'rss-parser/dist/rss-parser.min.js';
import type { PodcastChannel } from '../type/channel';

export async function useRssParser(url: string) {
  const parser = new RSSParser();

  const feed = await parser.parseURL(url);

  return feed as PodcastChannel;
}
