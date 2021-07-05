export default {
  state: {
    menuLeft: 0,
    menuTop: 0,
    menuShow: false,
  },
  mutations: {
    showContextMenu(state, { left, top }) {
      state.menuLeft = left;
      state.menuTop = top;
      state.menuShow = true;
    },
    hideContextMenu(state) {
      state.menuShow = false;
    },
  },
};
