import { defineStore } from "pinia";

export const useContextmenuStore = defineStore({
  id: "contextmenu",
  state: () => {
    return {
      menuLeft: 0,
      menuTop: 0,
      menuShow: false
    };
  },
  actions: {
    showContextMenu({ left, top }) {
      this.menuLeft = left;
      this.menuTop = top;
      this.menuShow = true;
    },
    hideContextMenu() {
      this.menuShow = false;
    }
  }
});
