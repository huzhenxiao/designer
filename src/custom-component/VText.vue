<template>
  <div
    v-if="editMode === 'edit'"
    class="v-text"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
  >
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
    <div
      :contenteditable="canEdit"
      class="input"
      :class="{ canEdit: canEdit }"
      ref="text"
      :tabindex="element.id"
      v-html="propValue"
      @dblclick="handleSetEdit"
      @blur="handleBlur"
      @input="handleInput"
      @paste="clearStyle"
      @mousedown="handleMousedown"
      :style="{ verticalAlign: element.style.verticalAlign }"
    ></div>
  </div>
  <div v-else>
    <div
      v-html="propValue"
      :style="{ verticalAlign: element.style.verticalAlign }"
    ></div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    propValue: {
      type: String,
      require: true,
    },
    element: {
      type: Object,
    },
  },
  setup(props, context) {
    const store = useStore();
    const editMode = computed(() => store.state.editMode);
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
      props.element.propValue = e.target.innerHTML || "&nbsp;";
      canEdit.value = false;
    };

    const handleInput = (e) => {
      e.preventDefault();
      e.stopPropagation();
      context.emit("input", props.element, {
        height: e.target.clientHeight,
        width: e.target.clientWidth,
      });
    };

    const clearStyle = (e) => {
      e.preventDefault();
      const clp = e.clipboardData;
      const text = clp.getData("text/plain") || "";
      if (text !== "") {
        document.execCommand("insertText", false, text);
      }
      context.emit("input", props.element, e.target.innerHTML);
    };

    const handleMousedown = (e) => {
      if (canEdit.value) {
        e.stopPropagation();
      }
    };

    return {
      editMode,
      canEdit,
      text,
      handleKeydown,
      handleKeyup,
      handleSetEdit,
      handleBlur,
      handleInput,
      clearStyle,
      handleMousedown,
    };
  },
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
