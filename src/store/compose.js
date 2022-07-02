import { $ } from 'utils/utils';
import { decomposeComponent } from 'utils/compose';
import { nanoid } from 'nanoid';
import emitter from 'utils/eventBus';
import { defineStore } from 'pinia';
import { commonStyle, commonAttr } from '@/metaComponent/componentList';
import { useMainStore } from './main';

const mainStore = useMainStore();

export const useComposeStore = defineStore({
  id: 'compose',
  state: () => ({
    editor: null,
    areaData: {
      style: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      components: []
    }
  }),
  actions: {
    getEditor() {
      this.editor = $('#editor');
    },
    setAreaData(data) {
      this.areaData = data;
    },
    compose() {
      const components = [];
      this.areaData.components.forEach((component) => {
        if (component.component !== 'Group') {
          components.push(component);
        } else {
          // 如果组合的组件中已经存在组合数据，则需要先拆分
          const parentStyle = { ...component.style };
          const subComponents = component.propValue;
          const editorRect = this.editor.getBoundingClientRect();
          // 原先是组合的需要先拆分
          subComponents.forEach((component) => {
            decomposeComponent(component, editorRect, parentStyle);
          });
          components.push(...component.propValue);
        }
      });

      mainStore.addComponent({
        component: {
          id: nanoid(),
          component: 'group',
          style: {
            ...commonStyle(),
            top: {
              value: this.areaData.style.top
            },
            left: {
              value: this.areaData.style.left
            },
            width: {
              value: this.areaData.style.width
            },
            height: {
              value: this.areaData.style.height
            }
          },
          label: '组合',
          propValue: '',
          children: components,
          businessData: {},
          ...commonAttr
        }
      });

      emitter.emit('hideArea');

      this.batchDeleteComponent();

      mainStore.setCurComponent({
        component: mainStore.componentData[mainStore.componentData.length - 1],
        index: mainStore.componentData.length - 1
      });

      this.areaData.components = [];
    },
    // 组合后的component需要从componentData中删除
    batchDeleteComponent() {
      this.areaData.components.forEach((component) => {
        for (let i = 0; i < mainStore.componentData.length; i++) {
          if (component.id === mainStore.componentData[i].id) {
            mainStore.componentData.splice(i, 1);
            break;
          }
        }
      });
    },
    decompose() {
      const parentStyle = { ...mainStore.curComponent.style };
      const components = mainStore.curComponent.children;
      const editorRect = this.editor.getBoundingClientRect();
      mainStore.deleteComponent();
      components.forEach((component) => {
        decomposeComponent(component, editorRect, parentStyle);
        mainStore.addComponent({ component });
      });
    }
  }
});
