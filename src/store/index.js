import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      componentData: [], // 画布组件数据
      canvasStyleData: { // 页面全局数据
        width: 1200,
        height: 740,
        scale: 100,
    },
    };
  },
  mutations: {
    addComponent(state, { component, index }) {
      if (index !== undefined) {
          state.componentData.splice(index, 0, component)
      } else {
          state.componentData.push(component)
      }
  },
  },
});

export default store;
