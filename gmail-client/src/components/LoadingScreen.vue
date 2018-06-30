<template>
  <div class="column">
    <img src="./../assets/logo1.png" alt="">
    <br>
    <h1> Hello we are loading.... </h1>
    <div class="whiteSpace">
    </div>
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

 export default {
   name: 'LoginPage',
   methods: {
   },
 }
</script>

