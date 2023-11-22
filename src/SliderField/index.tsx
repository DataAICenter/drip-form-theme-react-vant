import React, { memo, FC, useMemo } from 'react'
import { Slider } from 'react-vant'
import { useField } from '@jdfed/hooks'
import { CommonProps } from '../global'

export type SliderFieldProps = CommonProps & {
  range?: boolean
  vertical?: boolean
  min?: number
  max?: number
  showNumber?: boolean
  step?: number
}

const SliderField: FC<SliderFieldProps> = ({
  disabled = false,
  onChange,
  fieldData,
  fieldKey,
  style,
  range = false,
  dispatch,
  vertical = false,
  min = 0,
  max = 100,
  step = 1,
  asyncValidate,
  getKey,
  ...restProps
}) => {
  /**
   * 暂时不支持的slider功能: tipFormatter 自定义提示 | 带icon的滑块
   */
  const _onChange = useField(
    { fieldKey, onChange, asyncValidate, getKey },
    dispatch
  )

  const sliderStyle = useMemo(() => {
    let defaultStyle = {
      width: '100%',
      // height: '',
    }
    if (vertical) {
      defaultStyle = {
        width: 'unset',
        // height: '64px',
      }
    }
    return Object.assign({}, defaultStyle, style)
  }, [vertical, style])

  const wrapperStyle = useMemo(
    () => ({ display: vertical ? 'unset' : 'flex' }),
    [vertical]
  )
  console.log(fieldData, step, restProps)

  return (
    <div style={wrapperStyle}>
      <Slider
        style={sliderStyle}
        disabled={disabled}
        range={range}
        min={min}
        max={max}
        step={step}
        vertical={vertical}
        onChange={_onChange}
        value={fieldData || 0}
        {...restProps}
      />
    </div>
  )
}

export const slider = memo(SliderField)
export { default as config } from './config'
