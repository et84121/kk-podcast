/**
 * 聲音檔網址
 */
interface Enclosure {
  url: string;
  length: string;
  type: string;
}

interface Itunes {
  author: string;
  summary: string;
  explicit: string;
  duration: string;
  image: string;
  episode: string;
  season: string;
  keywords: string;
  subtitle: string;
}

interface Episode {
  creator: string;
  title: string;
  link: string;
  pubDate: string;
  'content:encoded': string;
  'content:encodedSnippet': string;

  /**
   * 聲音檔網址
   */
  enclosure: Enclosure;
  'dc:creator': string;
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: Date;
  itunes: Itunes;
}

interface Image {
  link: string;
  url: string;
  title: string;
}

interface PaginationLinks {
  self: string;
}

interface Owner {
  name: string;
  email: string;
}

interface CategoriesWithSub {
  name: string;
  subs?: unknown;
}

interface ChannelItunesField {
  owner: Owner;
  image: string;
  categories: string[];
  categoriesWithSubs: CategoriesWithSub[];
  author: string;
  subtitle: string;
  summary: string;
  explicit: string;
}

export interface PodcastChannel {
  items: Episode[];
  feedUrl: string;
  image: Image;
  paginationLinks: PaginationLinks;
  title: string;
  description: string;
  generator: string;
  link: string;
  language: string;
  copyright: string;
  lastBuildDate: string;
  itunes: ChannelItunesField;
}
