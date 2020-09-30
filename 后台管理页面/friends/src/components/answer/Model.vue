<template>
  <div class="model">
    <div class="model-content">
      <div class="add-bg">{{$store.state.answerFlag}}问题</div>
      <div class="add-title">
        <i>*</i>
        <span>{{$store.state.answerFlag}}问题</span>
      </div>
      <input
        type="text"
        name="title"
        placeholder="请输入问题"
        class="layui-input"
        v-model="inp"
      />
      <button class="layui-btn layui-btn-primary submit" @click="handleAdd">
        提交
      </button>
      <button class="layui-btn layui-btn-primary cancel" @click="handleCancel">
        取消
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      inp: "",
    };
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleAdd() {
      this.$emit("addSubmit", this.inp);
    },
  },
  mounted() {
    this.inp = this.$store.state.answerStr;
  },
};
</script>
<style lang="less">
.model {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  .model-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-30%, -60%);
    width: 400px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    .add-bg {
      position: relative;
      margin-left: 30px;
      width: 70px;
      height: 70px;
      background-color: #2a3f54;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      color: #fff;
      line-height: 60px;
      text-align: center;
      &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        border: 28px solid;
        border-color: transparent transparent #fff transparent;
        position: absolute;
        left: 8px;
        top: 16px;
      }
    }
    .add-title {
      padding: 20px 0 10px 50px;
      i {
        vertical-align: middle;
        color: red;
        margin-right: 5px;
      }
    }
    .layui-input {
      width: 75%;
      margin: 0 auto;
      border-radius: 10px;
    }
    .layui-btn {
      width: 30%;
      margin: 70px 0 0 58px;
      border-radius: 10px;
      &.submit {
        background-color: #4fca8b;
        color: #fff;
      }
      &.cancel {
        border: 2px solid #4fca8b;
        color: #4fca8b;
      }
    }
  }
}
</style>