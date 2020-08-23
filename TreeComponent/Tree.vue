<template>
  <ul class="tree">
    <li class="tree-node"
        v-for="(node,index) in data"
        :key="node[defaultProps.label]">
      <i 
      v-if="node[defaultProps.children]"
      class="iconfont"
      :class="{
          'icon-down':childShow[index],
          'icon-right':!childShow[index]
      }"
      ></i>
      <span 
      class="node-label"
      @click="handle(index)"
      >{{ node[defaultProps.label] }}</span>
      <keep-alive>
          <base-tree 
            :data="node[defaultProps.children]" 
            v-if="childShow[index] && node[defaultProps.children]"
            />
      </keep-alive>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'base-tree',
  props: {
    data: {
      type: Array,
      required: true,
    },
    defaultProps: {
      type: Object,
      default: () => ({
        label: 'label',
        children: 'children',
      }),
    },
  },
  data(){
      return {
          childShow:[],
      }
  },
  methods:{
      handle(index){
          const flag = !this.childShow[index];
          this.$set(this.childShow,index,flag);
      }
  }
}
</script>
<style scoped>
@import './assets/font.css';
li {
  cursor: pointer;
  list-style: none;
}
.tree-node .iconfont {
  color: #c0c4cc;
  font-size: 12px;
  margin-right: 5px;
  vertical-align: middle;
}
.tree-node .node-label {
  font-size: 14px;
  color: #606266;
  vertical-align: middle;
}
</style>