<template>
  <div class="home">
    <header>
      <Toolbar />
    </header>
    <main>
      <section class="left">
        <ComponentList />
      </section>
      <section class="center">
        <div class="content" 
        @drop="handleDrop" 
        @dragover="handleDragOver"
        @mousedown="handleMouseDown" 
        @mouseup="deselectCurComponent">

        </div>
      </section>
      <section class="right">right</section>
    </main>
  </div>
</template>

<script>
import Toolbar from "comps/Toolbar.vue";
import ComponentList from "comps/ComponentList.vue";

export default {
  name: "home",
  components: {
    Toolbar,
    ComponentList,
  },
  setup() {
    const handleDrop = ()=>{
      console.log('handleDrop');
    };
    const handleDragOver = ()=>{
      console.log('handleDragOver');
    };
    const handleMouseDown = ()=>{
      console.log('handleMouseDown');
    };
    const deselectCurComponent = ()=>{
      console.log('deselectCurComponent');
    };
    return {
      handleDrop,
      handleDragOver,
      handleMouseDown,
      deselectCurComponent,
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  background: #fff;
  main {
    height: calc(100% - 65px);
    display: flex;

    .left {
      height: 100%;
      width: 300px;
      padding-top: 10px;
    }

    .right {
      height: 100%;
      width: 260px;
    }

    .center {
      flex: 1;
      background: #f5f5f5;
      height: 100%;
      overflow: auto;
      padding: 20px;

      .content {
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>
