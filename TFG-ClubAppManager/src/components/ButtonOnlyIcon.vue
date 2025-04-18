<script setup>
const props = defineProps({
  icon:{
    type: String,
    required: true
  },
  color:{
    type: String,
    required: true
  }
})
const emit = defineEmits(["click"]);
</script>

<template>
    <button @click="emit('click')" class="boton" :style="{ backgroundColor: props.color }">
        <img :src="icon" width="20" height="20"/>
    </button>
</template>
  

<style scoped>
    .boton{
        border-radius: 7px;
        border: none;
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

</style>