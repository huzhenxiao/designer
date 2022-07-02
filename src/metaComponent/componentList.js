import logo from 'assets/logo.png';
import {
  selectCreater,
  leftCreater,
  topCreater,
  rotateCreater,
  opacityCreater,
  widthCreater,
  heightCreater,
  fontSizeCreater,
  colorCreater,
  lineHeightCreater,
  fontWeightCreater,
  textAlignCreater,
  verticalAlignCreater,
  letterSpacingCreater,
  backgroundColorCreater,
  borderWidthCreater,
  borderStyleCreater,
  borderColorCreater,
  borderRadiusCreater,
  lineTypeCreater,
  sourceXCreater,
  sourceYCreater,
  targetXCreater,
  targetYCreater,
  lineColorCreater,
  textareaCreater,
  eventsCreater,
  IoTdataSourceCreater
} from './propsCreater';
// 公共样式
export const commonStyle = () => ({
  left: leftCreater(),
  top: topCreater(),
  rotate: rotateCreater(),
  opacity: opacityCreater()
});

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false // 是否锁定组件
};

// 编辑器左侧组件列表
const list = [
  {
    component: 'text',
    id: 'text',
    type: 'dom',
    tabType: 'element',
    collapseType: 'common',
    label: '文字',
    propValue: textareaCreater({
      value: '双击编辑文字'
    }),
    icon: 'document',
    businessData: {},
    style: {
      width: widthCreater(),
      height: heightCreater(),
      fontSize: fontSizeCreater(),
      color: colorCreater(),
      lineHeight: lineHeightCreater(),
      fontWeight: fontWeightCreater(),
      textAlign: textAlignCreater(),
      verticalAlign: verticalAlignCreater(),
      letterSpacing: letterSpacingCreater()
    }
  },
  {
    component: 'button',
    id: 'button',
    type: 'dom',
    tabType: 'element',
    collapseType: 'common',
    label: '按钮',
    propValue: textareaCreater({
      value: '按钮'
    }),
    icon: 'menu',
    businessData: {},
    events: eventsCreater(),
    style: {
      width: widthCreater({ value: 100 }),
      height: heightCreater({ value: 34 }),
      fontSize: fontSizeCreater(),
      color: colorCreater(),
      lineHeight: lineHeightCreater(),
      fontWeight: fontWeightCreater(),
      backgroundColor: backgroundColorCreater(),
      borderWidth: borderWidthCreater(),
      borderStyle: borderStyleCreater(),
      borderColor: borderColorCreater(),
      borderRadius: borderRadiusCreater(),
      textAlign: textAlignCreater(),
      verticalAlign: verticalAlignCreater(),
      letterSpacing: letterSpacingCreater()
    }
  },
  {
    component: 'rectangle',
    id: 'rectangle',
    type: 'dom',
    tabType: 'element',
    collapseType: 'common',
    label: '矩形',
    propValue: textareaCreater(),
    icon: 'full-screen',
    businessData: {},
    events: eventsCreater(),
    style: {
      width: widthCreater(),
      height: heightCreater({
        value: 200
      }),
      fontSize: fontSizeCreater(),
      color: colorCreater(),
      lineHeight: lineHeightCreater(),
      fontWeight: fontWeightCreater(),
      textAlign: textAlignCreater(),
      verticalAlign: verticalAlignCreater(),
      letterSpacing: letterSpacingCreater(),
      borderWidth: borderWidthCreater(),
      borderStyle: borderStyleCreater({ value: 'solid' }),
      borderColor: borderColorCreater(),
      borderRadius: borderRadiusCreater(),
      backgroundColor: backgroundColorCreater()
    }
  },
  {
    component: 'picture',
    id: 'picture',
    type: 'dom',
    tabType: 'element',
    collapseType: 'common',
    label: '图片',
    icon: 'picture',
    propValue: textareaCreater({
      value: logo
    }),
    businessData: {},
    events: eventsCreater(),
    style: {
      width: widthCreater(),
      height: heightCreater({ value: 200 }),
      borderRadius: borderRadiusCreater()
    }
  },
  {
    component: 'line',
    id: 'line',
    type: 'svg',
    tabType: 'element',
    collapseType: 'common',
    label: '直线',
    icon: 'bottom-right',
    propValue: textareaCreater(),
    businessData: {},
    style: {
      width: widthCreater(),
      height: heightCreater({ value: 200 }),
      lineColor: lineColorCreater(),
      lineType: lineTypeCreater(),
      sourceX: sourceXCreater({ value: 10 }),
      sourceY: sourceYCreater({ value: 10 }),
      targetX: targetXCreater({
        value: 180
      }),
      targetY: targetYCreater({
        value: 180
      })
    }
  },
  {
    component: 'time',
    id: 'time',
    type: 'dom',
    tabType: 'element',
    collapseType: 'common',
    label: '时间',
    icon: 'timer',
    propValue: textareaCreater(),
    businessData: {},
    style: {
      width: widthCreater(),
      height: heightCreater({ value: 22 }),
      fontSize: fontSizeCreater(),
      color: colorCreater(),
      lineHeight: lineHeightCreater(),
      fontWeight: fontWeightCreater(),
      textAlign: textAlignCreater(),
      verticalAlign: verticalAlignCreater(),
      letterSpacing: letterSpacingCreater(),
      backgroundColor: backgroundColorCreater(),
      borderWidth: borderWidthCreater(),
      borderStyle: borderStyleCreater(),
      borderColor: borderColorCreater()
    }
  },
  {
    component: 'variable',
    id: 'variable',
    type: 'dom',
    tabType: 'element',
    collapseType: 'common',
    label: '变量值',
    icon: 'switch',
    propValue: textareaCreater({ hidden: true }),
    businessData: {
      dataResourceType: selectCreater({
        label: '数据源类型',
        options: [
          { label: 'IoT平台', value: 'IoT平台' },
          { label: '第三方', value: '第三方' }
        ]
      }),
      IoTdataSource: IoTdataSourceCreater({
        label: '数据源-IoT'
      }),
      thirdDataSource: IoTdataSourceCreater({
        type: 'thirdDataSource',
        label: '数据源-第三方',
        value: {
          address: '',
          unit: ''
        }
      }),
      showRule: IoTdataSourceCreater({
        label: '展示规则',
        type: 'showRule',
        options: [
          { label: '平台规则', value: 'platform' },
          { label: '自定义规则', value: 'custom' }
        ],
        platFormRules: [],
        customRules: []
      }),
      dataDetail: IoTdataSourceCreater({
        type: 'dataDetail',
        label: '数据详情',
        value: {
          showDetail: false,
          showUnit: false
        }
      })
    },
    style: {
      width: widthCreater({ value: 100 }),
      height: heightCreater(),
      fontSize: fontSizeCreater(),
      color: colorCreater(),
      lineHeight: lineHeightCreater(),
      fontWeight: fontWeightCreater(),
      textAlign: textAlignCreater({ value: 'center' }),
      verticalAlign: verticalAlignCreater({ value: 'middle' }),
      letterSpacing: letterSpacingCreater(),
      backgroundColor: backgroundColorCreater(),
      borderWidth: borderWidthCreater(),
      borderStyle: borderStyleCreater(),
      borderColor: borderColorCreater()
    }
  },
  {
    component: 'picture',
    id: 'image',
    type: 'dom',
    tabType: 'image',
    collapseType: 'system',
    label: '',
    icon: '',
    propValue: textareaCreater(),
    businessData: {},
    events: eventsCreater(),
    style: {
      width: widthCreater({ value: 50 }),
      height: heightCreater({ value: 50 }),
      borderRadius: borderRadiusCreater()
    }
  }
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle(), ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
