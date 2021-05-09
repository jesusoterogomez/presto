import React, { useEffect, useState } from 'react';
import { searchGif, GifResultData } from '../../api/giphy';
import './GiphyBackdrop.less';

interface Props {
  curtainOpacity?: number;
  /*
   Display a single random Giphy gif by searching with a keyword
  */
  giphySearchTerm?: string;
  /*
   Supply multiple search terms. One will be chosen randomly to search Giphy and display a single Gif (Useful for getting more "randomness")
  */
  giphyRandomSearchTerms?: string[];
}

const selectRandomTerm = (terms: string[]) => {
  return terms[Math.floor(Math.random() * terms.length)];
};

export const GiphyBackdrop: React.FC<Props> = ({
  curtainOpacity = 0,
  giphySearchTerm = 'random',
  giphyRandomSearchTerms,
}: Props) => {
  const [data, setData] = useState({} as GifResultData);

  useEffect(() => {
    const term = giphyRandomSearchTerms
      ? selectRandomTerm(giphyRandomSearchTerms)
      : giphySearchTerm;
    const fetchData = async () => {
      setData(await searchGif(term, 'stickers'));
    };

    fetchData();
  }, []);

  if (!data.id) {
    return null;
  }

  return (
    <div className="GiphyBackdrop">
      <div
        className="GiphyBackdropCurtain"
        style={{ opacity: curtainOpacity }}
      />
      <div
        className="GiphyBackdropImage"
        style={{ backgroundImage: `url(${data.images.original.url})` }}
      ></div>
    </div>
  );
};
