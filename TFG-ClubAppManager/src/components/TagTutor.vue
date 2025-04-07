<script setup>
defineProps({
  placeholder:{
    type: String,
  }
})
</script>

<template>
    <div class="tutor">
        <img alt="logo" class="logo" src="@/assets/user.png" width="25" height="25" />
        <h4>{{placeholder}}</h4>
    </div>
</template>
  

<style scoped>
.tutor{
  background-color: #E1E0E7;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  padding: 12px;
  gap: 5px;
}

h4{
  color: #0E0A1C;
  font-weight: 500;
}

</style>