<template>
  <div class="data-detail">
    <div class="content-wrap">
      <span class="label"
        >数据详情<el-tooltip
          effect="dark"
          content="选中后预览时双击鼠标左键触发"
          placement="top"
        >
          <el-icon><question-filled /></el-icon> </el-tooltip
      ></span>
      <div class="content">
        <el-checkbox
          v-model="props.data.value.showDetail"
          label="显示"
          :value="true"
        />
      </div>
    </div>
    <div class="content-wrap">
      <span class="label">变量值单位</span>
      <div class="content">
        <el-checkbox
          v-model="props.data.value.showUnit"
          label="显示"
          :value="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    require: true
  },
  businessData: {
    require: true,
    type: Object
  }
});
</script>

<style lang="scss" scoped>
.data-detail {
  .content-wrap {
    display: flex;
    .label {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #666;
      padding: 0 10px;
      flex: 0 0 70px;
    }
    .content {
      display: flex;
      .el-checkbox {
        margin-right: 10px;
      }
    }
  }
}
</style>
