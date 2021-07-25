import { deepClone } from "utils/utils";
import { v4 as uuidv4 } from "uuid";

export default {
  state: {
    copyData: null,
    isCut: false,
  },
  mutations: {
    copy(state) {
      if (!state.curComponent) return;
      state.copyData = {
        data: deepClone(state.curComponent),
        index: state.curComponentIndex,
      };
      state.isCut = false;
    },
    cut(state) {
      if (!state.curComponent) return;
      if (state.copyData) {
        const component = deepClone(state.copyData.data);
        component.id = uuidv4();
        this.commit("addComponent", {
          component,
        });
      }
      this.commit("copy");
      this.commit("deleteComponent");
      state.isCut = true;
    },
    paste(state, isMouse) {
      if (!state.copyData) return;
      const data = state.copyData.data;
      if (isMouse) {
        data.style.left = state.menuLeft;
        data.style.top = state.menuTop;
      } else {
        data.style.top += 10;
        data.style.left += 10;
      }
      data.id = uuidv4();
      this.commit("addComponent", { component: deepClone(data) });

      if (state.isCut) {
        state.copyData = null;
      }
    },
  },
};
