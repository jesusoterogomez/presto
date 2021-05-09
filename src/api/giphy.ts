import { GiphyFetch, GifResult } from '@giphy/js-fetch-api';

export type GifResultData = GifResult['data'];

export const fetchGif = async (gifId: string): Promise<GifResultData> => {
  // use @giphy/js-fetch-api to fetch gifs
  // apply for a new Web SDK key. Use a separate key for every platform (Android, iOS, Web)
  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY as string);
  // fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
  const { data } = await gf.gif(gifId);

  return data;
};

export const searchGif = async (
  term: string,
  type: 'stickers' | 'gifs' = 'gifs'
): Promise<GifResultData> => {
  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY as string);
  const { data } = await gf.random({ tag: term, type: type });
  return data;
};
