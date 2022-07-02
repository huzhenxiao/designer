<template>
  <div class="v-time">
    <div class="input" :style="{ verticalAlign: element.style.verticalAlign.value }">
      {{ time }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import dayjs from 'dayjs';

const props = defineProps({
  element: {
    type: Object
  }
});
const time = ref('');
let timer;
onMounted(() => {
  time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
  timer = setInterval(() => {
    time.value = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }, 1000);
});
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.v-time {
  display: table;
  width: 100%;
  height: 100%;
  .input {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
    word-wrap: break-word;
  }
}
</style>
