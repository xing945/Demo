<template>
  <div class="side">
    <ul class="side-container">
      <li
        v-for="(item, index) in sideList"
        :key="item.id"
        :class="[
          'item',
          {
            active: index === activeIndex,
          },
        ]"
        @click="changeActive(index)"
      >
        <i></i>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      sideList: [
        {
          title: "用户管理",
          id: 1,
        },
        {
          title: "约见管理",
          id: 2,
        },
        {
          title: "审核管理",
          id: 3,
        },
        {
          title: "恋爱吧",
          id: 4,
        },
        {
          title: "户外活动",
          id: 5,
        },
        {
          title: "推送中心",
          id: 6,
        },
        {
          title: "前端管理",
          id: 7,
        },
        {
          title: "高级管理",
          id: 8,
        },
        {
          title: "数据中心",
          id: 9,
        },
        {
          title: "系统设置",
          id: 10,
        },
      ],
    };
  },
  methods: {
    changeActive(index) {
      this.activeIndex = index;
    },
  },
};
</script>
<style lang="less">
.side {
  width: 220px;
  height: 100%;
  float: left;
  position: relative;
  z-index: 2;
  .side-container {
    background-color: #2a3f54;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 20px;
    box-sizing: border-box;
    .item {
      background: #2a3f54;
      position: relative;
      width: 100%;
      height: 72px;
      line-height: 72px;
      border-radius: 50px;
      text-align: left;
      padding-left: 30px;
      box-sizing: border-box;
      cursor: pointer;
      z-index: 2;
      &.active {
        background: #f6f6fa;
        z-index: 1;
      }
      &.active::after {
        position: absolute;
        top: -36px;
        left: 50%;
        width: 50%;
        height: 200%;
        content: " ";
        background: #f6f6fa;
        z-index: -1;
      }
      i {
        display: inline-block;
        width: 25px;
        height: 25px;
        vertical-align: middle;
        margin-right: 15px;
        background-size: 100% 100%;
      }
      span {
        font-size: 20px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        line-height: 26px;
        color: #ffffff;
        opacity: 0.5;
      }
      &.active span {
        color: #2a3f54;
      }
      &:nth-child(1) i {
        background-image: url("~@/assets/image/用户\ 面\).png");
      }
      &:nth-child(2) i {
        background-image: url("~@/assets/image/线下活动.png");
      }
      &:nth-child(3) i {
        background-image: url("~@/assets/image/实名认证.png");
      }
      &:nth-child(4) i {
        background-image: url("~@/assets/image/婚姻恋爱.png");
      }
      &:nth-child(5) i {
        background-image: url("~@/assets/image/用户组织.png");
      }
      &:nth-child(6) i {
        background-image: url("~@/assets/image/消息推送配置.png");
      }
      &:nth-child(7) i {
        background-image: url("~@/assets/image/电脑.png");
      }
      &:nth-child(8) i {
        background-image: url("~@/assets/image/实名认证.png");
      }
      &:nth-child(9) i {
        background-image: url("~@/assets/image/数据\ \(2\).png");
      }
      &:nth-child(10) i {
        background-image: url("~@/assets/image/活动目录配置.png");
      }
    }
  }
  .side-container::before,
  .side-container::after {
    content: "";
    display: block;
    position: relative;
    background: #2a3f54;
    z-index: 100;
    height: 50px;
  }
}
</style>
