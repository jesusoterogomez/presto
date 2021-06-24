import React, { useEffect, useState } from 'react';
import { Configuration } from '../../types';
import './CountdownSetup.less';
import SearchBar from '../SearchBar/SearchBar';
import { GiphyBackdrop } from '../GiphyBackdrop/GiphyBackdrop';
import FeatherIcon from 'feather-icons-react';

const MIN_VALUE = 1;
const MAX_VALUE = 60;

interface Props {
  onSubmit: (data: Configuration) => void;
}

const CountdownSetup: ({ onSubmit }: Props) => JSX.Element = ({
  onSubmit,
}: Props) => {
  const newMinutes = 5;
  const [minutes, setMinutes] = useState(newMinutes);
  const [videoUrl, setVideoUrl] = useState('');
  const [startDragValue, setStartDragValue] = useState(newMinutes);

  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleUp = (): void => {
    setDown(false);
    setStartX(0);
    setStartDragValue(0);
  };

  // clamp values
  const updateMinutes = (targetValue: number) => {
    const clampedValue = Math.min(Math.max(targetValue, MIN_VALUE), MAX_VALUE);
    setMinutes(clampedValue);
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDown) {
      return;
    }

    const sensitivity = 10;

    const delta = event.clientX - startX;
    const unitChanges = Math.round(delta / sensitivity);

    const value = unitChanges + startDragValue;
    updateMinutes(value);
  };

  const handleDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    setDown(true);
    setStartDragValue(minutes);
    setStartX(event.clientX);
  };

  return (
    <>
      <div className="CountdownSetup">
        <h2>How long are we waiting for?</h2>

        <div
          className="TimerSetup"
          onMouseLeave={handleUp}
          onMouseMove={handleMove}
          onMouseDown={handleDown}
          onMouseUp={handleUp}
        >
          <div className="MinutePicker">
            <FeatherIcon
              icon="minus-circle"
              size="48"
              onClick={() => updateMinutes(minutes - 1)}
            />
            <h1>
              <input
                className="MinuteInput"
                type="number"
                value={minutes}
                onClick={(e) => e.currentTarget.select()}
                onChange={(e) => updateMinutes(Number(e.target.value))}
              />
              <span className="unit">minutes</span>
            </h1>
            <FeatherIcon
              icon="plus-circle"
              size="48"
              onClick={() => updateMinutes(minutes + 1)}
            />
          </div>
        </div>

        <div className="CountdownSetupOmnibar">
          <SearchBar onChange={(value) => setVideoUrl(value)} />
          <p className="CountdownSetupOmnibar HelpText">
            Paste a URL here or type to search Youtube
          </p>
        </div>

        <GiphyBackdrop
          curtainOpacity={0.92}
          giphyRandomSearchTerms={['counter', 'hourglass', 'timer']}
        />

        <div className="CountdownStartButton">
          <button onClick={() => onSubmit({ minutes, background: videoUrl })}>
            Start
          </button>
        </div>
      </div>
    </>
  );
};

export default CountdownSetup;
