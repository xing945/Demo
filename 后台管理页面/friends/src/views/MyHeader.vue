<template>
  <header class="header">
    <ul class="header-right">
      <li class="nav-item">
        <i class="layui-icon layui-icon-spread-left"></i>
      </li>
      <li class="nav-item">
        <i class="layui-icon layui-icon-refresh-3"></i>
      </li>
      <li class="nav-item">
        <i class="layui-icon layui-icon-password"></i>
      </li>
      <li class="nav-item">
        <i class="layui-icon layui-icon-cols"></i>
      </li>
      <li class="nav-item">
        <i class="layui-icon layui-icon-refresh"></i>
      </li>
      <li class="nav-item">
        <i class="layui-icon layui-icon-notice"></i>
      </li>
      <li class="nav-item">
        <i class="layui-icon layui-icon-set"></i>
      </li>
      <li class="nav-item">
        <img
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=187504917,1597926590&fm=26&gp=0.jpg"
          alt=""
        />
        <span>管理员</span>
        <i class="layui-icon layui-icon-down"></i>
      </li>
    </ul>
    <div class="header-title">
      <i class="layui-icon layui-icon-prev"></i>
      <div class="header-title-box">
        <span>进行中</span>
        <i class="layui-icon layui-icon-close"></i>
      </div>
    </div>
  </header>
</template>
<script>
export default {};
</script>
<style lang="less">
.header {
  width: 100%;
  height: 100px;
  background-color: #fff;
  border-bottom: 2px solid #ccc;
  position: relative;
  .header-right {
    display: flex;
    align-items: center;
    padding: 20px 50px;
    float: right;
    .nav-item {
      margin: 0 10px;
      cursor: pointer;
      img {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
      }
      span{
          font-size:14px;
          margin-left:5px;
      }
      .layui-icon-down{
          margin-left:3px;
      }
    }
  }
  .header-title {
    position: absolute;
    left: 240px;
    bottom: 0;
    height: 30px;
    font-size: 20px;
    .layui-icon-prev {
      float: left;
      margin-right: 20px;
      margin-top: 3px;
      font-size: 20px;
      color: #4fca8b;
    }
    .header-title-box {
      float: left;
      width: 140px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #f6f6fa;
      font-size: 14px;
      vertical-align: middle;
      color: #4fca8b;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border: 2px solid #ccc;
      border-bottom: none;
      span {
        margin-right: 20px;
      }
      .layui-icon-close {
        vertical-align: middle;
      }
    }
  }
}
</style>