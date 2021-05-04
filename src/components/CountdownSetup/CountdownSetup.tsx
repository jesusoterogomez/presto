import React, { EffectCallback, useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, TimePicker } from 'antd';
import { Configuration } from '../../types';
import moment, { Moment } from 'moment';
import './CountdownSetup.less';
import YTSearch from 'youtube-api-search';

interface Props {
  onSubmit: (data: Configuration) => void;
}

const ConfigurationForm: ({ onSubmit }: Props) => JSX.Element = ({
  onSubmit,
}: Props) => {
  let newMinutes = 5;
  const [minutes, setMinutes] = useState(newMinutes);
  const format = 'HH:mm';

  const handleTimePickerOnChange = async (value: Moment | null) => {
    newMinutes = value?.diff(moment(), 'minutes') || minutes;
    console.log('handleTimePickerOnChange newMinutes', newMinutes);
    setMinutes(newMinutes);
  };

  useEffect(() => {
    console.log('useEffect minutes', minutes);
  }, [minutes, setMinutes]);

  const videoSearch = (term: string) => {
    YTSearch(
      { key: 'AIzaSyBVNjUZeq8YItRJf3KpupIOxfGCLlghvT8', term: term },
      (videos: any) => {
        //do something with videos!
        console.log(videos);
      }
    );
  };

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

      <div className="CountdownSetupBackdrop">..</div>
    </div>
  );

  // return (
  //   <div className="ConfigurationForm" data-testid="ConfigurationForm">
  //     <Form onFinish={onSubmit} size={'large'}>
  //       <Form.Item
  //         label={'Minutes'}
  //         name="minutes"
  //         initialValue={minutes}
  //         rules={[
  //           {
  //             required: true,
  //             message: 'Please input the number of minutes',
  //           },
  //         ]}
  //       >
  //         {/*<InputNumber value={minutes} />*/}
  //         <Input type={'number'} value={minutes} />
  //       </Form.Item>

  //       <Form.Item>
  //         <TimePicker
  //           format={format}
  //           defaultValue={moment(
  //             moment().add(minutes, 'minutes').format(format),
  //             format
  //           )}
  //           onChange={handleTimePickerOnChange}
  //         />
  //       </Form.Item>

  //       <Form.Item
  //         label={'Background'}
  //         name="background"
  //         initialValue={'https://www.youtube.com/watch?v=5qap5aO4i9A'}
  //       >
  //         <Input placeholder={'Youtube video or image URL'} />
  //       </Form.Item>

  //       <Form.Item>
  //         <Button type="primary" htmlType="submit">
  //           Start the countdown
  //         </Button>
  //       </Form.Item>
  //     </Form>
  //   </div>
  // );
};

export default ConfigurationForm;
