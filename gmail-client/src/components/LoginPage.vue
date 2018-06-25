<template>
  <div class="column">
    <h1>Gmail Clone</h1>
    <img src="./../assets/logo1.png" alt="">
    <br>
    <button @click="authenticate()">Sign In</button>
  </div>
</template>

<style scoped>
.column {
  background-color: white;
  height: 100%;
}
.whiteSpace {
  height: 9999px;
  /* not sure if this is the best strategy for solving this but I mean it works.... */
}
</style>

<script>
import GmailAuth from './GmailAuth';

 export default {
   name: 'LoginPage',
   components: {
     GmailAuth
   }
 }
</script>

