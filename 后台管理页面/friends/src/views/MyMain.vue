<template>
  <div class="main">
    <MyNav />
    <Answer />
  </div>
</template>
<script>
import MyNav from "../components/nav/MyNav";
import Answer from "../components/answer/Answer";
export default {
  components: {
    MyNav,
    Answer,
  },
};
</script>
<style lang="less">
.main {
  width: calc(100% - 220px);
  height:100%;
  float: left;
  padding: 20px;
  box-sizing: border-box;
}
</style>