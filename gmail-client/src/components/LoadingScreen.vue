<template>
  <div class="column">
      <br><br><br><br>
    <img src="./../assets/logo1.png" alt="">
    <br>
    
    <div class="load-bar">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>




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
.load-bar {
  position: relative;
  margin-top: 20px;
  width: 80%;
  float: center;
  height: 10px;
  background-color: #fdba2c;
}
.bar {
  float: center;
  content: "";
  display: inline;
  position: absolute;
  width: 0;
  height: 100%;
  left: 50%;
  text-align: center;
}
.bar:nth-child(1) {
  background-color: #da4733;
  animation: loading 3s linear infinite;
}
.bar:nth-child(2) {
  background-color: #3b78e7;
  animation: loading 3s linear 1s infinite;
}
.bar:nth-child(3) {
  background-color: #fdba2c;
  animation: loading 3s linear 2s infinite;
}
@keyframes loading {
    from {left: 50%; width: 0;z-index:100;}
    33.3333% {left: 0; width: 100%;z-index: 10;}
    to {left: 0; width: 100%;}
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

