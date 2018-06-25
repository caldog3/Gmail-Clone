<template>
  <div class="sideBar">
    <button v-on:click.stop="composeShow()">Compose</button>
    <!-- <b-modal v-model="composeShow">
      Test compose block
    </b-modal> -->

    <div class="options">
      <div class="inbox">
        
        <div id="sidebarFlex">
          <div>
            <font-awesome-icon style="color:black;" icon="inbox" />  Inbox
          </div>
          <div>
            <b-badge variant="primary" pill class="notificationPill" v-if="unreadCount > 0">{{unreadCount}}</b-badge>
          </div>
        </div>

      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:black;" icon="star" />  Starred
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:black;" icon="clock"/>  Snoozed
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:black;" icon="arrow-right" />  Important
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:black;" icon="paper-plane" />  Sent
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:black;" icon="file"/>  Drafts
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:black;" icon="exclamation-circle"/>  Spam
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:black;" icon="trash" />  Trash
        </div>
      </div>

    </div>

  </div>

</template>

<style scoped>
#sidebarFlex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  padding-right: 10px;
}
.sideBar {
  /* max-width: 270px; */
  float: left;
}
#bootstrap-overrides {
  text-align: left;
}
button {
  margin: 30px;
  cursor: pointer; 
}
.notificationPill b-badge {
  text-align: right;
}
.inbox {
  background: rgba(255, 255, 255, 0.4);
}
.options {
  color: black;
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
  background: rgba(255, 255, 255, 0.4);
}
.notInbox {
  float: left;
  padding: 5px;
}
/* .list-group-item-dark {
  background-color: inherit;
  color: white;
}
.list-group-item-action {
  background-color: inherit;
  color: white;
} */
</style>

<script>
import { getLabelsForUnread } from './../store-utility-files/gmail-api-calls';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import eventBus from '../event_bus';

export default {
  name: 'MessageSidebar',
  components: {
    FontAwesomeIcon,
    eventBus
  },
  data() {
    return {
      unreadCount: 0  ,
    }
  },
  methods: {
    composeShow() {
      eventBus.$emit('COMPOSE_OPEN');
    },
    loadInbox() {
      //console.log("HERE???????");
      this.$router.push({ path: '/' });
    },
    loadDrafts() {
      //not sure how to route this properly yet
      this.$router.push({ path: '/'})
    },
  },
  created() {
    eventBus.$on('UNREAD_COUNT', unreads => {
      this.unreadCount = unreads; 
    }),
    getLabelsForUnread();
  },
  
}
</script>