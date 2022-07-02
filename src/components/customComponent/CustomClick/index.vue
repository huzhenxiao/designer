<template>
  <div class="custom-click">
    <div class="click-wrap">
      <el-checkbox
        v-model="props.value.single.value"
        label="单击"
        size="large"
      />
      <el-icon @click="$event => handleEdit('single', $event)"
        ><edit-pen
      /></el-icon>
    </div>
    <div class="click-wrap">
      <el-checkbox
        v-model="props.value.double.value"
        label="双击"
        size="large"
      />
      <el-icon @click="$event => handleEdit('double', $event)"
        ><edit-pen
      /></el-icon>
    </div>
    <DialogClick
      v-if="dialogVisible"
      :formValue="formValue"
      :pageOrLinkOptions="pageOrLinkOptions"
      @visibleChange="handleVisibleChange"
      @valueChange="handleValueChange"
    />
  </div>
</template>

<script setup>
import DialogClick from "./DialogClick.vue";
import {
  ref,
  reactive,
  onMounted,
  watch,
  computed
} from "vue";
const props = defineProps({
  value: {
    require: true
  }
});

const dialogVisible = ref(false);
const currentType = ref("");

const formValue = computed(() => {
  return props.value[currentType.value];
});
const pageOrLinkOptions = [
  {
    label:'page1',
    value:'page1'
  },
  {
    label:'page2',
    value:'page2'
  }
]
const handleEdit = (key, e) => {
  currentType.value = key;
  dialogVisible.value = true;
};
const handleVisibleChange = value => {
  dialogVisible.value = false;
};
const handleValueChange = value => {
  props.value[currentType.value] = value;
};
</script>

<style lang="scss" scoped>
.click-wrap {
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
