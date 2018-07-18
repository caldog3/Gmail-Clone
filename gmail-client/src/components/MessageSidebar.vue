<template>
  <div class="sideBar">
    <button class="button" v-on:click.stop="composeShow()">
      <img src="./../assets/plus.png" class="d-inline-block align-top" alt="BV">
      &nbsp; &nbsp; Compose &nbsp; 
      </button>
    <!-- <b-modal v-model="composeShow">
      Test compose block
    </b-modal> -->

    <div class="options">
      <div v-bind:class="activeFolderClass('Inbox')" v-on:click="activateFolder('Inbox')">
        <div id="sidebarFlex" v-on:click="loadInbox()">
          <div>
            <font-awesome-icon style="color:white;" icon="inbox" />&emsp;  Inbox
          </div>
          <div>
            <p class="notificationPill" v-if="unreadCount > 0">{{unreadCount}}</p>
          </div>
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Starred')" v-on:click="starredHandle()">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="star" />&emsp; Starred
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Snoozed')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="clock"/>&emsp;  Snoozed
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Sent')" v-on:click="sentHandle()">
        <div class="notInbox"  id="sidebarFlex">
          <font-awesome-icon style="color:white;" icon="paper-plane" />&emsp;  Sent
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Drafts')" v-on:click="draftsHandle()">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="file"/>&emsp;  Drafts
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Important')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="arrow-right" />&emsp;  Important
        </div>
      </div>
      <div v-bind:class="activeFolderClass('All mail')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="envelope" />&emsp;  All Mail
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Spam')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="exclamation-circle"/>&emsp;  Spam
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Trash')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="trash" />&emsp;  Trash
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="cog" />&emsp;  Manage Labels
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="plus" />&emsp;  Create new label
        </div>
      </div>

    </div>

  </div>

</template>

<style scoped>
.sideBar {
  float: left;
}
img {
  width: 30px;
}
button {
  margin: 20px 90px 20px 5px;
  cursor: pointer;
  outline: none;
  background-color: white;
}
.button {
  padding: 13px 15px;
  border-radius: 40px;
  outline: none;
}
.options {
  color: white;
  text-shadow: .5px -1px 2px #333;
  margin-right: 10px;
  font-size: .9em;

}
.options > div {
  width: 100%;
  height: 35px;
  padding-left: 25px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
}
.options > div:hover {
  /* background: rgba(153, 153, 153, 0.4); */
  background: rgba(255, 255, 255, 0.4);
}
.activeFolder {
  background: rgba(255, 255, 255, 0.5);
}
.inactiveFolder {
  /* not sure */
}
#sidebarFlex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  padding-right: 10px;
  text-shadow: none;
}
.notInbox {
  float: left;
  padding: 5px;
}
#bootstrap-overrides {
  text-align: left;
}
.notificationPill {
  text-align: right;
}
</style>

<script>
import { getLabelsForUnread, getLabels } from "./../store-utility-files/gmail-api-calls";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import eventBus from "../event_bus";
import index from "../router/index.js"

export default {
  name: "MessageSidebar",
  components: {
    FontAwesomeIcon,
    eventBus
  },
  data() {
    return {
      unreadCount: 0,
      viewFolder: "Inbox",
    };
  },
  methods: {
    activateFolder(folder) {
      this.viewFolder = folder;
    },
    activeFolderClass(folder) {
      if (folder == this.viewFolder) {
        return "activeFolder";
      }
      else {return "inactiveFolder"}
    },
    composeShow() {
      eventBus.$emit("COMPOSE_OPEN");
    },
    loadInbox() {
      this.$router.push({ path: "/" });
    },
    loadDrafts() {
      //not sure how to route this properly yet
      this.$store.state.currentFolder = "DRAFT";
      this.$router.push({ path: "/Folder/DRAFTS/" });
    },
    loadSent() {
      this.$store.state.currentFolder = "SENT";
      this.$router.push({ path: "/Folder/SENT/" });
    },
    loadStarred() {
      this.$store.state.currentFolder = "STARRED";
      this.$router.push({ path: "/Folder/STARRED/" });
    },
    sentHandle() {
      this.loadSent();
      this.activateFolder("Sent");
    },
    draftsHandle() {
      this.loadDrafts();
      this.activateFolder("Drafts");
    },
    starredHandle() {
      this.loadStarred();
      this.activateFolder("Starred");
    },
  },
  created() {
    eventBus.$on("UNREAD_COUNT", unreads => {
      this.unreadCount = unreads;
    }),
    getLabelsForUnread();
    getLabels();
  }
};
</script>