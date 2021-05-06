import React, { useEffect, useState } from 'react';
import { Gif } from '@giphy/react-components';
import { fetchGif, GifResultData } from '../../api/giphy';

export const GiphyBackdrop: React.FC = () => {
  const [data, setData] = useState({} as GifResultData);

  useEffect(() => {
    const fetchData = async () => {
      setData(await fetchGif('fpXxIjftmkk9y'));
    };

    fetchData();
  }, []);

  if (!data.id) {
    return null;
  }

  return <Gif gif={data} width={300} />;
};
