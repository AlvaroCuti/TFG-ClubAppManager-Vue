<script setup>
defineProps({
  placeholder:{
    type: String,
    required: true
  }
})
</script>

<template>
    <button class="boton">
        <img src="@/assets/Filter.png" width="20" height="20"/>
        {{placeholder}}
    </button>
</template>
  

<style scoped>
  .boton{
    background-color: transparent;
    color: #6543E0;
    border-radius: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 9px;
    border-color: #6543E0;
    border-width: 1px;
    padding-right: 18px;
    padding-left: 18px;
    padding-top: 6px;
    padding-bottom: 5px;
    font-size: smaller;
    font-weight: 700;
  }
</style>