/*
 * @Author: your name
 * @Date: 2021-07-14 23:03:13
 * @LastEditTime: 2021-07-14 23:24:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/components/editor/index.js
 */
import { ref, reactive } from "vue";
import { getStyleExclude } from "utils/style";

export const useGetStyle = () => {
  const getShapeStyle = (style) => {
    return ["width", "height", "top", "left", "rotate"].reduce((pre, key) => {
      if (key === "rotate") {
        pre["transform"] = `rotate(${style[key]}deg)`;
      } else {
        pre[key] = `${style[key]}px`;
      }
      return pre;
    }, {});
  };

  const getComponentStyle = (style) =>
    getStyleExclude(style, ["top", "left", "width", "height", "rotate"]);

  return {
    getShapeStyle,
    getComponentStyle,
  };
};

export const useGetArea = () => {
  const areaWidth = ref(0);
  const areaHeight = ref(0);
  const areaStart = reactive({
    x: 0,
    y: 0,
  });
  const areaIsShow = ref(false);

  const hideArea = () => {
    areaWidth.value = 0;
    areaHeight.value = 0;
    areaIsShow.value = false;
  };
  return {
    areaWidth,
    areaHeight,
    areaStart,
    areaIsShow,
    hideArea,
  };
};
