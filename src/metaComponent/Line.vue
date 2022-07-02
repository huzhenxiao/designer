<template>
  <div class="line-wrap" ref="lineWrap" @mouseup="handleMouseup"></div>
</template>

<script>
import { Graph } from '@antv/x6';
import { ref, computed, onMounted, watchEffect, watch } from 'vue';
import emitter from 'utils/eventBus';

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
    },
    isLock: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number
    }
  },
  setup(props) {
    let graph = null;
    let edge = null;
    const lineType = computed(() => props.element.style.lineType.value);
    const lineColor = computed(() => props.element.style.lineColor.value);
    const sourceX = computed(() => props.element.style.sourceX.value);
    const sourceY = computed(() => props.element.style.sourceY.value);
    const targetX = computed(() => props.element.style.targetX.value);
    const targetY = computed(() => props.element.style.targetY.value);

    const updateEdge = (sX, sY, tX, tY) => {
      if (!graph) return;
      edge.setSource({
        x: sX,
        y: sY
      });
      edge.setTarget({
        x: tX,
        y: tY
      });
    };
    watchEffect(() => {
      const sX = sourceX.value;
      const sY = sourceY.value;
      const tX = targetX.value;
      const tY = targetY.value;
      const { scale } = props;
      updateEdge(sX, sY, tX, tY);
    });
    watchEffect(() => {
      const width = props.element.style.width.value;
      const height = props.element.style.height.value;
      graph && graph.resize(width, height);
    });
    watch(
      [() => lineType.value, () => lineColor.value],
      ([lineType, lineColor], [preLineType, preLineColor]) => {
        graph.removeEdge(edge);
        edge = graph.addEdge({
          source: [sourceX.value, sourceY.value],
          target: [targetX.value, targetY.value],
          label: '',
          tools: [lineType],
          attrs: {
            line: {
              targetMarker: 'classic',
              stroke: lineColor
            }
          }
        });
      }
    );
    watch(
      () => props.scale,
      (scale, prevScale) => {
        console.log('scale', scale);
        const sX = (sourceX.value * scale) / prevScale;
        const sY = (sourceY.value * scale) / prevScale;
        const tX = (targetX.value * scale) / prevScale;
        const tY = (targetY.value * scale) / prevScale;
        updateEdge(sX, sY, tX, tY);
      }
    );
    const lineWrap = ref(null);
    console.log(props.editMode, 'props.editMode');

    const isEdit = props.editMode === 'edit';
    console.log('isEdit', isEdit);

    onMounted(() => {
      graph = new Graph({
        container: lineWrap.value,
        width: props.element.style.width.value,
        height: props.element.style.width.value,
        interacting: () => ({
          edgeMovable: isEdit,
          arrowheadMovable: isEdit,
          vertexMovable: isEdit
        })
      });
      edge = graph.addEdge({
        source: [sourceX.value, sourceY.value],
        target: [targetX.value, targetY.value],
        label: '',
        tools: [lineType.value],
        attrs: {
          line: {
            targetMarker: 'classic',
            stroke: lineColor.value
          }
        }
      });
      // graph.addEdge({
      //   source: { x: 40, y: 40 },
      //   target: { x: 380, y: 40 },
      //   vertices: [
      //     { x: 40, y: 80 },
      //     { x: 200, y: 80 },
      //     { x: 200, y: 40 }
      //   ],
      //   attrs: {
      //     line: {
      //       stroke: "#3c4260",
      //       strokeWidth: 2,
      //       targetMarker: "classic"
      //     }
      //   },
      //   tools: {
      //     name: "vertices",
      //     args: {
      //       attrs: { fill: "#666" }
      //     }
      //   }
      // });
      graph.on('edge:change:*', ({ edge }) => {
        const { source, target, vertices } = edge;
        console.log('edge', edge);

        props.element.style.sourceX.value = source.x;
        props.element.style.sourceY.value = source.y;
        props.element.style.targetX.value = target.x;
        props.element.style.targetY.value = target.y;
      });
      // graph.addEdge({
      //   source: { x: 10, y: 10 },
      //   target: { x: 150, y: 150 },
      //   vertices: [{ x: 150, y: 10 }],
      //   router: { name: 'er' },
      // })
    });
    const handleMouseup = (e) => {
      console.log('handleMouseup');
      // e.preventDefault();
      // e.stopPropagation();
      emitter.emit('shapeMouseup');
      // const event = document.createEvent('Event');
      // event.initEvent('click', true, false);
      // document.dispatchEvent(event);
    };

    return {
      lineWrap,
      handleMouseup
    };
  }
};
</script>

<style lang="scss" scoped>
.line-wrap {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
