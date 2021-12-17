import { TypeFactory } from 'interface-forge';
import faker from 'faker';
import type { PodcastChannel } from '/@/model/channel';

// faker.locale = 'zh_TW';

export const podcastChannelFactory = new TypeFactory<PodcastChannel>(i => ({
  title: faker.hacker.noun(),
  copyright: faker.internet.userName(),
  description: faker.lorem.paragraph(2),
  feedUrl: faker.internet.url(),
  image: {
    title: faker.animal.cat(),
    url: faker.image.cats(),
    value: faker.image.cats(),
  },
  itunes: {
    image: faker.image.food(),
    author: faker.internet.userName(),
    explicit: faker.lorem.word(1),
    categories: () => [''],
    categoriesWithSubs: [
      { name: faker.animal.cat(), subs: faker.animal.dog() },
    ],
    owner: { email: faker.internet.email(), name: faker.internet.userName() },
    subtitle: faker.lorem.lines(1),
    summary: faker.lorem.sentences(3),
  },
  items: episodeFactory.batchSync(3),
  language: faker.locale,
  lastBuildDate: faker.date.past(),
  link: faker.internet.url(),
  paginationLinks: { self: 'kk-test' },
  generator: 'kk-test',
}));

export const episodeFactory = new TypeFactory<PodcastChannel['items'][number]>(
  (i: number) => ({
    content: faker.lorem.paragraph(),
    contentSnippet: faker.lorem.paragraph(),
    'content:encoded': faker.lorem.paragraph(),
    'content:encodedSnippet': faker.lorem.paragraph(),
    creator: faker.name.findName(),
    'dc:creator': faker.name.findName(),
    title: faker.animal.bear(),
    enclosure: {
      type: faker.internet.color(),
      url: faker.internet.url(),
      length: faker.datatype.number() + '',
    },
    guid: faker.datatype.uuid(),
    isoDate: faker.date.past().toISOString(),
    itunes: {
      author: faker.animal.cow(),
      duration: faker.datatype.number() + '',
      episode: 'ep.' + i,
      explicit: 'false',
      image: faker.image.imageUrl(),
      season: '1',
      summary: faker.lorem.paragraph(),
    },
    link: faker.internet.url(),
    pubDate: faker.date.past().toISOString(),
  }),
);
