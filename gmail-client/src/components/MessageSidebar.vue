<template>
  <div class="sideBar">
    <button v-on:click.stop="composeShow()">Compose</button>
    <!-- <b-modal v-model="composeShow">
      Test compose block
    </b-modal> -->

    <b-list-group id="bootstrap-overrides">
      <b-list-group-item class="dflex justify-content-between" href="#" variant="dark">
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
      <b-list-group-item href="#">
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
}
.notificationPill b-badge {
  text-align: right;
}

</style>

<script>

import eventBus from '../event_bus'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'MessageSidebar',
  components: {
    FontAwesomeIcon,
    eventBus
  },
  data() {
    return {
      unreadCount: 4,
    }
  },
  methods: {
    composeShow() {
      eventBus.$emit('COMPOSE_OPEN');
    },
    updateUnread(num) {
      this.unreadCount = num;
    },
  },
  created() {
    eventBus.$on('UNREAD_COUNT', unreads => {
      console.log("was this received");
      this.unreadCount = unreads; 
    }),
    this.$store.dispatch("getLabelsForUnread");    
    console.log("afer the fact?");
  },
  mounted() {
    eventBus.$on('UNREAD_COUNT', unreads => {
      console.log("was this received");
      this.unreadCount = unreads; 
    });
    console.log("after the fact? 2");
  },
  
}
</script>