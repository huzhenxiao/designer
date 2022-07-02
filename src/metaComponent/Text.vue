<template>
  <div v-if="editMode === 'edit'" class="v-text" @keydown="handleKeydown" @keyup="handleKeyup">
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
    <div
      :contenteditable="canEdit"
      class="input"
      :class="{ canEdit: canEdit }"
      ref="text"
      :tabindex="element.id"
      v-html="propValue.value"
      @dblclick="handleSetEdit"
      @blur="handleBlur"
      @input="handleInput"
      @paste="clearStyle"
      @mousedown="handleMousedown"
      :style="{ verticalAlign: element.style.verticalAlign.value }"
    ></div>
  </div>
  <div v-else>
    <div
      v-html="propValue.value"
      :style="{ verticalAlign: element.style.verticalAlign.value }"
    ></div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    propValue: {
      type: Object,
      require: true
    },
    element: {
      type: Object
    },
    editMode: {
      type: String,
      default: 'edit'
    }
  },
  setup(props, context) {
    const canEdit = ref(false);

    const handleKeydown = () => {};
    const handleKeyup = () => {};

    const text = ref(null);
    const selectText = (element) => {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    };
    const handleSetEdit = () => {
      canEdit.value = true;
      selectText(text.value); // 全选
    };

    const handleBlur = (e) => {
      props.element.propValue.value = e.target.innerHTML || '';
      canEdit.value = false;
    };

    const handleInput = (e) => {
      e.preventDefault();
      e.stopPropagation();
      context.emit('input', props.element, {
        height: {
          value: e.target.clientHeight
        },
        width: {
          value: e.target.clientWidth
        }
      });
    };

    const clearStyle = (e) => {
      e.preventDefault();
      const clp = e.clipboardData;
      const text = clp.getData('text/plain') || '';
      if (text !== '') {
        document.execCommand('insertText', false, text);
      }
      context.emit('input', props.element, e.target.innerHTML);
    };

    const handleMousedown = (e) => {
      if (canEdit.value) {
        e.stopPropagation();
      }
    };

    return {
      canEdit,
      text,
      handleKeydown,
      handleKeyup,
      handleSetEdit,
      handleBlur,
      handleInput,
      clearStyle,
      handleMousedown
    };
  }
};
</script>

<style lang="scss" scoped>
.v-text {
  width: 100%;
  height: 100%;
  display: table;

  .input {
    display: table-cell;
    width: 100%;
    height: 100%;
    outline: none;
    word-wrap: break-word;
  }

  .canEdit {
    cursor: text;
    height: 100%;
  }
}
</style>
