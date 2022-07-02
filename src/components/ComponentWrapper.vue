<template>
  <div class="component-wrapper">
    <component
      class="component"
      :is="`iot-${component.component}`"
      :style="getStyle(component.style)"
      :propValue="component.propValue"
      :element="component"
      :editMode="editMode"
      @click="handleClick"
      @dblclick="handleDoubleClick"
    ></component>
    <el-dialog v-model="dialogVisible" width="80%" top="5vh">
      <iframe :src="pageLink" frameborder="0"></iframe>
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getStyleExclude } from 'utils/style';
import { storeToRefs } from 'pinia';
import { useMainStore } from '@/store';

export default {
  props: {
    component: {
      require: true,
      type: Object
    }
  },
  setup(props, context) {
    console.log('============');
    console.log(props.component);
    const mainStore = useMainStore();
    const { editMode } = storeToRefs(mainStore);

    const dialogVisible = ref(false);
    const pageLink = ref('false');
    let clickTimer;
    const handleClick = () => {
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        const { click } = props.component.events;
        if (!click) return;
        if (!click.single || !click.single.value) return;
        const { action, pageOrLink, showType } = click.single;
        if (action === 'openPage') {
        } else if (action === 'openLink') {
          if (showType === 'page') {
            window.open(pageOrLink, '_blank');
          } else if (showType === 'dialog') {
            pageLink.value = pageOrLink;
            dialogVisible.value = true;
          }
        } else if (action === 'refresh') {
          location.reload();
        }
      }, 300);
    };
    const handleDoubleClick = () => {
      clearTimeout(clickTimer);
      const { click } = props.component.events;
      if (!click) return;
      if (!click.double || !click.double.value) return;
      const { action, pageOrLink, showType } = click.double;
      if (action === 'openPage') {
      } else if (action === 'openLink') {
        if (showType === 'page') {
          window.open(pageOrLink, '_blank');
        } else if (showType === 'dialog') {
          pageLink.value = pageOrLink;
          dialogVisible.value = true;
        }
      } else if (action === 'refresh') {
        location.reload();
      }
    };
    const getStyle = (style) => getStyleExclude(style, []);

    return {
      editMode,
      dialogVisible,
      pageLink,
      handleClick,
      handleDoubleClick,
      getStyle
    };
  }
};
</script>

<style lang="scss" scoped>
.component {
  position: absolute;
}
iframe {
  width: 100%;
  height: 80vh;
}
</style>
