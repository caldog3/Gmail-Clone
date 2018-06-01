<template>
  <div class="column">
    <h1>Gmail Clone</h1>
    <img src="./../assets/logo.png" alt="">
    <gmail-auth/>
  </div>
</template>

<style scoped>

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

