import React, { useEffect, useState } from 'react';
import { Configuration } from '../../types';
import './CountdownSetup.less';
import { videoSearch } from '../../api/youtube';
import SearchBar from '../SearchBar/SearchBar';

interface Props {
  onSubmit: (data: Configuration) => void;
}

const ConfigurationForm: ({ onSubmit }: Props) => JSX.Element = ({
  onSubmit,
}: Props) => {
  const newMinutes = 5;
  const [minutes, setMinutes] = useState(newMinutes);

  useEffect(() => {
    console.log('useEffect minutes', minutes);
  }, [minutes, setMinutes]);

  return (
    <div className="CountdownSetup">
      <div className="TimerSetup">
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
        />
      </div>

      <div className="CountdownSetupOmnibar">
        <input type="search" onChange={(e) => videoSearch(e.target.value)} />
        <p>Paste a URL here or type to search Youtube</p>
      </div>

      <div className="CountdownStartButton">Start!</div>

      <div className="DisplayOptions">
        <div className="GiphyCountdownOption">Giphy</div>
        <div className="YoutubeCountdownOption">Youtube</div>
      </div>

      <SearchBar />
    </div>
  );
};

export default ConfigurationForm;
