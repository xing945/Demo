<template>
    <div class="default">
        <MySide />
        <MyHeader />
        <MyMain />
    </div>
</template>
<script>
import MySide from '../views/MySide';
import MyHeader from '../views/MyHeader';
import MyMain from '../views/MyMain'
export default {
    components:{
        MySide,
        MyHeader,
        MyMain
    }
}
</script>
<style lang="less">
    .default{
        width:100%;
        height:100%
    }
</style>