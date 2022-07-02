<template>
  <div class="home">
    <header>
      <Toolbar />
    </header>
    <main>
      <section class="left">
        <PageManage class="left-multipage" />
        <ComponentList class="left-component-list" />
      </section>
      <section class="center">
        <el-scrollbar>
          <div
            class="content"
            @drop="handleDrop"
            @dragover="handleDragOver"
            @mousedown="handleMouseDown"
            @mouseup="deselectCurComponent"
          >
            <Editor />
          </div>
        </el-scrollbar>
      </section>
      <section class="right">
        <el-scrollbar>
          <el-tabs v-model="activeTab">
            <el-tab-pane label="样式" name="style">
              <attr-list v-if="curComponent" />
            </el-tab-pane>
            <el-tab-pane label="数据" name="data">
              <data-list v-if="curComponent" />
            </el-tab-pane>
            <el-tab-pane label="事件" name="events">
              <event-list v-if="curComponent" />
            </el-tab-pane>
          </el-tabs>
        </el-scrollbar>
      </section>
    </main>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { useMainStore, useSnapshotStore, useContextmenuStore } from "@/store";
import componentListData from "@/metaComponent/componentList";
import Toolbar from "comps/Toolbar.vue";
import ComponentList from "comps/ComponentList.vue";
import PageManage from "comps/PageManage.vue";
import Editor from "comps/editor/Index.vue";
import { deepClone } from "utils/utils";
import { nanoid } from "nanoid";
import { computed, ref, onMounted, onBeforeMount } from "vue";
import DataList from "comps/DataList.vue";
import AttrList from "comps/AttrList.vue";
import EventList from "comps/EventList.vue";

export default {
  name: "home",
  components: {
    Toolbar,
    ComponentList,
    PageManage,
    Editor,
    DataList,
    AttrList,
    EventList
  },
  setup() {
    const mainStore = useMainStore();
    const snapshotStore = useSnapshotStore();
    const contextmenuStore = useContextmenuStore();
    const { isClickComponent, curComponent } = storeToRefs(mainStore);
    onBeforeMount(() => {
      mainStore.setEditMode("edit");
      const canvasData = JSON.parse(sessionStorage.getItem("canvasData"));
      if (canvasData) {
        mainStore.setComponentData(canvasData.componentData);
        mainStore.setCanvasStyleData(canvasData.canvasStyleData);
      }
    });

    const handleDrop = e => {
      e.preventDefault();
      e.stopPropagation();

      const component = deepClone(
        componentListData.find(i => i.id === e.dataTransfer.getData("id"))
      );
      if (component.id === "image") {
        component.propValue.value = e.dataTransfer.getData("imgUrl");
      }

      component.style.left.value = e.offsetX;
      component.style.top.value = e.offsetY;
      component.id = nanoid();
      console.log("component", component);

      mainStore.addComponent({ component });
      mainStore.setCurComponent({ component });
      snapshotStore.recordSnapshot();
    };
    const handleDragOver = e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      console.log("handleDragOver");
    };
    const handleMouseDown = () => {
      mainStore.setClickComponentStatus(false);
      console.log("handleMouseDown");
    };
    const deselectCurComponent = e => {
      if (!isClickComponent.value) {
        mainStore.setCurComponent({ component: null, index: null });
      }
      // 0 左击 1 滚轮 2 右击
      if (e.button !== 2) {
        contextmenuStore.hideContextMenu();
      }
      console.log("deselectCurComponent");
    };

    const activeTab = ref("data");
    // onMounted(() => {
    //   let num = 3000
    //   while (num>0) {
    //     console.log('num',num);

    //     const index = Math.floor( Math.random()*7)
    //     const component = deepClone(
    //     componentListData[index]
    //   );
    //     const left = Math.random()*1000
    //     const top = Math.random()*600
    //     console.log(left,top);

    //     component.style.left.value = left;
    //     component.style.top.value = top;
    //     component.id = num;
    //     console.log(index,component);
    //       mainStore.addComponent({ component });

    //     num--
    //   }
    // });

    return {
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent,
      activeTab,
      curComponent
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  background: #fff;
  overflow: hidden;
  main {
    display: flex;
    height: calc(100% - 65px);
    .left {
      height: 100%;
      width: 250px;
      padding-top: 10px;
      box-sizing: border-box;
      .left-multipage {
        height: 200px;
      }
      .left-component-list {
        height: calc(100% - 200px);
      }
    }

    .right {
      height: 100%;
      width: 260px;
      :deep(.el-tabs__header) {
        margin-bottom: 0;
      }
    }

    .center {
      flex: 1;
      background: #f5f5f5;
      height: calc(100% - 65px);
      overflow: auto;
      padding: 20px;
      box-sizing: border-box;

      .content {
        width: 100%;
        height: 100%;
      }
    }
  }
  :deep(.el-tabs__nav-wrap) {
    padding: 0 20px;
  }
}
</style>
