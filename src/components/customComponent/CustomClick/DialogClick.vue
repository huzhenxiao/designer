<template>
  <el-dialog v-model="dialogVisible" title="点击事件" center :before-close="handleBeforeClose">
    <el-form :model="form" label-width="120px">
      <el-form-item label="动作">
        <el-select v-model="form.action" placeholder="请选择">
          <el-option label="打开页面" value="openPage" />
          <el-option label="打开链接" value="openLink" />
          <el-option label="刷新" value="refresh" />
        </el-select>
      </el-form-item>
      <el-form-item label="页面" v-if="form.action === 'openPage'">
        <el-select v-model="form.pageOrLink" placeholder="请选择">
          <el-option
            v-for="(item, index) in pageOrLinkOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <div v-if="form.action === 'openLink'">
        <el-form-item label="链接">
          <el-input v-model="form.pageOrLink" placeholder="请以http或者https开头" />
        </el-form-item>
        <el-form-item label="展现">
          <el-radio v-model="form.showType" label="page" size="large">新页面</el-radio>
          <el-radio v-model="form.showType" label="dialog" size="large">弹窗</el-radio>
        </el-form-item>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfrim">应用</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
const props = defineProps({
  formValue: {
    type: Object,
    default: () => ({})
  },
  pageOrLinkOptions: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['visibleChange', 'valueChange']);
let dialogVisible = ref(true);
const form = reactive({
  action: '',
  pageOrLink: '',
  showType: 'page',
  value: false
});
onMounted(() => {
  Object.keys(props.formValue).forEach((key) => {
    form[key] = props.formValue[key];
  });
});
const handleClose = () => {
  dialogVisible.value = false;
  emit('visibleChange', dialogVisible.value);
};
const handleConfrim = () => {
  emit('valueChange', form);
  handleClose();
};
const handleBeforeClose = (done) => {
  emit('visibleChange', dialogVisible.value);
};
</script>

<style lang="scss" scoped></style>
