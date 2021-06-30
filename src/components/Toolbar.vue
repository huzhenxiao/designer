<template>
  <div class="toolbar">
    <el-button>撤消</el-button>
    <!-- <el-button @click="redo">重做</el-button>
    <label for="input" class="insert">插入图片</label>
    <input type="file" @change="handleFileChange" id="input" hidden />
    <el-button @click="preview" style="margin-left: 10px;">预览</el-button>
    <el-button @click="save">保存</el-button>
    <el-button @click="clearCanvas">清空画布</el-button>
    <el-button @click="compose" :disabled="!areaData.components.length">组合</el-button>
    <el-button @click="decompose" 
    :disabled="!curComponent || curComponent.isLock || curComponent.component != 'Group'">拆分</el-button>
    
    <el-button @click="lock" :disabled="!curComponent || curComponent.isLock">锁定</el-button>
    <el-button @click="unlock" :disabled="!curComponent || !curComponent.isLock">解锁</el-button>
    <div class="canvas-config">
        <span>画布大小</span>
        <input v-model="canvasStyleData.width">
        <span>*</span>
        <input v-model="canvasStyleData.height">
    </div>
    <div class="canvas-config">
        <span>画布比例</span>
        <input v-model="scale" @input="handleScaleChange"> %
    </div> -->
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.toolbar {
  height: 64px;
  padding: 0 10px;
  line-height: 64px;
  background: #fff;
  border-bottom: 1px solid #ddd;
}
</style>
