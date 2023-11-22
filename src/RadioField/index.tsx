import React, { memo } from 'react'
import { Radio } from 'react-vant'
import { useField } from '@jdfed/hooks'
import { CommonProps } from '../global'
export type RadioFieldProps = CommonProps & {
  options: []
  buttonStyle?: 'outline' | 'solid'
}

const RadioField = ({
  fieldKey,
  fieldData,
  dispatch,
  options,
  onChange,
  asyncValidate,
  getKey,
  formMode,
  ...restProps
}: RadioFieldProps) => {
  const _onChange = useField(
    { getKey, fieldKey, onChange, asyncValidate, options: { isDelete: false } },
    dispatch
  )
  // view 模式
  if (formMode === 'view') {
    const curOption: Array<Record<string, any>> = options.filter(
      (item: any) => item.value === fieldData
    )
    return curOption[0]?.label || null
  }

  return (
    <Radio.Group
      value={fieldData}
      {...restProps}
      onChange={_onChange}
      direction="horizontal"
    >
      {options.map((item: any, idx) => {
        const { value, label, ...restOption } = item
        return (
          <Radio name={value} key={`${fieldKey}_${idx}`} {...restOption}>
            {label}
          </Radio>
        )
        // return buttonStyle === 'solid' ? (
        //   <Radio.Button
        //     value={value}
        //     key={`${fieldKey}_${idx}`}
        //     {...restOption}
        //   >
        //     {label}
        //     {description?.title && <QuestionCircle {...description} />}
        //   </Radio.Button>
        // ) : (
        //   <Radio value={value} key={`${fieldKey}_${idx}`} {...restOption}>
        //     {label}
        //     {description?.title && <QuestionCircle {...description} />}
        //   </Radio>
        // )
      })}
    </Radio.Group>
  )
}

export const radio = memo(RadioField)
export { default as config } from './config'
