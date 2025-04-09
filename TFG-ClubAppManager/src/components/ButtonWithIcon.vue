<script setup>
defineProps({
  placeholder:{
    type: String,
    required: true
  },
  icon:{
    type: String,
    required: true
  }
})
</script>

<template>
    <button class="boton">
        <img :src="icon" width="20" height="20"/>
        {{placeholder}}
    </button>
</template>
  

<style scoped>
button {
    border-radius: 7px;
    background-color: #6543E0;
    color:#F6F5F8;
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding-right: 18px;
    padding-left: 18px;
    padding-top: 6px;
    padding-bottom: 5px;
    font-size: smaller;
    font-weight: 700;
}

button:hover{
  background-color: #593bc8; /* Verde más oscuro */
  transform: scale(1.02); /* Hace el botón un poco más grande */
}

</style>