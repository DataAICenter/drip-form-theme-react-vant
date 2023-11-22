import React, { memo, FC, useEffect } from 'react'
import { Field, Picker } from 'react-vant'
import { useField, useQuery } from '@jdfed/hooks'
import { CommonProps } from '../global'

export type SelectFieldProps = CommonProps & {
  //   是否可以多选
  multiple?: boolean
  //   配置项
  options?: any[]
  //是否有清除按钮
  allowClear?: boolean
  requestCache?: boolean
}

const SelectField: FC<SelectFieldProps> = ({
  onChange,
  fieldData,
  fieldKey,
  dispatch,
  multiple,
  options = [],
  queryFunc,
  asyncValidate,
  requestCache = false,
  style,
  getKey,
  ...restProps
}) => {
  const queryOptionsFuc = useQuery(
    {
      getKey,
      options,
      queryFunc,
      requestCache,
      fieldKey,
    },
    dispatch
  )

  useEffect(() => {
    queryOptionsFuc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // fix：antd 多选情况传空字符串，展示空的选项bug
  if (
    multiple ||
    restProps?.mode === 'multiple' ||
    restProps?.mode === 'tags'
  ) {
    if (!Array.isArray(fieldData)) {
      fieldData = []
    }
  }
  const _onChange = useField(
    { fieldKey, onChange, asyncValidate, getKey },
    dispatch
  )
  // 不管单选多选，均可搜索
  return (
    <Picker
      popup
      style={style}
      {...(multiple
        ? {
            mode: 'multiple',
          }
        : {
            showSearch: true,
          })}
      title=""
      value={fieldData}
      onChange={_onChange}
      columnsFieldNames={{ text: 'label', value: 'value' }}
      columns={options}
      {...restProps}
    >
      {(val, _, actions) => {
        return (
          <Field
            readOnly
            clickable
            label="选择城市"
            value={'xxx'}
            placeholder="请选择城市"
            onClick={() => actions.open()}
          />
        )
      }}
    </Picker>
  )
}

export const select = memo(SelectField)
export { default as config } from './config'
