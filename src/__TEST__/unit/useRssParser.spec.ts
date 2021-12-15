import { describe, expect, it, jest } from '@jest/globals';
import { readFileSync } from 'fs';
import { useRssParser } from '/@/composable/useRssParser';
import { podcastChannelSchema } from '/@/model/channel';

const xmlRssFeed = readFileSync(
  './src/__TEST__/unit/fixture/soundonPodcastRssfeed.xml',
).toString('utf-8');

jest.mock('axios', () => ({
  get: jest.fn().mockImplementationOnce(() => ({ data: xmlRssFeed })),
}));

describe('useRssParser.ts', () => {
  it('test with snapshot and model vaildation', async () => {
    const data = await useRssParser('');

    expect(JSON.stringify(data)).toMatchSnapshot('rss parser');

    expect(podcastChannelSchema.parse(data)).toBeTruthy();
  });
});
