
/* eslint-disable */
<template>
  <div id="setWidth">
    <b-tabs>
      <b-tab v-on:click="updateCurrentFolder('PRIMARY')">
        <template slot="title">
          <div class="backdrop">
            <font-awesome-icon style="color:black;" icon="inbox" /> Primary
          </div>
        </template>
        <email-list labelId="PRIMARY"/>
      </b-tab>
      <b-tab v-on:click="updateCurrentFolder('SOCIAL')">
        <template slot="title">
          <div class="backdrop">
            <font-awesome-icon style="color:black;" icon="users" /> Social
          </div>
        </template>
        <email-list labelId="SOCIAL"/>
      </b-tab>
      <b-tab v-on:click="updateCurrentFolder('PROMOTIONS')">
        <template slot="title">
          <div class="backdrop">
            <font-awesome-icon style="color:black;" icon="tag" /> Promotions
          </div>
        </template>
        <email-list labelId="PROMOTIONS"/>
      </b-tab>
    </b-tabs>
  </div>
</template>

<style scoped>
#setWidth {
  /* background: rgba(255, 255, 255, 0.6); */
}
.backdrop {
  background-color: white;
  width: 130px;
  height: 25px;
  border-radius: 5px;
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
  methods: {
    updateCurrentFolder(tabFolder) {
      this.$store.state.currentFolder = tabFolder;
      console.log("IT has been set to: " + this.$store.state.currentFolder);
    },
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