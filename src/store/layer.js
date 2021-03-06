import { defineStore } from 'pinia';
import { swap } from 'utils/utils';
import { useMainStore } from './main';

export const useLayerStore = defineStore({
  id: 'layer',
  state: () => ({}),
  actions: {
    setTopComponent() {
      const { componentData, curComponentIndex } = useMainStore();
      if (curComponentIndex === -1) return;
      if (curComponentIndex === componentData.length - 1) return;
      swap(componentData, curComponentIndex, componentData.length - 1);
      useMainStore().curComponentIndex = componentData.length - 1;
    },
    setBottomComponent() {
      const { componentData, curComponentIndex } = useMainStore();
      if (curComponentIndex === -1) return;
      if (curComponentIndex === 0) return;
      swap(componentData, curComponentIndex, 0);
      useMainStore().curComponentIndex = 0;
    },
    setUpComponent() {
      const { componentData, curComponentIndex } = useMainStore();
      if (curComponentIndex === componentData.length - 1) return;
      swap(componentData, curComponentIndex, curComponentIndex + 1);
      useMainStore().curComponentIndex = curComponentIndex + 1;
    },
    setDownComponent() {
      const { componentData, curComponentIndex } = useMainStore();
      if (curComponentIndex === 0) return;
      swap(componentData, curComponentIndex, curComponentIndex - 1);
      useMainStore().curComponentIndex = curComponentIndex - 1;
    }
  }
});
