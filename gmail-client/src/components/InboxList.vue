
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
        <thread-list labelId="PRIMARY"/>
      </b-tab>

      <b-tab v-on:click="updateCurrentFolder('SOCIAL')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:#297be6;" icon="users" />&emsp; Social 
            </div>
          </div>
        </template>
        <thread-list labelId="SOCIAL"/>
      </b-tab>

      <b-tab v-on:click="updateCurrentFolder('PROMOTIONS')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:green;" icon="tag" />&emsp; Promotions
            </div>
          </div>
        </template>
        <thread-list labelId="PROMOTIONS"/>
      </b-tab>

    </b-tabs>
  </div>
</template>

<style scoped>
/* #setWidth {
  background: rgba(255, 255, 255, 0.6);
  min-width: 800px;
} */
.backdrop {
  background-color: rgba(255, 255, 255, 0.8);

  margin-left: -1rem;
  margin-right: -1rem;
  margin-bottom: -0.55rem;
  /* margin-top: -0.55rem; */
  border-radius: 3px 3px 0px 0px;
}
.tabSize {
  width: 150px;
  height: 41px;
  line-height: 41px;
  text-align: center;
}
</style>

<script>
import ThreadList from './ThreadList';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { setTimeout } from 'timers';
import eventBus from '../event_bus';


export default {
  name: 'InboxList',
  components: {
    ThreadList,
    FontAwesomeIcon
  },
  data() {
    return {
      labelId: '',
    }
  },
  methods: {
    updateCurrentFolder(tabFolder) {
      let previousFolder = this.$store.state.currentFolder;
      this.$store.state.currentFolder = tabFolder;
      // console.log("IT has been set to: " + this.$store.state.currentFolder);
      //need to reset the previous folder back to its first page
      if(this.$store.state.currentPage !== 1) {
        this.$store.state.labelMessages[previousFolder] = [];
        if (previousFolder === "PRIMARY" || (previousFolder === "SOCIAL" || previousFolder === "PROMOTIONS")) {
          this.$store.dispatch("getListOfMessages", previousFolder, false); //bool val is for refresh or not
        }
        else {
          this.$store.dispatch("getFolderListOfMessages", previousFolder);
        }
        this.$store.state.currentPage = 1;
      }
      // we have to reset the last page tokens because they no longer apply to the new label
      this.$store.state.labelLastPageTokens = [];
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
  created(){
    setTimeout(() => this.$store.dispatch("getAttachments"), 10);
  },
}
</script>