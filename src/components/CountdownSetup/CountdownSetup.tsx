import React, { useState } from 'react';
import { Configuration } from '../../types';
import './CountdownSetup.less';
import SearchBar from '../SearchBar/SearchBar';
import { GiphyBackdrop } from '../GiphyBackdrop/GiphyBackdrop';
import FeatherIcon from 'feather-icons-react';

const MIN_VALUE = 1;
const MAX_VALUE = 60;
const INITIAL_VALUE = 5;

interface Props {
  onSubmit: (data: Configuration) => void;
}

const CountdownSetup: ({ onSubmit }: Props) => JSX.Element = ({
  onSubmit,
}: Props) => {
  const [minutes, setMinutes] = useState(INITIAL_VALUE);
  const [videoUrl, setVideoUrl] = useState('');
  const [startDragValue, setStartDragValue] = useState(INITIAL_VALUE);

  const [isDown, setDown] = useState(false);
  const [startX, setStartX] = useState(0);

  const updateMinutes = (targetValue: number) => {
    const clampedValue = Math.min(Math.max(targetValue, MIN_VALUE), MAX_VALUE); // Ensure the values stay within range
    setMinutes(clampedValue);
  };

  // Reset the relevant states when the user stops dragging
  const handleUp = (): void => {
    setDown(false);
    setStartX(0);
    setStartDragValue(0);
  };

  const handleMove = (event: React.MouseEvent<HTMLDivElement>): void => {
    // Don't update the value if the mouse/cursor isn't pressed when moving. (ensure the user is dragging vs. moving the mouse)
    if (!isDown) {
      return;
    }

    const sensitivity = 10; // Controls how many pixels the cursor needs to be dragged to change 1 minute.
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
