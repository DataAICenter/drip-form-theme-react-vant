import { Button } from 'react-vant';
import {
  cascader as CascaderField,
  config as cascaderConfig,
} from './CascaderField';
import {
  datePicker as DatePickerField,
  config as datePickerConfig,
} from './DatePickerField';
import { nullField as NullField, config as nullConfig } from './NullField';
import { radio as RadioField, config as radioConfig } from './RadioField';
import { select as SelectField, config as selectConfig } from './SelectField';
import { slider as SliderField, config as sliderConfig } from './SliderField';
import { text as TextField, config as textConfig } from './TextField';

const vantTheme = {
  select: SelectField,
  radio: RadioField,
  slider: SliderField,
  datePicker: DatePickerField,
  cascader: CascaderField,
  null: NullField,
  text: TextField,
  Button,
  theme: 'vant',
};

export const config: any = {
  title: '表单组件',
  order: ['select', 'radio', 'slider', 'datePicker'],
  fields: {
    select: selectConfig,
    radio: radioConfig,
    slider: sliderConfig,
    datePicker: datePickerConfig,
    cascader: cascaderConfig,
    null: nullConfig,
    text: textConfig,
  },
};

export default vantTheme;
