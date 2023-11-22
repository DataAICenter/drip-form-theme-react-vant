import React, { memo, FC } from 'react'
import { Input } from 'react-vant'
import { useField } from '@jdfed/hooks'
const { TextArea } = Input
import { CommonProps } from '../global'

export type TextFieldProps = CommonProps &
  Partial<{
    multiline: number | boolean
    // 禁止输入的字符串
    disabled_input: string[]
  }>
const TextField: FC<TextFieldProps> = ({
  multiline: autoSize = false,
  disabled,
  onChange,
  fieldData,
  fieldKey,
  dispatch,
  disabled_input,
  style,
  asyncValidate,
  getKey,
  formMode,
  ...restProps
}) => {
  const _onChange = useField(
    {
      fieldKey,
      onChange,
      asyncValidate,
      getKey,
      ...(disabled_input && { options: { disabled_input, isFormat: true } }),
    },
    dispatch
  )
  // view 模式
  if (formMode === 'view') return fieldData || null

  // edit、generator模式
  return autoSize && autoSize !== 1 ? (
    <TextArea
      {...(typeof autoSize === 'number' ? { rows: autoSize } : null)}
      disabled={disabled}
      onChange={_onChange}
      value={fieldData}
      style={style}
      {...restProps}
    />
  ) : (
    <Input
      disabled={disabled}
      onChange={_onChange}
      value={fieldData}
      style={style}
      {...restProps}
    />
  )
}

export const text = memo(TextField)

export { default as config } from './config'
