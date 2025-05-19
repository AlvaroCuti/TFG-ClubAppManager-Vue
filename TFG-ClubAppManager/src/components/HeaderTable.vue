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
        display: grid;
        grid-template-columns: 2fr 1fr 2fr 1fr 2fr 2fr 1fr auto; 
        background-color: #6543E0;
        border-radius: 8px;
        margin-bottom: 3px; /* solo en HeaderTable */
        padding-right: 50px; /* <-- Añadido */
    }

    .box{
        color: #FFF;
        font-weight: 600;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 15px;
        padding-right: 15px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>