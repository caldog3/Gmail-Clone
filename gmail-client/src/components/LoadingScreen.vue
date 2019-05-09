<template>
  <div class="column">
      <br><br><br><br>
    <div class="logo">
      <img src="./../assets/gmailLogo.png" alt="" class="responsive">
    </div>
    <br>
    <br>
    <br>
    <br>
    <div class="load-bar">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>

    <div class="whiteSpace"></div>
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
  margin: auto;
  float: center;
  height: 10px;
  background-color: #fdba2c;
}
.logo {
  width: 40%;
  margin: auto;
}
.responsive {
  width: 100%;
  height: auto;
}
.bar {
  content: "";
  display: inline;
  position: absolute;
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
import { mapGetters, mapActions } from 'vuex';
import eventBus from './../event_bus';
import { fireRetrieveMessages } from '../firebase/firebase';

 export default {
   name: 'LoginPage',
   methods: {
     ...mapGetters([
      'getLabelMessages'
    ]),
     ...mapActions([
       'getListOfMessages',
       'getFolderListOfMessages',
    ]),
    async getInboxLabels(label){
      if(this.getLabelMessages[label] === undefined){
        await this.getListOfMessages(label);
      }
    },
    getFolderLabels(label){
      if(this.getLabelMessages[label] === undefined){
        this.getFolderListOfMessages(label);  
      }
    },
   },
   created() {
      this.getInboxLabels('PRIMARY').then(()=>{
        eventBus.$emit('DATA_FETCHING_COMPLETE');
      })

      fireRetrieveMessages(this.$store.state.currentUser.w3.U3);
     
      this.getInboxLabels('SOCIAL');
      this.getInboxLabels('PROMOTIONS');
      
      // Get Folder labels
      this.getFolderLabels('DRAFT');
      this.getFolderLabels('SENT');
      this.getFolderLabels('STARRED');
      this.getFolderLabels('IMPORTANT');
      this.getFolderLabels('TRASH');
   },
 }
</script>

