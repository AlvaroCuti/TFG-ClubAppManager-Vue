<script>
    export default {
        props: {
            items: {
            type: Array,
            required: true
            }
        }
    }
</script>

<template>
    <div class="container">
        <div v-for="(item, index) in items" :key="index" class="box">
            {{ item }}
        </div>
    </div>
</template>
  

<style scoped>
    .container{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: #6543E0;
    }

    .box{
        color: #FFF;
        font-weight: 600;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
    }
</style>