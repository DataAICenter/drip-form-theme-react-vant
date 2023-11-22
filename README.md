# drip-form-theme-react-vant

## 介绍

[drip-form](https://github.com/JDFED/drip-form) 动态表单对应的 [react-vant](https://github.com/3lang3/react-vant) 移动端主题包

## 安装

`npm install drip-form-theme-react-vant`

## 使用

```tsx
//导入drip form渲染核心
import DripForm from '@jdfed/drip-form'
//导入react-vant主题
import reactVant from 'drip-form-theme-react-vant'
//导入表单配置文件
import unitedSchema from './unitedSchema'
//导入drip form样式
import '@jdfed/drip-form/dist/index.css'

function App() {
  return (
    <DripForm
      // 表单配置文件
      unitedSchema={unitedSchema}
      // 导入组件
      uiComponents={{ reactVant }}
      // 设置表单值
      formData={{
        checkbox: '1',
        colorPicker: '#000000',
        text: '1111',
        number: 1,
      }}
    ></DripForm>
  )
}

export default App
```

## 支持组件

- 持续更新

| 组件名                 |  状态  |
| ---------------------- | :----: |
| Text 文本输入          | 已支持 |
| Number 数字输入        | 已支持 |
| Select 选择器          | 已支持 |
| Radio 单选框           | 已支持 |
| Null 空表单            | 已支持 |
| Switch 开关            | 已支持 |
| Slider 滑动输入条      | 已支持 |
| TimePicker 时间选择器  | 已支持 |
| DatePicker 日期选择器  | 已支持 |
| ColorPicker 颜色选择器 | 已支持 |
| Checkbox 多选框        | 已支持 |
| Uploader 上传          | 已支持 |
