<!--
 * @Author: your name
 * @Date: 2021-07-02 00:13:32
 * @LastEditTime: 2021-07-25 01:59:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /my-designer/src/custom-component/VButton.vue
-->
<template>
  <button class="v-button">{{ propValue }}</button>
</template>

<script>
export default {
  props: {
    propValue: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.v-button {
  display: inline-block;
  line-height: 1;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  font-weight: 500;
  width: 100%;
  height: 100%;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    background-color: #ecf5ff;
    color: #3a8ee6;
  }
  &:active {
    color: #3a8ee6;
    border-color: #3a8ee6;
    outline: 0;
  }
}
</style>
