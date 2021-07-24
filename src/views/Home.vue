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
      <section class="right">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="数据" name="data">
            <data-list v-if="curComponent" />
          </el-tab-pane>
          <el-tab-pane label="样式" name="style">
            <attr-list v-if="curComponent" />
          </el-tab-pane>
        </el-tabs>
      </section>
    </main>
  </div>
</template>

<script>
import { useStore } from "vuex";
import componentListData from "@/custom-component/componentList";
import Toolbar from "comps/Toolbar.vue";
import ComponentList from "comps/ComponentList.vue";
import Editor from "comps/editor/Index.vue";
import { deepClone } from "utils/utils";
import { v4 as uuidv4 } from "uuid";
import { computed, ref, onMounted, onBeforeMount } from "vue";
import DataList from "comps/DataList.vue";
import AttrList from "comps/AttrList.vue";

export default {
  name: "home",
  components: {
    Toolbar,
    ComponentList,
    Editor,
    DataList,
    AttrList,
  },
  setup() {
    const store = useStore();
    const isClickComponent = computed(() => store.state.isClickComponent);

    onBeforeMount(() => {
      store.commit('setEditMode','edit');
      const canvasData = JSON.parse(sessionStorage.getItem("canvasData"));
      if (canvasData) {
        store.commit("setComponentData", canvasData.componentData);
        store.commit("setCanvasStyleData", canvasData.canvasStyleData);
      }
    });

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const component = deepClone(
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

    const activeTab = ref("style");
    const curComponent = computed(() => store.state.curComponent);
    // onMounted(() => {
    //   let num = 1000
    //   while (num>0) {
    //     console.log('num',num);

    //     const index = Math.floor( Math.random()*4)
    //     const component = deepClone(
    //     componentListData[index]
    //   );
    //     const left = Math.random()*1000
    //     const top = Math.random()*600
    //     console.log(left,top);

    //     component.style.left = left;
    //     component.style.top = top;
    //     component.id = num;
    //     console.log(index,component);
    //       store.commit("addComponent", { component });

    //     num--
    //   }
    // });

    return {
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent,
      activeTab,
      curComponent,
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

      ::v-deep(.el-tabs__header) {
        margin-bottom: 0;
      }
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
  ::v-deep(.el-tabs__nav-wrap) {
    padding: 0 20px;
  }
}
</style>
