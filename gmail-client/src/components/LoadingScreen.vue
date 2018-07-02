<template>
  <div class="column">
      <br><br><br><br>
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
  
}
</style>

<script>
// WE NEED TO MAKE ALMOST ALL OF THE CALLS START BEING EXECUTED HERE
 export default {
   name: 'LoginPage',
   methods: {
   },
   created() {
    let promoMessages = this.$store.getters.getLabelMessages["PROMOTIONS"];
    if(promoMessages.length === 0){
      this.$store.dispatch("getListOfMessages", "PROMOTIONS");
    }
    let socialMessages = this.$store.getters.getLabelMessages["SOCIAL"];
    if(socialMessages.length === 0){
      this.$store.dispatch("getListOfMessages", "SOCIAL");
    }
    let personalMessages = this.$store.getters.getLabelMessages["PRIMARY"];
    if(personalMessages.length === 0){
      this.$store.dispatch("getListOfMessages", "PRIMARY");
    }
   },
 }
</script>

