import React, { FC, memo } from 'react';
import { Checkbox } from 'react-vant';
// import { useField, useQuery } from '@jdfed/hooks'
import { useField } from '@jdfed/hooks';
import { CommonProps } from '../global';

export type SelectFieldProps = CommonProps & {
  //   是否可以多选
  multiple?: boolean;
  //   配置项
  options?: any[];
  requestCache?: boolean;
};

const CheckboxField: FC<SelectFieldProps> = ({
  onChange,
  fieldData,
  fieldKey,
  dispatch,
  multiple,
  options = [],
  queryFunc,
  asyncValidate,
  requestCache = false,
  // style,
  getKey,
  ...restProps
}) => {
  const _onChange = useField(
    { fieldKey, onChange, asyncValidate, getKey },
    dispatch,
  );

  // const checkBoxOnchange = (names: any[]) => {
  //   console.log('names', names)
  //   dispatch(names)
  // }
  // 不管单选多选，均可搜索
  return (
    <Checkbox.Group
      defaultValue={fieldData || []}
      direction="horizontal"
      onChange={_onChange}
    >
      {options?.map((item, index) => (
        <Checkbox key={index} name={item.value}>
          {item?.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};

export const checkbox = memo(CheckboxField);
export { default as config } from './config';
