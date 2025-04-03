<script setup>
// Lógica para el registro, si es necesario
</script>

<!-- src/views/RegisterForm.vue -->
<template>
    <div>
      <h1>Registro</h1>
      <form>
        <div>
          <label for="username">Nombre de usuario:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div>
          <label for="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Registrar</button>
      </form>
    </div>
  </template>
  