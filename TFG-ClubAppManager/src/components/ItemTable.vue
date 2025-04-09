<script setup>
defineProps({
    items: {
        type: Array,
        required: true
    },
    par: {
        type: Boolean,
        required: true
    }
})
</script>


<template>
    <div class="container" :style="{ backgroundColor: par ? '#E1E0E7' : '#C7C4D2'}">
        <div v-for="(item, index) in items" :key="index" class="box">
            {{ item }}
        </div>
    </div>
</template>
  

<style scoped>
    .container{
        display: grid;
        grid-template-columns: repeat(7, 1fr); /* 7 columnas iguales */
        background-color: #E1E0E7;
        margin-right: 100px;
        border-radius: 0px 0px 0px 0px;
    }

    .box{
        color: #000;
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