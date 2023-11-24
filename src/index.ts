import { Button } from 'react-vant';
import {
  cascader as CascaderField,
  config as cascaderConfig,
} from './CascaderField';
import {
  checkbox as CheckboxField,
  config as checkboxConfig,
} from './CheckboxField';
import {
  datePicker as DatePickerField,
  config as datePickerConfig,
} from './DatePickerField';
import { nullField as NullField, config as nullConfig } from './NullField';
import {
  numberField as NumberField,
  config as numberConfig,
} from './NumberField';
import { radio as RadioField, config as radioConfig } from './RadioField';
import { select as SelectField, config as selectConfig } from './SelectField';
import { slider as SliderField, config as sliderConfig } from './SliderField';
import {
  switchField as SwitchField,
  config as switchConfig,
} from './SwitchField';
import { text as TextField, config as textConfig } from './TextField';
import {
  uploader as UploaderField,
  config as uploaderConfig,
} from './UploaderField';

const vantTheme = {
  select: SelectField,
  radio: RadioField,
  slider: SliderField,
  datePicker: DatePickerField,
  cascader: CascaderField,
  null: NullField,
  text: TextField,
  checkbox: CheckboxField,
  Button,
  theme: 'vant',
  switch: SwitchField,
  number: NumberField,
  uploader: UploaderField,
};

export const config: any = {
  title: '表单组件',
  order: [
    'select',
    'radio',
    'slider',
    'datePicker',
    'cascader',
    'null',
    'number',
    'switch',
    'checkbox',
    'uploader',
    'text',
  ],
  fields: {
    select: selectConfig,
    radio: radioConfig,
    slider: sliderConfig,
    datePicker: datePickerConfig,
    cascader: cascaderConfig,
    null: nullConfig,
    text: textConfig,
    checkbox: checkboxConfig,
    number: numberConfig,
    switch: switchConfig,
    uploader: uploaderConfig,
  },
};

export default vantTheme;
