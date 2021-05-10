import React, { ReactNode } from 'react';
import './Counter.less';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface Props {
  date: number;
  renderer: (props: CountdownRenderProps) => ReactNode;
}

const Counter: ({ date, renderer }: Props) => JSX.Element = ({
  date,
  renderer,
}: Props): JSX.Element => (
  <div className={'Counter'} data-testid="Counter">
    <Countdown
      date={date}
      intervalDelay={0}
      precision={1}
      renderer={renderer}
      autoStart={false}
    />
  </div>
);

export default Counter;
