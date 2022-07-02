<template>
  <div class="component-list" @dragstart="handleDragStart">
    <el-scrollbar height="100%">
    <el-tabs v-model="activeTab" class="tabs">
      <el-tab-pane label="元件库" name="element">
        <el-collapse v-model="elementActive">
          <el-collapse-item title="普通元件" name="common">
            <div
              v-for="(item, index) in components['element-common']"
              :key="index"
              class="component-item"
              draggable="true"
              :data-id="item.component"
            >
              <div class="wrap-img">
                <el-icon><component :is="item.icon"/></el-icon>
              </div>
              <span class="text">{{ item.label }}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
      <el-tab-pane label="图库" name="image">
        <el-collapse v-model="imageActive">
          <el-collapse-item title="系统图库" name="system">
            <div
              v-for="(item, index) in components['image-system']"
              :key="index"
              class="component-item"
              draggable="true"
              :data-id="item.component"
            >
              <div class="image-system">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="item.propValue.value"
                  :data-id="item.id"
                  :data-url="item.propValue.value"
                  fit="fill"
                />
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-tab-pane>
    </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import cloneDeep from 'lodash/cloneDeep';
import componentList from "@/metaComponent/componentList";
const systemImgs = import.meta.globEager("/public/assets/defaultImg/*");

const handleDragStart = e => {
  e.dataTransfer.setData("id", e.target.dataset.id);
  e.dataTransfer.setData("imgUrl", e.target.dataset.url);
  
};
const components = reactive({});
const getImageIndex = (i) => i.propValue.value.split('/').pop().split('.').shift();
onMounted(() => {
  componentList.forEach(item => {
    components[`${item.tabType}-${item.collapseType}`] =
      components[`${item.tabType}-${item.collapseType}`] || [];
    components[`${item.tabType}-${item.collapseType}`].push(item);
  });
  const systemImgsComponent = components["image-system"].pop();
  Object.entries(systemImgs).forEach(([key, value]) => {
    const component = cloneDeep(systemImgsComponent);
    components["image-system"].push({
      ...component,
      propValue: {
        ...component.propValue,
        value: value.default
      },
    });
  });
  components["image-system"].sort((a,b)=>getImageIndex(a)-getImageIndex(b))
});
const activeTab = ref("element");
const elementActive = ref(["common"]);
const imageActive = ref(["system"]);
</script>

<style lang="scss" scoped>
.component-list {
  padding: 10px;

  .component-item {
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
    text-align: center;
    border-radius: 2px;
    margin-bottom: 10px;
    margin-right: 10px;
    color: #333;
    cursor: grab;

    &:hover {
      border-color: #3c78ff;
      color: #3c78ff;
    }
    .wrap-img {
      width: 30px;
      line-height: 20px;
      padding-top: 10px;
      margin: 0 auto;
    }
    .image-system{
      width: 100%;
      height: 100%;
    }

    .text {
      line-height: 24px;
      font-size: 15px;
    }

    &:active {
      cursor: grabbing;
    }
  }
  .el-tabs {
    width: 100%;
    height: 100%;
    .el-tab-pane {
      width: 100%;
      .el-collapse {
        width: 100%;
        :deep(.el-collapse-item__content) {
          display: flex;
          flex-wrap: wrap;
        }
      }
    }
  }
}
</style>
