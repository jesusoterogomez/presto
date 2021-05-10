import React, { useEffect, useState } from 'react';
import './App.less';
import { CountdownRenderProps, zeroPad } from 'react-countdown';
import { Configuration } from './types';
import { CountdownApi } from 'react-countdown/dist/Countdown';
import Background from './components/Background/Background';
import Counter from './components/Counter/Counter';
import CountdownSetup from './components/CountdownSetup/CountdownSetup';

const App = (): JSX.Element => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [countdownDate, setCountdownDate] = useState<number>(Date.now());
  const [backgroundUrl, setBackgroundUrl] = useState<string>('');
  const [countdownApi, setCountdownApi] = useState<CountdownApi>();
  const Completionist = (): JSX.Element => <span>Time is up!</span>;

  const getCountdownDate = (minutes: number): number =>
    Date.now() + minutes * 60 * 1000;

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    api,
  }: CountdownRenderProps) => {
    if (completed) {
      return <Completionist />;
    } else {
      let span = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
      if (hours) span = `${zeroPad(hours)}:${span}`;
      if (days) span = `${days} days ${span}`;
      setCountdownApi(api);
      return <span>{span}</span>;
    }
  };

  useEffect((): void => {
    countdownApi ? countdownApi.start() : null;
  }, [countdownApi]);

  const handleSubmit = (conf: Configuration): void => {
    setCountdownDate(getCountdownDate(conf.minutes));
    conf.background && setBackgroundUrl(conf.background);
    setSubmitted(true);
  };

  return (
    <div className="App">
      {submitted ? (
        <div className={'Countdown'}>
          <Background url={backgroundUrl} />
          <Counter date={countdownDate} renderer={renderer} />
        </div>
      ) : (
        <div className="Container">
          <h1 className="AppTitle">presto</h1>

          <CountdownSetup onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};

export default App;
