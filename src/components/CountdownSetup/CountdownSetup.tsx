import React, { useEffect, useState } from 'react';
import { Configuration } from '../../types';
import './CountdownSetup.less';
import SearchBar from '../SearchBar/SearchBar';
import { GiphyBackdrop } from '../GiphyBackdrop/GiphyBackdrop';
import FeatherIcon from 'feather-icons-react';

const MIN_VALUE = 1;
const MAX_VALUE = 30;

interface Props {
  onSubmit: (data: Configuration) => void;
}

const ConfigurationForm: ({ onSubmit }: Props) => JSX.Element = ({
  onSubmit,
}: Props) => {
  const newMinutes = 5;
  const [minutes, setMinutes] = useState(newMinutes);
  const [startDragValue, setStartDragValue] = useState(newMinutes);

  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    // console.log('useEffect minutes', minutes);
  }, [minutes, setMinutes]);

  const handleUp = (): void => {
    setDown(false);
    setStartX(0);
    setStartDragValue(0);
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDown) {
      return;
    }

    const sensitivity = 10;

    const delta = event.clientX - startX;
    const unitChanges = Math.round(delta / sensitivity);

    // clamp values

    const value = unitChanges + startDragValue;
    const clampedValue = Math.min(Math.max(value, MIN_VALUE), MAX_VALUE);

    setMinutes(clampedValue);
  };

  const handleDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    setDown(true);
    setStartDragValue(minutes);
    setStartX(event.clientX);
  };

  return (
    <div className="CountdownSetup">
      <div
        className="TimerSetup"
        onMouseLeave={handleUp}
        onMouseMove={handleMove}
        onMouseDown={handleDown}
        onMouseUp={handleUp}
      >
        <h1>
          <FeatherIcon icon="close" />
          {minutes} <span>minutes</span>
        </h1>

        {/* <input
          className="TimerSetupRange"
          readOnly
          min={1}
          max={30}
          step={1}
          onChange={(e) => setMinutes(Number(e.target.value))}
          value={minutes}
          type="range"
        /> */}
      </div>

      <div className="CountdownSetupOmnibar">
        <SearchBar />
        <p className="CountdownSetupOmnibar HelpText">
          Paste a URL here or type to search Youtube
        </p>
      </div>

      <GiphyBackdrop
        curtainOpacity={0.92}
        giphyRandomSearchTerms={['time', 'hourglass', 'timer']}
      />

      <div className="CountdownStartButton">
        <button>Start</button>
      </div>
    </div>
  );
};

export default ConfigurationForm;
