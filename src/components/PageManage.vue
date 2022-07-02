<template>
  <div class="page-manage">
    <el-scrollbar>
      <el-tree :data="dataSource" node-key="id" default-expand-all :expand-on-click-node="false">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <el-input v-if="node.data.editable" v-model="name" class="w-50 m-2" size="small" />
            <span v-else>{{ node.label }}</span>
            <span class="wrap-btn">
              <template v-if="node.data.editable">
                <el-button type="text" @click="cancel(node)">取消</el-button>
                <el-button type="text" @click="save(node)">保存</el-button>
              </template>
              <template v-else>
                <el-button type="text" @click="edit(node, data)">编辑</el-button>
                <el-button type="text" @click="append(data)">添加</el-button>
                <el-button type="text" @click="remove(node, data)">删除</el-button>
              </template>
            </span>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { nanoid } from 'nanoid';

const dataSource = ref([
  {
    id: -1,
    label: '设计器',
    children: [
      {
        id: 1,
        label: '1-1',
        children: [
          {
            id: 9,
            label: '1-1-1',
            children: [
              {
                id: 11,
                label: '1-1-1'
              },
              {
                id: 12,
                label: '1-1-2'
              }
            ]
          },
          {
            id: 10,
            label: '1-1-2'
          }
        ]
      }
    ]
  }
]);
const name = ref('');
const cancel = (node) => {
  node.data.editable = false;
  name.value = '';
};
const save = (node) => {
  node.data.label = name.value;
  node.data.editable = false;
};
const edit = (node) => {
  resetEditable(dataSource.value, false);
  node.data.editable = true;
  name.value = node.label;
};
const append = (data) => {
  const newChild = { id: nanoid(), label: 'testtest', children: [] };
  if (!data.children) {
    data.children = [];
  }
  data.children.push(newChild);
  newChild.editable = true;
  name.value = newChild.label;
};

const remove = (node, data) => {
  const { parent } = node;
  const children = parent.data.children || parent.data;
  const index = children.findIndex((d) => d.id === data.id);
  children.splice(index, 1);
};
function resetEditable(data = [], flag) {
  data.forEach((item) => {
    item.editable = flag;
    if (item.children && item.children.length) {
      resetEditable(item.children, flag);
    }
  });
}
</script>

<style lang="scss" scoped>
.page-manage {
  width: 100%;
  height: 200px;
  .el-scrollbar {
    padding: 0 5px 5px 0;
  }
  .custom-tree-node {
    .wrap-btn {
      display: none;
      .el-button {
        margin-left: 5px;
      }
    }
    &:hover .wrap-btn {
      display: inline-block;
    }
    .el-input {
      width: 100px;
    }
  }
}
</style>
