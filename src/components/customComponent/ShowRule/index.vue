<template>
  <div class="show-rule">
    <div class="content">
      <span class="label">{{ props.data.label }}</span>
      <div class="content">
        <el-select v-model="props.data.value" class="select" placeholder="请选择" size="small">
          <el-option
            v-for="item in props.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <el-button type="text" @click="handleOpenRuleEditDialog">编辑</el-button>
    </div>

    <el-dialog
      v-model="ruleEditDialog"
      title="变量值功能"
      width="70%"
      top="10vh"
      center
      :before-close="handleClose"
    >
      <el-tabs v-model="activeTab">
        <el-tab-pane label="平台规则" name="platform">
          <div>
            <el-table
              highlight-current-row
              stripe
              :header-cell-style="{ background: '#F4F8FB' }"
              size="small"
              :data="platformRules"
            >
              <el-table-column prop="type" label="预警类型" align="center">
                <template #default="scope">
                  <el-input
                    disabled
                    size="small"
                    style="text-align: center"
                    v-model="scope.row.type"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="value" label="预警值" align="center">
                <template #default="scope">
                  <el-input
                    disabled
                    size="small"
                    style="text-align: center"
                    v-model="scope.row.value"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="bufferValue" label="缓冲值" align="center">
                <template #default="scope">
                  <el-input
                    disabled
                    size="small"
                    style="text-align: center"
                    v-model="scope.row.bufferValue"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="请填写对应的翻译内容" align="center">
                <template #default="scope">
                  <el-input
                    size="small"
                    style="text-align: center"
                    v-model="scope.row.content"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="color" label="字体颜色" align="center">
                <template #default="scope">
                  <el-color-picker show-alpha v-model="scope.row.textcolor"></el-color-picker>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" size="small" @click="delRow('platform', scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="自定义规则" name="custom">
          <div>
            <el-table
              highlight-current-row
              stripe
              :header-cell-style="{ background: '#F4F8FB' }"
              size="small"
              :data="customRules"
            >
              <el-table-column prop="min" label="最小值(>=)" align="center">
                <template #default="scope">
                  <el-input-number
                    v-model="scope.row.min"
                    size="small"
                    :controls="false"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="max" label="最大值(<=)" align="center">
                <template #default="scope">
                  <el-input-number
                    v-model="scope.row.max"
                    size="small"
                    :controls="false"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="content" label="请填写对应的翻译内容" align="center">
                <template #default="scope">
                  <el-input size="small" v-model="scope.row.content"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="color" label="字体颜色" align="center">
                <template #default="scope">
                  <el-color-picker show-alpha v-model="scope.row.textcolor"></el-color-picker>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" size="small" @click="delRow('custom', scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <div class="wrap-add-btn">
              <el-button type="primary" size="small" class="addRow" @click="addRow"
                >添加一条</el-button
              >
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
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
import { ref, reactive } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import useRules from './useRules';
const props = defineProps({
  data: {
    require: true
  },
  businessData: {
    require: true,
    type: Object
  },
  options: {
    type: Array,
    require: true,
    default: () => []
  }
});
console.log('props.data', props.data);
console.log('businessData', props.businessData);

const ruleEditDialog = ref(false);
const activeTab = ref(props.data.value);

const { platformRules, customRules, initData, addRow, delRow } = useRules();

const handleOpenRuleEditDialog = () => {
  if (!props.data.value) {
    return ElMessage('请选择展示规则类型');
  } else if (props.data.value === 'platform' && !props.businessData.IoTdataSource.value) {
    return ElMessage('请选择点位');
  } else {
    activeTab.value = props.data.value;
    ruleEditDialog.value = true;
    initData({
      code: props.businessData.IoTdataSource.value,
      oldPlatFormRules: props.data.platFormRules,
      oldCustomRules: props.data.customRules
    });
  }
};

const handleClose = () => {
  ruleEditDialog.value = false;
};
const handleConfirm = () => {
  ruleEditDialog.value = false;
  props.data.platFormRules = cloneDeep(platformRules);
  props.data.customRules = cloneDeep(customRules);
};
</script>
<style lang="scss" scoped>
.show-rule {
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
      flex: 0 0 70px;
    }
    .content {
      flex: 1 1 calc(100% - 90px);
    }
  }
}
</style>
