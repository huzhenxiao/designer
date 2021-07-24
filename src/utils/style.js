/*
 * @Author: your name
 * @Date: 2021-07-02 00:00:02
 * @LastEditTime: 2021-07-24 21:02:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/utils/style.js
 */

import { cos, sin } from "./translate";

export function getStyleInclude(style = {}, contain = []) {
  const needUnit = [
    "fontSize",
    "lineHeight",
    "width",
    "height",
    "top",
    "left",
    "borderWidth",
    "letterSpacing",
    "borderRadius",
  ];

  const result = {};
  Object.keys(style).forEach((key) => {
    if (contain.includes(key)) {
      if (key !== "rotate") {
        result[key] = needUnit.includes(key) ? `${style[key]}px` : style[key];
      } else {
        result.transform = `${key}(${style[key]}deg)`;
      }
    }
  });

  return result;
}

export function getStyleExclude(style = {}, filter = []) {
  const needUnit = [
    "fontSize",
    "lineHeight",
    "width",
    "height",
    "top",
    "left",
    "borderWidth",
    "letterSpacing",
    "borderRadius",
  ];

  const result = {};
  Object.keys(style).forEach((key) => {
    if (!filter.includes(key)) {
      if (key !== "rotate") {
        result[key] = needUnit.includes(key) ? `${style[key]}px` : style[key];
      } else {
        result.transform = `${key}(${style[key]}deg)`;
      }
    }
  });

  return result;
}

export function getComponentRotatedStyle(style) {
  const rotatedStyle = { ...style };
  if (rotatedStyle.rotate === 0) {
    rotatedStyle.right = rotatedStyle.left + rotatedStyle.width;
    rotatedStyle.bottom = rotatedStyle.top + rotatedStyle.height;
  } else {
    const newWidth =
      rotatedStyle.width * Math.abs(cos(rotatedStyle.rotate)) +
      rotatedStyle.height * Math.abs(sin(rotatedStyle.rotate));
    const diffX = (rotatedStyle.width - newWidth) / 2;
    rotatedStyle.left += diffX;
    rotatedStyle.right = rotatedStyle.left + newWidth;

    const newHeight =
      rotatedStyle.height * Math.abs(cos(rotatedStyle.rotate)) +
      rotatedStyle.width * Math.abs(sin(rotatedStyle.rotate));
    const diffY = (rotatedStyle.height - newHeight) / 2;
    rotatedStyle.top += diffY;
    rotatedStyle.bottom = rotatedStyle.top + newHeight;
    rotatedStyle.width = newWidth;
    rotatedStyle.height = newHeight;
  }
  return rotatedStyle;
}
