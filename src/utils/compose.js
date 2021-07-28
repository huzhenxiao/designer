/*
 * @Author: your name
 * @Date: 2021-07-26 23:39:37
 * @LastEditTime: 2021-07-28 22:36:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/utils/compose.js
 */
import { $ } from "./utils";
import { mod360 } from "./translate";

// 将Group中的组件拆分
export function decomposeComponent(component, editorRect, parentStyle) {
  const componentRect = $(`#component${component.id}`).getBoundingClientRect();
  // 获取元素的中心点坐标
  const componentCenter = {
    x: componentRect.left - editorRect.left + componentRect.width / 2,
    y: componentRect.top - editorRect.top + componentRect.height / 2,
  };
  component.style.rotate = mod360(component.style.rotate + parentStyle.rotate);
  component.style.width =
    (parseFloat(component.groupStyle.width) / 100) * parentStyle.width;
  component.style.height =
    (parseFloat(component.groupStyle.height) / 100) * parentStyle.height;
  component.style.left = componentCenter.x - component.style.width / 2;
  component.style.top = componentCenter.y - component.style.height / 2;
  component.groupStyle = {};
}
