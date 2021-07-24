/*
 * @Author: your name
 * @Date: 2021-06-30 22:26:05
 * @LastEditTime: 2021-07-24 15:42:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /designer/my-designer/src/custom-component/componentList.js
 */
import logo from "assets/logo.png";
// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
  left: 0,
  top: 0,
};

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};

// 编辑器左侧组件列表
const list = [
  {
    component: "v-text",
    label: "文字",
    propValue: "双击编辑文字",
    icon: "el-icon-edit",
    businessData: {},
    style: {
      width: 200,
      height: 22,
      fontSize: 14,
      color: "",
      lineHeight: "",
      fontWeight: 500,
      textAlign: "",
      verticalAlign: "",
      letterSpacing: 0,
    },
  },
  {
    component: "v-button",
    label: "按钮",
    propValue: "按钮",
    icon: "el-icon-menu",
    businessData: {},
    style: {
      width: 100,
      height: 34,
      fontSize: 14,
      color: "",
      lineHeight: "",
      fontWeight: 500,
      backgroundColor: "",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#000",
      borderRadius: "",
      textAlign: "",
      letterSpacing: 0,
    },
  },
  {
    component: "pic",
    label: "图片",
    icon: "el-icon-picture",
    propValue: logo,
    businessData: {},
    style: {
      width: 200,
      height: 200,
      borderRadius: "",
    },
  },
  {
    component: "rect-shape",
    label: "矩形",
    propValue: "&nbsp;",
    icon: "el-icon-full-screen",
    businessData: {},
    style: {
      width: 200,
      height: 200,
      fontSize: 14,
      color: "",
      lineHeight: "",
      fontWeight: 500,
      textAlign: "center",
      verticalAlign: "",
      letterSpacing: 0,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#000",
      backgroundColor: "",
    },
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  item.style = { ...commonStyle, ...item.style };
  list[i] = { ...commonAttr, ...item };
}

export default list;
