/*
 * @Author: your name
 * @Date: 2021-07-01 23:29:28
 * @LastEditTime: 2021-07-27 22:40:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/utils/translate.js
 */
export function changeStyleWithScale(value, scale) {
  return (value * parseInt(scale)) / 100;
}

export function mod360(deg) {
  return (deg + 360) % 360;
}

export function toPercent(value) {
  return value * 100 + "%";
}

/**
 * @description: 角度转弧度
 * @param {Number} angle  角度
 * @return {Number} 弧度
 */
export function angleToRadian(angle) {
  return (angle * Math.PI) / 180;
}

export function getCenterPoint(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}

/**
 * @description: 计算根据圆心旋转后的点的坐标
 * @param {Object} point 旋转前的点坐标
 * @param {Object} center 旋转中心
 * @param {Number} rotate 旋转角度
 * @return {Object} 旋转后的坐标
 * https://www.zhihu.com/question/67425734/answer/252724399 旋转矩阵公式
 */
export function calculateRotatedPointCoordinate(point, center, rotate) {
  /**
   * 旋转公式：
   * 点a(x,y)
   * 旋转中心c(x,y)
   * 旋转后点n(x,y)
   * 旋转角度θ
   * nx = cosθ * (ax - cx) - sinθ * (ay - cy) + cx
   * ny = sinθ * (ax - cx) + cosθ * (ay - cy) + cy
   */
  return {
    x:
      Math.cos(angleToRadian(rotate)) * (point.x - center.x) -
      Math.sin(angleToRadian(rotate)) * (point.y - center.y) +
      center.x,
    y:
      Math.sin(angleToRadian(rotate)) * (point.x - center.x) +
      Math.cos(angleToRadian(rotate)) * (point.y - center.y) +
      center.y,
  };
}

export function cos(rotate) {
  return Math.cos(angleToRadian(rotate));
}

export function sin(rotate) {
  return Math.sin(angleToRadian(rotate));
}
