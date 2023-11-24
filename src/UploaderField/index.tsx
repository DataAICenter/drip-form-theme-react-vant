import React, { FC, memo, useEffect, useState } from 'react'
// import './index.styl'
import { useField } from '@jdfed/hooks'
import { Uploader, UploaderValueItem } from 'react-vant'
import { CommonProps } from '../global'

type UploaderFieldProps = CommonProps

const UploaderField: FC<UploaderFieldProps> = ({
  onChange,
  fieldData,
  fieldKey,
  dispatch,
  asyncValidate,
  getKey,
  ...restProps
}) => {
  const [fileList, setFileList] = useState<UploaderValueItem[]>([])

  const _onChange = useField(
    {
      getKey,
      fieldKey,
      onChange,
      asyncValidate,
      options: { isUploader: true },
    },
    dispatch
  )

  const DEMO_UPLOAD_API =
    'http://121.229.175.82:63221/api/service-obs/auth/FileController/fileUpload'
  const upload = async (file: any) => {
    try {
      const body = new FormData()
      body.append('file', file)
      const resp = await fetch(DEMO_UPLOAD_API, {
        method: 'POST',
        body,
        headers: {
          Token: 'PHONE_egcblrnmbfhglpkvqnczvsud',
        },
      })
      const json = await resp.json()
      // return包含 url 的一个对象 例如: {url:'https://img.yzcdn.cn/vant/sand.jpg'}
      console.log('json', json)
      if (json?.success) {
        // fileList.current = [...fileList.current, json?.data?.fileUrl]
        const list = [...(fileList || []), { url: json?.data?.fileUrl }]
        console.log(list)
        // setFileList(list)
        // uploadParmasData.imgList.push(result);
        // setTasks(uploadParmasData.imgList);
        _onChange(list?.map((item) => item.url))

        return { url: json?.data?.fileUrl }
      }
      return {}
    } catch (error) {
      return { url: `demo_path/${file.name}` }
    }
  }

  const onDelete = (e: any) => {
    console.log('e', e?.data?.fileUrl)

    const list = fileList?.filter((item) => item.url !== e?.data?.fileUrl)
    setFileList(list)
    const urls = list?.map((item) => item.url)
    console.log('urlsB', urls)
    _onChange(urls)
    // debugger
  }

  // const newFieldData = useMemo<Array<any>>(() => {
  //   if (exportToString && typeof fieldData === 'string') {
  //     return [
  //       {
  //         filename: '',
  //         url: fieldData,
  //         status: 'done',
  //       },
  //     ]
  //   } else if (Array.isArray(fieldData)) {
  //     return fieldData.map((item, index) => {
  //       return {
  //         filename: '',
  //         key: index,
  //         url: item,
  //         status: 'done',
  //       }
  //     })
  //   } else {
  //     return []
  //   }
  // }, [exportToString, fieldData])

  useEffect(() => {
    const list = fieldData?.map((item: string, index: number) => {
      return {
        filename: '',
        key: index,
        url: item,
      }
    })

    setFileList(list)
  }, [fieldData])
  console.log('fileList', fileList)

  return (
    <Uploader
      multiple
      accept='image/*'
      defaultValue={fileList}
      {...restProps}
      upload={upload}
      onDelete={onDelete}
    />
  )
}

export const uploader = memo(UploaderField)
export { default as config } from './config'
