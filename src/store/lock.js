import { defineStore } from "pinia";
import { useMainStore } from "./main";
export const useLockStore = defineStore({
  id: "lock",
  state: () => {
    return {};
  },
  actions: {
    lock() {
      useMainStore().curComponent.isLock = true;
    },
    unlock() {
      useMainStore().curComponent.isLock = false;
    }
  }
});
