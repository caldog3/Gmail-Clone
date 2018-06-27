<template>
  <div class="sideBar">
    <button class="button" v-on:click.stop="composeShow()">Compose</button>
    <!-- <b-modal v-model="composeShow">
      Test compose block
    </b-modal> -->

    <div class="options">
      <div class="inbox">
        
        <div id="sidebarFlex" v-on:click="loadInbox()">
          <div>
            <font-awesome-icon style="color:white;" icon="inbox" />&emsp;  Inbox
          </div>
          <div>
            <b-badge variant="primary" pill class="notificationPill" v-if="unreadCount > 0">{{unreadCount}}</b-badge>
          </div>
        </div>

      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="star" />&emsp; Starred
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="clock"/>&emsp;  Snoozed
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="arrow-right" />&emsp;  Important
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="paper-plane" />&emsp;  Sent
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="file"/>&emsp;  Drafts
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="exclamation-circle"/>&emsp;  Spam
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="trash" />&emsp;  Trash
        </div>
      </div>

    </div>

  </div>

</template>

<style scoped>
.sideBar {
  float: left;
}
button {
  margin: 30px;
  cursor: pointer;
  outline: none;
}
.button {
  padding: 15px 32px;
  border-radius: 40px;
  outline: none;
}
.options {
  color: white;
  text-shadow: .5px -1px 2px #333;
  margin-right: 10px;
}
.options > div {
  width: 100%;
  height: 35px;
  padding-left: 15px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
}
.options > div:hover {
  /* background: rgba(153, 153, 153, 0.4); */
  background: rgba(255, 255, 255, 0.4);
}
.inbox {
  background: rgba(255, 255, 255, 0.5);
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
.notificationPill b-badge {
  text-align: right;
}
</style>

<script>
import { getLabelsForUnread } from "./../store-utility-files/gmail-api-calls";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import eventBus from "../event_bus";

export default {
  name: "MessageSidebar",
  components: {
    FontAwesomeIcon,
    eventBus
  },
  data() {
    return {
      unreadCount: 0
    };
  },
  methods: {
    composeShow() {
      eventBus.$emit("COMPOSE_OPEN");
    },
    loadInbox() {
      //console.log("HERE???????");
      this.$router.push({ path: "/" });
    },
    loadDrafts() {
      //not sure how to route this properly yet
      this.$router.push({ path: "/" });
    }
  },
  created() {
    eventBus.$on("UNREAD_COUNT", unreads => {
      this.unreadCount = unreads;
    }),
    getLabelsForUnread();
  }
};
</script>