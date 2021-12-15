//@ts-expect-error https://github.com/vitejs/vite/issues/1770
import RSSParser from 'rss-parser/dist/rss-parser.min.js';
import axios from 'axios';
export async function useRssParser(url: string) {
  const response = await axios.get(url);

  const parser = new RSSParser();

  const feed = await parser.parseString(response.data);

  return feed as unknown;
}
