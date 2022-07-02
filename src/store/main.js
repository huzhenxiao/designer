import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    editMode: '', // 编辑器模式 edit preview
    componentData: [], // 画布组件数据
    // 点击画布时是否点中组件，主要用于取消选中组件用。
    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,
    curComponent: null,
    curComponentIndex: -1,
    canvasStyleData: {
      // 页面全局数据
      width: 1200,
      height: 740,
      scale: 100
    },
    throttleDelay: 1000 / 60
  }),
  actions: {
    addComponent({ component, index }) {
      if (index !== undefined) {
        this.componentData.splice(index, 0, component);
      } else {
        this.componentData.push(component);
      }
    },
    setClickComponentStatus(status) {
      this.isClickComponent = status;
    },
    setCurComponent({ component, index }) {
      this.curComponent = component;
      this.curComponentIndex = index;
    },
    setShapeStyle({ top, left, width, height, rotate }) {
      if (top) this.curComponent.style.top.value = top.value;
      if (left) this.curComponent.style.left.value = left.value;
      if (width) this.curComponent.style.width.value = width.value;
      if (height) this.curComponent.style.height.value = height.value;
      if (rotate) this.curComponent.style.rotate.value = rotate.value;
    },
    deleteComponent(index) {
      if (index === undefined) {
        index = this.curComponentIndex;
      }
      if (index === this.curComponentIndex) {
        this.curComponent = null;
        this.curComponentIndex = null;
      }
      this.componentData.splice(index, 1);
    },
    setComponentData(componentData = []) {
      this.componentData = componentData;
    },
    setCurComponentStyle({ key, value }) {
      if (!this.curComponent) return;
      this.curComponent.style[key].value = value;
    },
    setCurComponentBusinessData({ key, value }) {
      if (!this.curComponent) return;
      if (key === 'propValue') {
        this.curComponent.propValue.value = value;
      } else {
        this.curComponent.businessData[key].value = value;
      }
    },
    setEditMode(value) {
      this.editMode = value;
    },
    setCanvasStyleDataByKey({ key, value }) {
      this.canvasStyleData[key] = value;
    },
    setCanvasStyleData(value) {
      this.canvasStyleData = value;
    }
  }
});
