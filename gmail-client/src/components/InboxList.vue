
/* eslint-disable */
<template>
  <div>
    <div id="setWidth">
      <b-tabs>
        <b-tab icon='inbox' title="Primary">
          <email-list labelId="PRIMARY"/>
        </b-tab>
        <b-tab title="Social">
          <email-list labelId="SOCIAL"/>
        </b-tab>
        <b-tab title="Promotions" >
          <email-list labelId="PROMOTIONS"/>
        </b-tab>
      </b-tabs>
    </div>
      <div class="flexMessages">

      </div>

    <div class="messages">


    </div>



  </div>
</template>

<style scoped>
.messages {
  width: 100%;
  height: 700px;
  background-color: rgba(255, 255, 255, 0.7); 
}






#setWidth {
  display: none;
  background: rgba(255, 255, 255, 0.6);
}
</style>

<script>
import EmailList from './EmailList';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { setTimeout } from 'timers';

export default {
  name: 'InboxList',
  components: {
    EmailList,
    FontAwesomeIcon
  },
  data() {
    return {
      labelId: '',
    }
  },
  beforeCreate(){
    //MOVED TO LoadingScreen.vue Created
  },
  created(){
    console.log("INBOX LIST MOUNTED")
    setTimeout(() => {
      console.log("GetAttachments DISPATCHED")
      this.$store.dispatch("getAttachments");
    }, 1000);
    
  },
}
</script>