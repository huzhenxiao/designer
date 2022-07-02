<template>
  <div class="data-source">
    <div class="content-wrap">
      <span class="label">{{ props.data.label }}</span>
      <div class="content">
        <el-select
          v-model="props.data.value"
          class="select"
          placeholder="请选择点位"
          size="small"
          ref="pointSelect"
          @click.native="handleOpenDialog"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="选取点位"
      width="70%"
      top="10vh"
      center
      :before-close="handleClose"
    >
      <p>点位筛选</p>

      <div class="condition">
        <el-row :gutter="20">
          <el-col :span="4"
            ><el-select
              v-model="value"
              class="select"
              placeholder="请选择分组"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> </el-select
          ></el-col>
          <el-col :span="4"
            ><el-select
              v-model="value"
              class="select"
              placeholder="请选择设备"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> </el-select
          ></el-col>
          <el-col :span="4"
            ><el-select
              v-model="value"
              class="select"
              placeholder="请选择网关"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> </el-select
          ></el-col>
          <el-col :span="4"
            ><el-select
              v-model="value"
              class="select"
              placeholder="请选择控制类型"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              /> </el-select
          ></el-col>
          <el-col :span="4">
            <el-input
              v-model="queryList.code"
              placeholder="请输入点位编码或名称"
              size="small"
              clearable
              @change="getPointData"
            />
          </el-col>
        </el-row>
      </div>
      <el-scrollbar height="600px">
        <el-table
          ref="tableRef"
          :data="tableData.list"
          @select="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            prop="name"
            label="点位名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="code"
            label="所属设备"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="gatewayName"
            label="网关名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="code"
            label="点位编码"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="点位类型"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="ctrType"
            label="点位类型"
            align="center"
          ></el-table-column>
        </el-table>
      </el-scrollbar>
      <el-pagination
        v-model:currentPage="queryList.currentPage"
        v-model:page-size="queryList.pageSize"
        :page-sizes="[15, 25, 50, 100]"
        small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
        @size-change="getPointData"
        @current-change="getPointData"
      />
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
import { ref, reactive, onMounted, watch } from "vue";
import usePointData from "./usePointData";
const props = defineProps({
  data: {
    require: true
  },
});

const pointSelect = ref("");
const tableRef = ref("");
const options = reactive([]);
const dialogVisible = ref(false);

const handleOpenDialog = () => {
  dialogVisible.value = true;
  pointSelect.value.blur();
};

const { queryList, tableData, getPointData } = usePointData();
watch(
  () => dialogVisible.value,
  (dialogVisible, prevDialogVisible) => {
    if (dialogVisible) {
      getPointData().then(() => {
        tableData.list.forEach(item => {
          if (item.code === props.data.value) {
            tableRef.value.toggleRowSelection(item, true);
          }
        });
      });
    }
  }
);

let selections = reactive([]);
const handleSelectionChange = (selection, row) => {
  selections = [row];
  tableRef.value.clearSelection();
  tableRef.value.toggleRowSelection(row, true);
};

const emit = defineEmits(["valueChange"]);
const handleConfirm = () => {
  emit("valueChange", selections[0] ? selections[0].code : "");
  handleClose();
};
const handleClose = () => {
  dialogVisible.value = false;
};
</script>
<style lang="scss" scoped>
.data-source {
  display: flex;
  flex-direction: column;
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
