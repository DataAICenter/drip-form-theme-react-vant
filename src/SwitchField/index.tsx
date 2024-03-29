import React, { memo, FC } from 'react'
import { Switch } from 'react-vant'
import { useField } from '@jdfed/hooks'
import { CommonProps } from '../global'

const SwitchField: FC<CommonProps> = ({
  disabled,
  onChange,
  fieldData,
  fieldKey,
  dispatch,
  style,
  asyncValidate,
  getKey,
  formMode,
  ...restProps
}) => {
  const _onChange = useField(
    { fieldKey, getKey, onChange, asyncValidate, fieldData: !fieldData },
    dispatch
  )

  return (
    <Switch
      disabled={formMode === 'view' ? true : disabled}
      onChange={_onChange}
      checked={!!fieldData}
      style={style}
      {...restProps}
    />
  )
}

export const switchField = memo(SwitchField)
export { default as config } from './config'
