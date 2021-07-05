import { $ } from "utils/utils";

export default {
  state: {
    editor: null,
  },
  mutations: {
    getEditor(state) {
      state.editor = $("#editor");
    },
  },
};
