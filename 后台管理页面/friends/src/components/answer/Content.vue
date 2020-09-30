<template>
  <div class="content">
    <!-- 这里需要动态添加 -->
    <dl class="an">
      <dt class="title">
        <span class="num">序号</span>
        <span class="problem">问题</span>
        <span class="con">操作</span>
      </dt>
      <dd class="answer" v-for="(item, index) in answerList" :key="index">
        <span class="answer-num">{{ item.num }}</span>
        <div class="text">{{ item.content }}</div>
        <div class="btn">
          <button class="change" @click="handleChange(item.content)">
            修改
          </button>
          <button class="delete" @click="handleRemove(index)">删除</button>
        </div>
      </dd>
    </dl>
    <Model v-if="modelFlag" @cancel="handleCancel" @addSubmit="addSubmit" />
    <button class="add-answer" @click="handleModel">添加问题</button>
  </div>
</template>
<script>
import Model from "./Model";
export default {
  name: "Contet",
  components: {
    Model,
  },
  data() {
    return {
      number: 4,
      modelFlag: false,
      answerList: [
        {
          num: 1,
          content: "你会和父母一起住吗？",
        },
        {
          num: 2,
          content: "你会和父母一起住吗？",
        },
        {
          num: 3,
          content: "你会和父母一起住吗？",
        },
      ],
    };
  },
  methods: {
    handleModel() {
      this.modelFlag = true;
      this.$store.state.answerFlag = "添加";
      this.$store.state.answerStr = "";
    },
    handleCancel() {
      this.modelFlag = false;
    },
    addSubmit(val) {
      if (!val) return;
      // 修改
      if (this.$store.state.answerStr === val) {
        return;
      }
      this.answerList.push({
        num: this.number++,
        content: val,
      });
      this.modelFlag = false;
    },
    handleChange(value) {
      this.$store.state.answerFlag = "修改";
      this.modelFlag = true;
      this.$store.state.answerStr = value;
    },
    handleRemove(index) {
      this.answerList.splice(index, 1);
    },
  },
};
</script>
<style lang="less">
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.16);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  dl {
    .title {
      width: 95%;
      height: 48px;
      margin: 30px auto 0;
      padding: 0 50px;
      box-sizing: border-box;
      background: #4fca8b;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #fff;
        font-size: 18px;
        &.problem {
          padding: 0 150px;
        }
        &.con {
          margin-right: 100px;
        }
      }
    }
    .answer {
      width: 95%;
      height: 48px;
      margin: 0 auto;
      background: #f6f6f6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      .text {
        margin-left: 150px;
      }
      .answer-num {
        margin-left: 60px;
      }
      .btn {
        width: 300px;
        margin-right: 15px;
        display: flex;
        justify-content: space-between;
        button {
          width: 110px;
          height: 35px;
          border-radius: 8px;
          border: none;
          &.change {
            background: #4fca8b;
          }
          &.delete {
            background: #fd7b7c;
          }
        }
      }
    }
  }
  .add-answer {
    width: 120px;
    height: 35px;
    background: #4fca8b;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.24);
    border: none;
    color: #fff;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 30%;
    border-radius: 8px;
  }
}
</style>