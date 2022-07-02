<template>
  <div class="data-source">
    <div class="content">
      <span class="label">{{ props.data.label }}</span>
      <div class="content">
        <el-button type="text" @click="handleEdit">设置</el-button>
      </div>
    </div>
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark" /></el-col>
    </el-row>

    <el-dialog
      v-model="dialogVisible"
      title="设置第三方数据源"
      width="70%"
      top="10vh"
      center
      :before-close="handleClose"
    >
      <el-form :model="form" label-width="120px">
        <el-form-item label="地址">
          <el-input v-model="form.address" placeholder="请以http或者https开头" />
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="form.unit" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
const props = defineProps({
  data: {
    require: true
  }
});

const dialogVisible = ref(false);
const handleEdit = () => {
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};

const form = reactive({
  address: '',
  unit: ''
});
watch(
  () => dialogVisible.value,
  (dialogVisible, prevDialogVisible) => {
    if (dialogVisible) {
      form.address = props.data.value.address;
      form.unit = props.data.value.unit;
    }
  }
);

const emit = defineEmits(['valueChange']);
const handleConfirm = () => {
  emit('valueChange', cloneDeep(form));
  handleClose();
};
</script>
<style lang="scss" scoped>
.data-source {
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    .label {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #666;
      padding: 0 10px;
      flex: 0 0 90px;
    }
    .content {
      flex: 1 1 calc(100% - 90px);
    }
  }
  .select {
    margin-bottom: 10px;
  }
  .condition {
    margin-top: 10px;
  }
  :deep(th.el-table_1_column_1 .cell) {
    visibility: hidden;
  }
}
</style>
