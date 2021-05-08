import YoutubeSearch from 'youtube-api-search';

export type YoutubeSearchResults = {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: YoutubeSearchResultItem[];
};

export type YoutubeSearchResultItem = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
};

export const videoSearch = async (
  term: string
): Promise<YoutubeSearchResultItem[]> => {
  const results = await new Promise((resolve) => {
    YoutubeSearch(
      { key: process.env.REACT_APP_YOUTUBE_API_KEY, term },
      (videos: YoutubeSearchResults) => {
        resolve(videos);
      }
    );
  });

  return results as YoutubeSearchResultItem[];
};
