import { $ } from './utils';
import { mod360 } from './translate';

// 将Group中的组件拆分
export function decomposeComponent(component, editorRect, parentStyle) {
  const componentRect = $(`#component${component.id}`).getBoundingClientRect();
  // 获取元素的中心点坐标
  const componentCenter = {
    x: componentRect.left - editorRect.left + componentRect.width / 2,
    y: componentRect.top - editorRect.top + componentRect.height / 2
  };
  component.style.rotate.value = mod360(component.style.rotate.value + parentStyle.rotate.value);
  component.style.width.value =
    (parseFloat(component.groupStyle.width) / 100) * parentStyle.width.value;
  component.style.height.value =
    (parseFloat(component.groupStyle.height) / 100) * parentStyle.height.value;
  component.style.left.value = componentCenter.x - component.style.width.value / 2;
  component.style.top.value = componentCenter.y - component.style.height.value / 2;
  component.groupStyle = {};
}
