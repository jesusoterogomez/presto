import { GiphyFetch, GifResult } from '@giphy/js-fetch-api';

export type GifResultData = GifResult['data'];

export const fetchGif = async (term: string): Promise<GifResultData> => {
  // use @giphy/js-fetch-api to fetch gifs
  // apply for a new Web SDK key. Use a separate key for every platform (Android, iOS, Web)
  const gf = new GiphyFetch(process.env.REACT_APP_GIPHY_API_KEY as string);
  // fetch 10 gifs at a time as the user scrolls (offset is handled by the grid)
  const { data } = await gf.gif(term);

  return data;
};
