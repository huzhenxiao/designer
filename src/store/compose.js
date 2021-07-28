/*
 * @Author: your name
 * @Date: 2021-07-05 21:43:23
 * @LastEditTime: 2021-07-28 22:34:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/store/compose.js
 */
import { $ } from "utils/utils";
import { decomposeComponent } from "utils/compose";
import { v4 as uuidv4 } from "uuid";
import { commonStyle, commonAttr } from "@/custom-component/componentList";
import emitter from "utils/eventBus";

export default {
  state: {
    editor: null,
    areaData: {
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      },
      components: [],
    },
  },
  mutations: {
    getEditor(state) {
      state.editor = $("#editor");
    },
    setAreaData(state, data) {
      state.areaData = data;
    },
    compose({ componentData, areaData, editor }) {
      const components = [];
      areaData.components.forEach((component) => {
        if (component.component !== "Group") {
          components.push(component);
        } else {
          // 如果组合的组件中已经存在组合数据，则需要先拆分
          const parentStyle = { ...component.style };
          const subComponents = component.propValue;
          const editorRect = editor.getBoundingClientRect();
          // 原先是组合的需要先拆分
          subComponents.forEach((component) => {
            decomposeComponent(component, editorRect, parentStyle);
          });
          components.push(...component.propValue);
        }
      });

      this.commit("addComponent", {
        component: {
          id: uuidv4(),
          component: "Group",
          style: {
            ...commonStyle,
            ...areaData.style,
          },
          label: "组合",
          propValue: components,
          businessData: {},
          ...commonAttr,
        },
      });

      emitter.emit("hideArea");

      this.commit("batchDeleteComponent", areaData.components);

      this.commit("setCurComponent", {
        component: componentData[componentData.length - 1],
        index: componentData.length - 1,
      });

      areaData.components = [];
    },
    // 组合后的component需要从componentData中删除
    batchDeleteComponent({ componentData }, deleteData) {
      deleteData.forEach((component) => {
        for (let i = 0; i < componentData.length; i++) {
          if (component.id === componentData[i].id) {
            componentData.splice(i, 1);
            break;
          }
        }
      });
    },
    decompose({ curComponent, editor }) {
      const parentStyle = { ...curComponent.style };
      const components = curComponent.propValue;
      const editorRect = editor.getBoundingClientRect();
      this.commit("deleteComponent");
      components.forEach((component) => {
        decomposeComponent(component, editorRect, parentStyle);
        this.commit("addComponent", { component });
      });
    },
  },
};
