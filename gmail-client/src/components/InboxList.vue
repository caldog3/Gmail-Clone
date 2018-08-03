
/* eslint-disable */
<template>
  <div>
    <div id="setWidth">
      <b-tabs>
        <!-- <b-tab title="Primary" v-on:click="updateCurrentFolder('PRIMARY')"> -->
        <b-tab>
          <template slot="title">
            <div class="backdrop">
              Primary
            </div>
          </template>
            <email-list labelId="PRIMARY"/>
        </b-tab>
        <!-- <b-tab title="Social" v-on:click="updateCurrentFolder('SOCIAL')"> -->
        <b-tab>
          <template slot="title">
            <div class="backdrop">
              Social
            </div>
          </template>
          <email-list labelId="SOCIAL"/>
        </b-tab>
        <!-- <b-tab title="Promotions" v-on:click="updateCurrentFolder('PROMOTIONS')"> -->
        <b-tab>
          <template slot="title">
            <div class="backdrop">
              Promotions
            </div>
          </template>
          <email-list labelId="PROMOTIONS"/>
        </b-tab>
      </b-tabs>
    </div>


    <!-- <div class="backdrop">

    </div> -->
  </div>
</template>

<style scoped>
#setWidth {
  /* background: rgba(255, 255, 255, 0.6); */
}
.backdrop {
  background-color: white;
  width: 100%;
  height: 100%;
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