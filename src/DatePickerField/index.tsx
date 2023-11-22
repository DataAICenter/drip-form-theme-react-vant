/*
 * @Author: jiangxiaowei
 * @Date: 2020-05-14 13:33:14
 * @Last Modified by: jiangxiaowei
 * @Last Modified time: yyyy-05-dd 16:20:08
 */
import React, { memo, useEffect, useState } from "react";
// import PropTypes from 'prop-types'
import { DatetimePicker, Field } from "react-vant";
import { useField } from "@jdfed/hooks";
import moment from "moment";
import { CommonProps } from "../global";
import { typeCheck } from "@jdfed/utils";
import { TimePickerProps } from "react-vant/es/datetime-picker/PropsType";

interface ShowTimeProps
  extends Omit<TimePickerProps, "defaultValue" | "format"> {
  format?: string;
  defaultValue: string;
}
export type DatePickerFieldProps = CommonProps & {
  range: [];
  format?: string;
  showTime?: boolean | ShowTimeProps;
  picker?: "date" | "time" | "week" | "month" | "quarter" | "year" | undefined;
};

const DatePickerField = ({
  disabled,
  onChange,
  fieldData,
  fieldKey,
  dispatch,
  range,
  format = "YYYY-MM-DD HH:mm:ss",
  // picker = 'date',
  asyncValidate,
  getKey,
  formMode,
  ...restProps
}: DatePickerFieldProps) => {
  /**
   * 暂时不支持的DatePicker功能
   * 底部附加选项
   * picker目前只支持
   */
  const [isValid, setValid] = useState(false);
  const _onChange = useField(
    {
      fieldKey,
      onChange,
      asyncValidate,
      getKey,
      options: {
        isMoment: true,
        format,
      },
    },
    dispatch
  );
  // 判断是否需要展示value值.校验fieldData是否合法
  useEffect(() => {
    try {
      // 点击清空的时候，会变成null。
      if (fieldData === null || fieldData === "") {
        setValid(true);
      } else {
        if (range) {
          setValid(
            moment(fieldData[0], format).isValid() &&
              moment(fieldData[1], format).isValid()
          );
        } else {
          setValid(moment(fieldData, format).isValid());
        }
      }
    } catch (error) {
      setValid(false);
    }
  }, [fieldData, format, range]);

  // view 模式
  if (formMode === "view")
    return fieldData
      ? typeCheck(fieldData) === "Array"
        ? fieldData.join(" ~ ")
        : fieldData
      : null;
  console.log(restProps);
  return (
    <DatetimePicker
      popup={{
        round: true,
      }}
      readOnly={disabled}
      onChange={_onChange}
      // formatter={() => format}
      {...(isValid
        ? {
            value: fieldData,
          }
        : null)}
      {...restProps}
      type="date"
    >
      {(val: any, _: any, actions: any) => {
        return (
          <Field
            readOnly
            clickable
            label="选择年月日"
            value={fieldData}
            placeholder="请选择日期"
            onClick={() => actions.open()}
          />
        );
      }}
    </DatetimePicker>
  );
  // return range ? (
  //   <RangePicker
  //     picker={picker}
  //     disabled={disabled}
  //     {...(isValid
  //       ? {
  //           value: fieldData
  //             ? [moment(fieldData[0], format), moment(fieldData[1], format)]
  //             : undefined,
  //         }
  //       : null)}
  //     onChange={_onChange}
  //     format={format}
  //     locale={locale}
  //     showTime={
  //       typeof showTime === 'object'
  //         ? {
  //             ...showTime,
  //             defaultValue: [
  //               moment(showTime.defaultValue, showTime.format),
  //               moment(showTime.defaultValue, showTime.format),
  //             ],
  //           }
  //         : showTime
  //     }
  //     {...restProps}
  //   />
  // ) : (
  //   <DatePicker
  //     picker={picker}
  //     {...(isValid
  //       ? {
  //           value: fieldData ? moment(fieldData, format) : null,
  //         }
  //       : null)}
  //     disabled={disabled}
  //     onChange={_onChange}
  //     locale={locale}
  //     style={style}
  //     showTime={
  //       typeof showTime === 'object'
  //         ? {
  //             ...showTime,
  //             defaultValue: moment(showTime.defaultValue, showTime.format),
  //           }
  //         : showTime
  //     }
  //     {...restProps}
  //   />
  // )
};

export const datePicker = memo(DatePickerField);
export { default as config } from "./config";
