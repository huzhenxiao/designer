<template>
  <div class="toolbar">
    <el-button @click="undo" :disabled="snapshotIndex === -1" size="small"
      >撤消</el-button
    >
    <el-button
      @click="redo"
      :disabled="snapshotIndex === snapshotData.length - 1"
      size="small"
      >重做</el-button
    >
    <!-- <label for="input" class="insert">插入图片</label> -->
    <!-- <input type="file" @change="handleFileChange" id="input" hidden /> -->
    <el-button @click="clearCanvas" size="small">清空画布</el-button>
    <el-button @click="setTop" :disabled="!curComponent" size="small"
      >置顶</el-button
    >
    <el-button @click="setBottom" :disabled="!curComponent" size="small"
      >置底</el-button
    >
    <el-button
      @click="compose"
      :disabled="areaData.components.length < 2"
      size="small"
      >组合</el-button
    >
    <el-button
      @click="decompose"
      :disabled="
        !curComponent ||
        curComponent.isLock ||
        curComponent.component !== 'group'
      "
      size="small"
      >拆分</el-button
    >

    <el-button
      @click="lock"
      :disabled="!curComponent || curComponent.isLock"
      size="small"
      >锁定</el-button
    >
    <el-button
      @click="unlock"
      :disabled="!curComponent || !curComponent.isLock"
      size="small"
      >解锁</el-button
    >
    <div class="canvas-config">
      <span class="label">画布大小</span>
      <el-input
        :modelValue="canvasStyleData.width"
        @input="handleCanvasStyleChange('width', $event)"
        size="small"
      >
        <template #suffix>
          <span>px</span>
        </template>
      </el-input>
      <span>&nbsp;*&nbsp;</span>
      <el-input
        :modelValue="canvasStyleData.height"
        @input="handleCanvasStyleChange('height', $event)"
        size="small"
      >
        <template #suffix>
          <span>px</span>
        </template>
      </el-input>
    </div>
    <div class="canvas-config">
      <span class="label">缩放</span>
      <el-select
        :modelValue="canvasStyleData.scale"
        @change="handleScaleChange"
        size="small"
      >
        <el-option
          v-for="item in scaleOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-button @click="preview" size="small">预览</el-button>
    <el-button @click="save" size="small">保存</el-button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import {
  useMainStore,
  useComposeStore,
  useSnapshotStore,
  useLockStore,
  useLayerStore,
} from "@/store";
import { deepClone } from "utils/utils";
export default {
  setup() {
    const scaleOptions = [
      {
        label: "50%",
        value: 50,
      },
      {
        label: "75%",
        value: 75,
      },
      {
        label: "100%",
        value: 100,
      },
      {
        label: "125%",
        value: 125,
      },
      {
        label: "150%",
        value: 150,
      },
      {
        label: "200%",
        value: 200,
      },
      {
        label: "300%",
        value: 300,
      },
    ];
    const mainStore = useMainStore();
    const composeStore = useComposeStore();
    const snapshotStore = useSnapshotStore();
    const lockStore = useLockStore();
    const layerStore = useLayerStore();

    const { curComponent, componentData, canvasStyleData } = storeToRefs(
      mainStore
    );
    const { areaData } = storeToRefs(composeStore);
    const { snapshotData, snapshotIndex } = storeToRefs(snapshotStore);
    const router = useRouter();

    const undo = () => {
      snapshotStore.undo();
    };

    const redo = () => {
      snapshotStore.redo();
    };

    const lock = () => {
      lockStore.lock();
    };

    const clearCanvas = () => {
      mainStore.setComponentData([]);
      snapshotStore.recordSnapshot();
    };

    const setTop = () => {
      console.log(curComponent);
      layerStore.setTopComponent();
    };

    const setBottom = () => {
      console.log(curComponent);
      layerStore.setBottomComponent();
    };

    const compose = () => {
      composeStore.compose();
      snapshotStore.recordSnapshot();
    };

    const decompose = () => {
      composeStore.decompose();
      snapshotStore.recordSnapshot();
    };

    const unlock = () => {
      lockStore.unlock();
    };

    const preview = () => {
      mainStore.setEditMode("preview");
      const routeUrl = router.resolve({
        path: "/preview",
      });
      sessionStorage.setItem(
        "canvasData",
        JSON.stringify({
          componentData: componentData.value,
          canvasStyleData: canvasStyleData.value,
        })
      );
      window.open(routeUrl.href, "_blank");
    };

    const save = () => {
      sessionStorage.setItem(
        "canvasData",
        JSON.stringify({
          componentData: componentData.value,
          canvasStyleData: canvasStyleData.value,
        })
      );
    };

    const handleCanvasStyleChange = (key, value) => {
      mainStore.setCanvasStyleDataByKey({ key, value });
    };

    const needToChangeStyle = [
      "top",
      "left",
      "width",
      "height",
      "fontSize",
      "borderWidth",
      "lineHeight",
      "borderRadius",
    ];
    const getScaleValue = (oldValue, newScale) =>
      ((oldValue / (parseInt(canvasStyleData.value.scale) / 100)) *
        parseInt(newScale)) /
      100;
    const handleScaleChange = (newScale) => {
      newScale = newScale || canvasStyleData.value.scale;
      const newComponentData = deepClone(componentData.value);
      newComponentData.forEach((component) => {
        Object.keys(component.style).forEach((key) => {
          if (needToChangeStyle.includes(key)) {
            component.style[key].value = getScaleValue(
              component.style[key].value,
              newScale
            );
          }
        });
      });
      mainStore.setComponentData(newComponentData);
      mainStore.setCanvasStyleDataByKey({
        key: "scale",
        value: newScale,
      });
    };

    return {
      curComponent,
      canvasStyleData,
      areaData,
      handleCanvasStyleChange,
      handleScaleChange,
      undo,
      redo,
      lock,
      unlock,
      clearCanvas,
      setTop,
      setBottom,
      compose,
      decompose,
      preview,
      save,
      scaleOptions,
      snapshotData,
      snapshotIndex,
    };
  },
};
</script>

<style lang="scss" scoped>
.toolbar {
  height: 64px;
  padding: 13px 10px;
  line-height: 64px;
  background: #fff;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  display: flex;

  .canvas-config {
    margin-left: 10px;
    display: flex;
    font-size: 14px;
    width: 300px;
    line-height: 24px;

    .label {
      flex: 0 0 66px;
    }
    :deep(.el-input) {
      width: 100px;
    }
  }
}
</style>
