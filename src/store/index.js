import { createStore } from "vuex";
import compose from "./compose";
import contextmenu from "./contextmenu";
import lock from "./lock";

const store = createStore({
  state() {
    return {
      ...compose.state,
      ...contextmenu.state,

      editMode: "edit", // 编辑器模式 edit preview
      componentData: [], // 画布组件数据
      // 点击画布时是否点中组件，主要用于取消选中组件用。
      // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
      isClickComponent: false,
      curComponent: null,
      curComponentIndex: null,
      canvasStyleData: {
        // 页面全局数据
        width: 1200,
        height: 740,
        scale: 100,
      },
    };
  },
  mutations: {
    ...compose.mutations,
    ...contextmenu.mutations,
    ...lock.mutations,
    addComponent(state, { component, index }) {
      if (index !== undefined) {
        state.componentData.splice(index, 0, component);
      } else {
        state.componentData.push(component);
      }
    },
    setClickComponentStatus(state, status) {
      state.isClickComponent = status;
    },
    setCurComponent(state, { component, index }) {
      state.curComponent = component;
      state.curComponentIndex = index;
    },
    setShapeStyle({ curComponent }, { top, left, width, height, rotate }) {
      if (top) curComponent.style.top = top;
      if (left) curComponent.style.left = left;
      if (width) curComponent.style.width = width;
      if (height) curComponent.style.height = height;
      if (rotate) curComponent.style.rotate = rotate;
    },
    deleteComponent(state, index) {
      if (index === undefined) {
        index = state.curComponentIndex;
      }
      if (index === state.curComponentIndex) {
        state.curComponent = null;
        state.curComponentIndex = null;
      }
      state.componentData.splice(index, 1);
    },
  },
});

export default store;
