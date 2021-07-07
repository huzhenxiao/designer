<template>
  <div class="home">
    <header>
      <Toolbar />
    </header>
    <main>
      <section class="left">
        <ComponentList />
      </section>
      <section class="center">
        <div
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @mousedown="handleMouseDown"
          @mouseup="deselectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <!-- <section class="right">right</section> -->
    </main>
  </div>
</template>

<script>
import { useStore } from "vuex";
import componentListData from "@/custom-component/componentList";
import Toolbar from "comps/Toolbar.vue";
import ComponentList from "comps/ComponentList.vue";
import Editor from "comps/editor/Index.vue";
import { deepCopy } from "utils/utils";
import { v4 as uuidv4 } from "uuid";
import { computed } from "vue";

export default {
  name: "home",
  components: {
    Toolbar,
    ComponentList,
    Editor,
  },
  setup() {
    const store = useStore();
    const isClickComponent = computed(() => store.state.isClickComponent);

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const component = deepCopy(
        componentListData[e.dataTransfer.getData("index")]
      );
      component.style.left = e.offsetX;
      component.style.top = e.offsetY;
      component.id = uuidv4();
      store.commit("addComponent", { component });
    };
    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      console.log("handleDragOver");
    };
    const handleMouseDown = () => {
      store.commit("setClickComponentStatus", false);
      console.log("handleMouseDown");
    };
    const deselectCurComponent = (e) => {
      if (!isClickComponent.value) {
        store.commit("setCurComponent", { component: null, index: null });
      }
      // 0 左击 1 滚轮 2 右击
      if (e.button !== 2) {
        store.commit("hideContextMenu");
      }
      console.log("deselectCurComponent");
    };
    return {
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #fff;
  main {
    height: calc(100% - 65px);
    display: flex;

    .left {
      height: 100%;
      width: 300px;
      padding-top: 10px;
    }

    .right {
      height: 100%;
      width: 260px;
    }

    .center {
      flex: 1;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>
