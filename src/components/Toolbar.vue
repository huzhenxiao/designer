<!--
 * @Author: your name
 * @Date: 2021-06-30 21:20:32
 * @LastEditTime: 2021-07-28 22:56:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/components/Toolbar.vue
-->
<template>
  <div class="toolbar">
    <el-button @click="undo" :disabled="snapshotIndex === -1" size="medium"
      >撤消</el-button
    >
    <el-button
      @click="redo"
      :disabled="snapshotIndex === snapshotData.length - 1"
      size="medium"
      >重做</el-button
    >
    <!-- <label for="input" class="insert">插入图片</label> -->
    <!-- <input type="file" @change="handleFileChange" id="input" hidden /> -->
    <el-button @click="preview" size="medium">预览</el-button>
    <el-button @click="save" size="medium">保存</el-button>
    <el-button @click="clearCanvas" size="medium">清空画布</el-button>
    <el-button @click="setTop" size="medium">置顶</el-button>
    <el-button @click="setBottom" size="medium">置底</el-button>
    <el-button
      @click="compose"
      :disabled="!areaData.components.length"
      size="medium"
      >组合</el-button
    >
    <el-button
      @click="decompose"
      :disabled="
        !curComponent ||
        curComponent.isLock ||
        curComponent.component !== 'Group'
      "
      size="medium"
      >拆分</el-button
    >

    <el-button
      @click="lock"
      :disabled="!curComponent || curComponent.isLock"
      size="medium"
      >锁定</el-button
    >
    <el-button
      @click="unlock"
      :disabled="!curComponent || !curComponent.isLock"
      size="medium"
      >解锁</el-button
    >
    <div class="canvas-config">
      <span class="label">画布大小</span>
      <el-input
        :modelValue="canvasStyleData.width"
        @input="handleCanvasStyleChange('width', $event)"
        size="mini"
      >
        <template #suffix>
          <span>px</span>
        </template>
      </el-input>
      <span>&nbsp;*&nbsp;</span>
      <el-input
        :modelValue="canvasStyleData.height"
        @input="handleCanvasStyleChange('height', $event)"
        size="mini"
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
        size="medium"
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
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
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
    const store = useStore();
    const router = useRouter();
    const curComponent = computed(() => store.state.curComponent);
    const componentData = computed(() => store.state.componentData);
    const canvasStyleData = computed(() => store.state.canvasStyleData);
    const areaData = computed(() => store.state.areaData);
    const snapshotData = computed(() => store.state.snapshotData);
    const snapshotIndex = computed(() => store.state.snapshotIndex);

    const undo = () => {
      store.commit("undo");
    };

    const redo = () => {
      store.commit("redo");
    };

    const lock = () => {
      store.commit("lock");
    };

    const clearCanvas = () => {
      store.commit("setComponentData", []);
      store.commit("recordSnapshot");
    };

    const setTop = () => {
      store.commit("setTopComponent");
    };

    const setBottom = () => {
      store.commit("setBottomComponent");
    };

    const compose = () => {
      store.commit("compose");
      store.commit("recordSnapshot");
    };

    const decompose = () => {
      store.commit("decompose");
      store.commit("recordSnapshot");
    };

    const unlock = () => {
      store.commit("unlock");
    };

    const preview = () => {
      store.commit("setEditMode", "preview");
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
      store.commit("setCanvasStyleDataByKey", { key, value });
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
            component.style[key] = getScaleValue(
              component.style[key],
              newScale
            );
          }
        });
      });
      store.commit("setComponentData", newComponentData);
      store.commit("setCanvasStyleDataByKey", {
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
    line-height: 38px;

    .label {
      flex: 0 0 66px;
    }
    ::v-deep(.el-input) {
      line-height: 38px;
      width: 100px;
    }
  }
}
</style>
