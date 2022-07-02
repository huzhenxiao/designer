import { deepClone } from "utils/utils";
import { nanoid } from 'nanoid'
import { defineStore } from "pinia";
import {useMainStore,useContextmenuStore} from './index';
const mainStore = useMainStore();
const contextmenuStore = useContextmenuStore();

export const useCopyStore = defineStore({
  id: "copy",
  state: () => {
    return {
      copyData: null,
      isCut: false,
    };
  }, 
  actions: {
    copy() {
      if (!mainStore.curComponent) return;
      this.copyData = {
        data: deepClone(mainStore.curComponent),
        index: this.curComponentIndex,
      };
      this.isCut = false;
    },
    cut() {
      if (!mainStore.curComponent) return;
      this.copy();
      mainStore.deleteComponent();
      this.isCut = true;
    },
    paste(isMouse) {
      if (!this.copyData) return;
      const data = this.copyData.data;
      if (isMouse) {
        data.style.left.value = contextmenuStore.menuLeft;
        data.style.top.value = contextmenuStore.menuTop;
      } else {
        data.style.top.value += 10;
        data.style.left.value += 10;
      }
      data.id = nanoid();
      mainStore.addComponent({ component: deepClone(data) });

      if (this.isCut) {
        this.copyData = null;
      }
    },
  }
});
