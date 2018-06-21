<template>
  <div class="sideBar">
    <button v-on:click.stop="composeShow()">Compose</button>
    <!-- <b-modal v-model="composeShow">
      Test compose block
    </b-modal> -->

    <b-list-group id="bootstrap-overrides">
      <b-list-group-item class="dflex justify-content-between" @click="loadInbox()" href="#" variant="dark">
        <div id="sidebarFlex">
          <div>
            <font-awesome-icon icon="inbox" />  Inbox
          </div>
          <div>
            <b-badge variant="primary" pill class="notificationPill" v-if="unreadCount > 0">{{unreadCount}}</b-badge>

          </div>
        </div>
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="star" />  Starred
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="clock"/>  Snoozed
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="arrow-right" />  Important
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="paper-plane" />  Sent
      </b-list-group-item>
      <b-list-group-item @click="loadDrafts()" href="#">
        <font-awesome-icon icon="file"/>  Drafts
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="exclamation-circle"/>  Spam
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="trash" />  Trash
      </b-list-group-item>
    </b-list-group> 
  </div>

</template>

<style scoped>
#sidebarFlex {
  display: flex;
  flex-direction: row;
  justify-content: space-between
}
.sideBar {
  /* max-width: 270px; */
  background-color: white;
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