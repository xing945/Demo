<template>
  <div class="container">
    <nav class="nav-bottom">
      <router-link
        to=""
        v-for="(item, index) in navList"
        :key="index"
        :class="{ active: index === navActive }"
        @click.native="handleActive(index,item.com)"
        >{{ item.name }}</router-link
      >
    </nav>
    <component :is="comName"></component>
  </div>
</template>
<script>
import Content from "../answer/Content";
import Music from "../answer/Music";
export default {
  components: {
    Content,
    Music,
  },
  data() {
    return {
      navList: [
        {
          name: "征婚帖问答",
          com: "Content",
        },
        {
          name: "征婚帖音乐",
          com: "Music",
        },
      ],
      navActive: 0,
      comName: "Content",
    };
  },
  methods: {
    handleActive(index,com) {
      this.navActive = index;
      this.comName = com;
    },
  },
};
</script>
<style lang="less">
.container {
  float: left;
  width: 100%;
  height: 100%;
  .nav-bottom {
    margin-left: 10px;
    .router-link-active {
      display: inline-block;
      width: 100px;
      height: 35px;
      margin-right: 15px;
      background: #ebebeb;
      font-size: 14px;
      color: #000;
      text-align: center;
      line-height: 35px;
      border-radius: 8px 8px 0px 0px;
      &.active {
        background-color: #fff;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.16);
      }
    }
  }
}
</style>