
/* eslint-disable */
<template>
  <div id="setWidth">
    <b-tabs>
      <b-tab v-on:click="updateCurrentFolder('PRIMARY')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:red;" icon="inbox" />&emsp; Primary
            </div>
          </div>
        </template>
        <email-list labelId="PRIMARY"/>
      </b-tab>
      <b-tab v-on:click="updateCurrentFolder('SOCIAL')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:#297be6;" icon="users" />&emsp; Social
            </div>
          </div>
        </template>
        <email-list labelId="SOCIAL"/>
      </b-tab>
      <b-tab v-on:click="updateCurrentFolder('PROMOTIONS')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:green;" icon="tag" />&emsp; Promotions
            </div>
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
  /* width: 130px;
  height: 25px; */

  /* position: relative;
  left: -1rem;
  right: -1rem;
  top: -0.5rem;
  bottom: -0.5rem; */

  /* width:   110%;
  height:  110%;
  margin-top: -10%;
  margin-left: -10%; */

  margin-top: -0.55rem;
  margin-bottom: -0.55rem;
  margin-left: -1.1rem;
  margin-right: -1.1rem;
}
.tabSize {
  width: 170px;
  height: 56px;
  line-height: 56px;
}
</style>

<script>
import EmailList from './EmailList';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { setTimeout } from 'timers';
import eventBus from '../event_bus';


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
      if(tabFolder === "SOCIAL") {
        tabFolder = "CATEGORY_SOCIAL";
      }
      else if (tabFolder === "PROMOTIONS") {
        tabFolder = "CATEGORY_PROMOTIONS";
      }
      else if (tabFolder === "PRIMARY") {
        tabFolder = "INBOX";
      }
      eventBus.$emit("TOTAL_EMAIL_COUNT", tabFolder);
      // maybe trigger an update here for total emails in the utilityBar
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