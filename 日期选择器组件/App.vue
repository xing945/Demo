<template>
    <div id="app">
        <!-- <date-picker :date="date" @change-date="fn" /> -->
        <date-picker v-model="date" />
    </div>    
</template>
<script>
import DatePicker from './DatePicker'
export default {
    components:{
        DatePicker
    },
    data(){
        return {
            date:new Date(),
        }
    }
}
</script>