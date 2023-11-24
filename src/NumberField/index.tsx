import React, { memo } from 'react'
import { Input } from 'react-vant'
import { useField } from '@jdfed/hooks'
import { CommonProps } from '../global'

export type NumberFieldProps = CommonProps

const NumberField = ({
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
}: NumberFieldProps) => {
  const _onChange = useField({ fieldKey, onChange, asyncValidate, getKey }, dispatch)
  // view 模式
  if (formMode === 'view') return fieldData || null
  return (
    <Input
      disabled={disabled}
      onChange={_onChange}
      value={fieldData}
      style={style}
      {...restProps}
    />
  )
}

export const numberField = memo(NumberField)
export { default as config } from './config'
