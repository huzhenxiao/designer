<template>
  <div class="variable">
    <div
      v-if="props.editMode"
      class="text"
      :style="{ verticalAlign: element.style.verticalAlign.value }"
    >
      变量值
    </div>
    <el-popover v-else placement="top-start" trigger="hover" :title="pointInfo.name" width="250px">
      <div class="content-wrapper">
        <div :class="['header', pointInfo.online ? 'green' : 'grey']">
          {{ pointInfo.online ? '在线' : '离线' }}
        </div>
        <div class="body">
          <el-row v-for="(info, index) in showInfos" :key="index">
            <el-col :span="10"
              ><span>{{ info.label }}</span></el-col
            >
            <el-col :span="14"
              ><span :title="info.value">{{ info.value }}</span></el-col
            >
          </el-row>
        </div>
      </div>
      <template #reference>
        <span slot="reference" :style="showColor">
          {{ pointInfo.showValue }}
        </span>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch, watchEffect, computed } from 'vue';
import { getThirdData, getPointWarningLimits } from '@/apis';

const props = defineProps({
  element: {
    type: Object
  },
  editMode: {
    type: String
  },
  propValue: {
    type: Object
  }
});
const { dataResourceType, IoTdataSource, showRule, thirdDataSource, dataDetail } =
  props.element.businessData;
// console.log("dataResourceType", dataResourceType);
// console.log("IoTdataSource", IoTdataSource);
// console.log("showRule", showRule);
// console.log("thirdDataSource", thirdDataSource);
// console.log("dataDetail", dataDetail);

const showInfos = reactive([
  {
    label: '实时值：',
    value: ''
  },
  {
    label: '点位编码：',
    value: ''
  },
  {
    label: '更新时间：',
    value: ''
  }
]);
const pointInfo = reactive({});
const showColor = computed(() => (pointInfo.textColor ? `color:${pointInfo.textColor}` : ''));
let timer;

watch(
  () => props.element,
  (val) => {
    const isPreview = !props.editMode;
    if (isPreview) {
      initData();
    }
  },
  {
    immediate: true,
    deep: true
  }
);
function initData() {
  if (dataResourceType.value === '第三方' && thirdDataSource.value.address) {
    useThirdData();
    timer =
      timer ||
      setInterval(() => {
        useThirdData();
      }, 3000);
    onUnmounted(() => {
      clearInterval(timer);
      timer = null;
    });
  } else if (dataResourceType.value === 'IoT平台') {
    useIoTData();
  }
}
const thirdData = ref({});
function useThirdData() {
  if (!thirdDataSource.value.address) return;
  getThirdData(thirdDataSource.value.address).then((res) => {
    if (res.status === 200) {
      thirdData.value = res.data.result[0];
      let { value, code, time } = thirdData.value;
      value = +value;
      pointInfo.name = '';
      showInfos[0].value = value;
      showInfos[1].value = code;
      showInfos[2].value = time || '';
      pointInfo.online = true;

      pointInfo.showValue = value;
      if (dataDetail.value.showUnit && IoTdataSource.realInfo?.unit) {
        pointInfo.showValue += IoTdataSource.realInfo.unit;
      }

      if (showRule.value === 'custom') {
        showRule.customRules.forEach((item) => {
          if (item.min <= value && value <= item.max) {
            item.textcolor && (pointInfo.textColor = item.textcolor);
            item.content && (pointInfo.showValue = item.content);
          }
        });
      }
    }
  });
}

function getWarningLimits() {
  if (!IoTdataSource.value) return;
  if (showRule.value !== 'platform') return;
  return getPointWarningLimits(IoTdataSource.value).then((res) => {
    if (res.status === 200) {
      pointInfo.pointWarningLimits = res.result;
      pointInfo.hasGetPointWarningLimits = true;
    }
  });
}

async function useIoTData() {
  if (!IoTdataSource.realInfo) return;
  let { name, value, online, fvalue, code, time } = IoTdataSource.realInfo;
  value = +value;
  pointInfo.name = name || '';
  pointInfo.online = online;
  showInfos[0].value = fvalue;
  showInfos[1].value = code;
  showInfos[2].value = time || '';
  !pointInfo.hasGetPointWarningLimits && (await getWarningLimits());
  pointInfo.showValue = value;
  if (dataDetail.value.showUnit && IoTdataSource.realInfo?.unit) {
    pointInfo.showValue += IoTdataSource.realInfo.unit;
  }
  let rules = [];
  if (showRule.value === 'platform') {
    rules = showRule.platFormRules || [];
    const _ids = rules.map((item) => item._id);
    const allRules = {
      '>': [],
      '<': [],
      '=': []
    };
    // 平台上5种规则 >=,>,<=,<,=,简单分成高限、低限、等于3种情况处理
    pointInfo.pointWarningLimits.forEach((item) => {
      if (_ids.includes(item.id)) {
        const rule = rules.find((i) => i._id === item.id);
        switch (item.chara) {
          case '>=':
            allRules['>'].push({
              ...rule,
              value: +item.value,
              bufferValue: +item.bufferValue,
              computedValue: +item.value + +item.bufferValue
            });
            break;
          case '>':
            allRules['>'].push({
              ...rule,
              value: +item.value,
              bufferValue: +item.bufferValue,
              computedValue: +item.value + +item.bufferValue
            });
            break;
          case '<=':
            allRules['<'].push({
              ...rule,
              value: +item.value,
              bufferValue: +item.bufferValue,
              computedValue: +item.value - +item.bufferValue
            });
            break;
          case '<':
            allRules['<'].push({
              ...rule,
              value: +item.value,
              bufferValue: +item.bufferValue,
              computedValue: +item.value - +item.bufferValue
            });
            break;
          case '=':
            allRules['='].push({
              ...rule,
              value: +item.value,
              bufferValue: +item.bufferValue
            });
            break;
          default:
            break;
        }
      }
    });
    // 高限时值越大的优先级越高，升序处理
    // 低限时值越小的优先级越高，降序处理
    allRules['>'].sort((a, b) => a.computedValue - b.computedValue);
    allRules['<'].sort((a, b) => b.computedValue - a.computedValue);
    allRules['>'].forEach((item) => {
      if (value > item.computedValue) {
        item.textcolor && (pointInfo.textColor = item.textcolor);
        item.content && (pointInfo.showValue = item.content);
      }
    });
    allRules['<'].forEach((item) => {
      if (value < item.computedValue) {
        item.textcolor && (pointInfo.textColor = item.textcolor);
        item.content && (pointInfo.showValue = item.content);
      }
    });
    allRules['='].forEach((item) => {
      if (value === item.value) {
        item.textcolor && (pointInfo.textColor = item.textcolor);
        item.content && (pointInfo.showValue = item.content);
      }
    });
  } else if (showRule.value === 'custom') {
    showRule.customRules.forEach((item) => {
      if (item.min <= value && value <= item.max) {
        item.textcolor && (pointInfo.textColor = item.textcolor);
        item.content && (pointInfo.showValue = item.content);
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.variable {
  display: table;
  width: 100%;
  height: 100%;
  cursor: pointer;
  .text {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
    word-wrap: break-word;
  }
}
.content-wrapper {
  .el-col {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .header {
    position: absolute;
    top: 5px;
    right: 10px;
    &.green {
      color: #86c166;
    }
    &.grey {
      color: #999;
    }
  }
}
</style>
