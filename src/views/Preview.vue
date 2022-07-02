<template>
  <div
    class="preview"
    :style="{
      width: `${changeStyleWithScale(
        canvasStyleData.width,
        canvasStyleData.scale
      )}px`,
      height: `${changeStyleWithScale(
        canvasStyleData.height,
        canvasStyleData.scale
      )}px`,
    }"
  >
    <ComponentWrapper
      v-for="item in componentData"
      :key="item.id"
      :component="item"
    />
  </div>
</template>

<script>
import { reactive,computed,onUnmounted} from "vue";
import { batchGetPointStat } from "@/apis";
import { changeStyleWithScale } from "utils/translate";
import ComponentWrapper from "comps/ComponentWrapper.vue";

export default {
  name: "preview",
  components: {
    ComponentWrapper,
  },
  setup() {
    const canvasData = JSON.parse(sessionStorage.getItem("canvasData"));
    const componentData = reactive(canvasData.componentData);
    const canvasStyleData = reactive(canvasData.canvasStyleData);
    const codeList = [];
    componentData.forEach(component => {
      if(component.businessData.IoTdataSource?.value){
        codeList.push(component.businessData.IoTdataSource.value)
      }
    });
    function getRealInfo() {
      batchGetPointStat(codeList).then(res=>{
        if(res?.result){
          const realInfoMap = res.result.reduce((memo,item)=>{
            memo[item.code] = item;
            return memo
          },{});
          componentData.forEach(component => {
            if(component.businessData.IoTdataSource?.value){
              component.businessData.IoTdataSource.realInfo = realInfoMap[component.businessData.IoTdataSource.value];
            }
          });
        }
      })
    }
    getRealInfo();
    let timer = setInterval(() => {
      getRealInfo()
    }, 5000);
    onUnmounted(() => {
      clearInterval(timer);
      timer = null;
    })

    return {
      changeStyleWithScale,
      componentData,
      canvasStyleData,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  background: #fff;
  border: 1px solid #999;
}
</style>
