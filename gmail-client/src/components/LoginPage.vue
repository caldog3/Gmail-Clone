<template>
  <div class="column">
    <h1>Gmail Clone</h1>
    <img src="./../assets/logo1.png" alt="">
    <br>
    <gmail-auth/>
  </div>
</template>

<style scoped>
.column {
  background-color: white;
  height: 100%;
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

