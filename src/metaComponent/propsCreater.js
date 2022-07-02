
export function selectCreater(data) {
  return {
    type: "select",
    label: "",
    value: "",
    unit: "",
    options: [
    ],
    ...data
  };
}
export function leftCreater(data) {
  return {
    type: "input-number",
    label: "x坐标",
    value: 0,
    unit: "px",
    ...data
  };
}
export function topCreater(data) {
  return {
    type: "input-number",
    label: "y坐标",
    value: 0,
    unit: "px",
    ...data
  };
}
export function rotateCreater(data) {
  return {
    type: "input-number",
    label: "旋转",
    value: 0,
    unit: "°",
    ...data
  };
}
export function opacityCreater(data) {
  return {
    type: "input-number",
    label: "透明度",
    value: 1,
    unit: "",
    ...data
  };
}
export function widthCreater(data) {
  return {
    type: "input-number",
    label: "宽",
    value: 200,
    unit: "px",
    ...data
  };
}
export function heightCreater(data) {
  return {
    type: "input-number",
    label: "高",
    value: 22,
    unit: "px",
    ...data
  };
}
export function fontSizeCreater(data) {
  return {
    type: "input-number",
    label: "字体大小",
    value: 14,
    unit: "px",
    ...data
  };
}

export function colorCreater(data) {
  return {
    type: "color-picker",
    label: "字体颜色",
    value: "",
    unit: "",
    ...data
  };
}
export function backgroundColorCreater(data) {
  return {
    type: "color-picker",
    label: "背景颜色",
    value: "",
    unit: "",
    ...data
  };
}
export function lineHeightCreater(data) {
  return {
    type: "input-number",
    label: "行高",
    value: 14,
    unit: "px",
    ...data
  };
}
export function fontWeightCreater(data) {
  return {
    type: "input-number",
    label: "字体粗细",
    value: 500,
    unit: "",
    ...data
  };
}

export function textAlignCreater(data) {
  return {
    type: "select",
    label: "左右对齐",
    value: "left",
    unit: "",
    options: [
      {
        value: "left",
        label: "左对齐"
      },
      {
        value: "center",
        label: "居中"
      },
      {
        value: "right",
        label: "右对齐"
      }
    ],
    ...data
  };
}
export function verticalAlignCreater(data) {
  return {
    type: "select",
    label: "垂直对齐",
    value: "top",
    unit: "",
    options: [
      {
        value: "top",
        label: "顶对齐"
      },
      {
        value: "middle",
        label: "居中"
      },
      {
        value: "bottom",
        label: "底对齐"
      }
    ],
    ...data
  };
}
export function letterSpacingCreater(data) {
  return {
    type: "input-number",
    label: "字间距",
    value: "",
    unit: "",
    ...data
  };
}

export function borderWidthCreater(data) {
  return {
    type: "input-number",
    label: "边框宽度",
    value: 1,
    unit: "px",
    ...data
  };
}
export function borderStyleCreater(data) {
  return {
    type: "select",
    label: "边框风格",
    value: 1,
    unit: "",
    options: [
      {
        value: "solid",
        label: "实线"
      },
      {
        value: "dotted",
        label: "点线"
      },
      {
        value: "dashed",
        label: "虚线"
      }
    ],
    ...data
  };
}
export function borderColorCreater(data) {
  return {
    type: "color-picker",
    label: "边框风格",
    value: "#000",
    unit: "",
    ...data
  };
}
export function borderRadiusCreater(data) {
  return {
    type: "input-number",
    label: "边框圆角",
    value: 0,
    unit: "px",
    ...data
  };
}
export function lineTypeCreater(data) {
  return {
    type: "select",
    label: "直线类型",
    value: "target-arrowhead",
    unit: "",
    options: [
      {
        value: "target-arrowhead",
        label: "直线"
      },
      // {
      //   value: "vertices",
      //   label: "折线"
      // }
    ],
    ...data
  };
}
export function sourceXCreater(data) {
  return {
    type: "input-number",
    label: "source-x",
    value: 0,
    unit: "px",
    ...data
  };
}
export function sourceYCreater(data) {
  return sourceXCreater({
    label: "source-y",
    ...data
  });
}
export function targetXCreater(data) {
  return sourceXCreater({
    label: "target-x",
    ...data
  });
}
export function targetYCreater(data) {
  return sourceXCreater({
    label: "target-y",
    ...data
  });
}
export function lineColorCreater(data) {
  return {
    type: "color-picker",
    label: "线条颜色",
    value: "#000",
    unit: "",
    ...data
  };
}
export function textareaCreater(data) {
  return {
    hidden:false,
    type: "textarea",
    label: "内容",
    value: "",
    unit: "",
    ...data
  };
}

export function eventsCreater(data) {
  return {
    click: {
      type:'click',
      label: "点击",
      value:{
        single: {
          value: false,
          action: "openPage",
          pageOrLink: "",
          showType: "page"
        },
        double: {
          value: false,
          action: "openPage",
          pageOrLink: "",
          showType: "page"
        }
      }
    },
    ...data
  };
}

export function IoTdataSourceCreater(data) {
  return {
    type: "IoTDataSource",
    label: "数据源",
    value: "",
    unit: "",
    ...data
  };
}
