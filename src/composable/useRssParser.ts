//@ts-expect-error https://github.com/vitejs/vite/issues/1770
import RSSParser from 'rss-parser/dist/rss-parser.min.js';

export async function useRssParser(url: string) {
  const parser = new RSSParser();

  const feed = await parser.parseURL(url);

  return feed as unknown;
}
