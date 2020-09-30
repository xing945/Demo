<template>
  <nav class="nav-top">
    <div class="control" ref="scroll">
      <router-link
        v-for="(item, index) in navList"
        :key="index"
        :class="{ success: successActive === index }"
        to=""
        @click.native="handleChange(index)"
        >{{ item }}</router-link
      >
    </div>
    <i class="layui-icon layui-icon-next" @click="handleScroll"></i>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        "征婚帖",
        "轮播图",
        "基本资料",
        "黑名单词汇",
        "系统自动回复设置",
        "公告设置",
        "匿名吐槽",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
        "帮助中心",
      ],
      successActive: 0,
    };
  },
  methods:{
    handleChange(index){
      this.successActive = index;
    },
    handleScroll(){
      this.$refs.scroll.scrollLeft += 100;
    }
  }
};
</script>
<style lang="less">
.nav-top {
  height: 50px;
  .control {
    width: 95%;
    height: 120%;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    margin-left: 10px;
    .router-link-active {
      display: inline-block;
      width: 130px;
      margin-right: 10px;
      font-size: 14px;
      height: 40px;
      background-color: #fff;
      color: rgba(170, 170, 170, 1);
      box-shadow: 1px 1px 3px #333;
      border-radius: 8px;
      text-align: center;
      line-height: 40px;
      &.success {
        background: rgba(79, 202, 139, 1);
        color: #fff;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .layui-icon-next {
    color: #4fca8b;
    float: left;
    font-size: 25px;
    margin: 7px 0 0 20px;
    cursor: pointer;
  }
}
</style>