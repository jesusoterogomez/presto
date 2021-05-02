import React, { EffectCallback, useEffect, useState } from 'react';
import './ConfigurationForm.less';
import { Button, Form, Input, InputNumber, TimePicker } from 'antd';
import { Configuration } from '../../types';
import moment, { Moment } from 'moment';

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

  return (
    <div className="ConfigurationForm" data-testid="ConfigurationForm">
      <Form onFinish={onSubmit} size={'large'}>
        <Form.Item
          label={'Minutes'}
          name="minutes"
          initialValue={minutes}
          rules={[
            {
              required: true,
              message: 'Please input the number of minutes',
            },
          ]}
        >
          {/*<InputNumber value={minutes} />*/}
          <Input type={'number'} value={minutes} />
        </Form.Item>

        <Form.Item>
          <TimePicker
            format={format}
            defaultValue={moment(
              moment().add(minutes, 'minutes').format(format),
              format
            )}
            onChange={handleTimePickerOnChange}
          />
        </Form.Item>

        <Form.Item
          label={'Background'}
          name="background"
          initialValue={'https://www.youtube.com/watch?v=5qap5aO4i9A'}
        >
          <Input placeholder={'Youtube video or image URL'} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Start the countdown
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConfigurationForm;
