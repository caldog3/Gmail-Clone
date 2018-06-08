<template>
  <div class="sideBar">
    <button disabled="disabled">Compose</button>
    <b-list-group id="bootstrap-overrides">
      <b-list-group-item class="dflex justify-content-between" href="#" variant="dark">
        <font-awesome-icon icon="inbox" />  Inbox
        <b-badge variant="primary" pill class="notificationPill">3</b-badge>
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
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'MessageSidebar',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>