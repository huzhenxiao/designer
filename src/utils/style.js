/*
 * @Author: your name
 * @Date: 2021-07-02 00:00:02
 * @LastEditTime: 2021-07-24 21:02:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/utils/style.js
 */

import { cos, sin } from './translate';

export function getStyleInclude(style = {}, contain = []) {
  const needUnit = [
    'fontSize',
    'lineHeight',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius'
  ];

  const result = {};
  Object.keys(style).forEach((key) => {
    if (contain.includes(key)) {
      if (key !== 'rotate') {
        result[key] = needUnit.includes(key) ? `${style[key].value}px` : style[key].value;
      } else {
        result.transform = `${key}(${style[key].value}deg)`;
      }
    }
  });

  return result;
}

export function getStyleExclude(style = {}, filter = []) {
  const needUnit = [
    'fontSize',
    'lineHeight',
    'width',
    'height',
    'top',
    'left',
    'borderWidth',
    'letterSpacing',
    'borderRadius'
  ];

  const result = {};
  Object.keys(style).forEach((key) => {
    if (!filter.includes(key)) {
      if (key !== 'rotate') {
        result[key] = needUnit.includes(key) ? `${style[key].value}px` : style[key].value;
      } else {
        result.transform = `${key}(${style[key].value}deg)`;
      }
    }
  });

  return result;
}

export function getComponentRotatedStyle(style) {
  const rotatedStyle = {};
  if (style.rotate.value === 0) {
    rotatedStyle.left = style.left.value;
    rotatedStyle.top = style.top.value;
    rotatedStyle.right = style.left.value + style.width.value;
    rotatedStyle.bottom = style.top.value + style.height.value;
    rotatedStyle.width = style.width.value;
    rotatedStyle.height = style.height.value;
  } else {
    const newWidth =
      style.width.value * Math.abs(cos(style.rotate.value)) +
      style.height.value * Math.abs(sin(style.rotate.value));
    const diffX = (style.width.value - newWidth) / 2;
    rotatedStyle.left = style.left.value + diffX;
    rotatedStyle.right = rotatedStyle.left + newWidth;

    const newHeight =
      style.height.value * Math.abs(cos(style.rotate.value)) +
      style.width.value * Math.abs(sin(style.rotate.value));
    const diffY = (style.height.value - newHeight) / 2;
    rotatedStyle.top = style.top.value + diffY;
    rotatedStyle.bottom = rotatedStyle.top + newHeight;
    rotatedStyle.width = newWidth;
    rotatedStyle.height = newHeight;
  }
  return rotatedStyle;
}
