<template>
  <div class="sideBar">
    <button disabled="disabled">Compose</button>
    <b-list-group id="bootstrap-overrides">
      <b-list-group-item class="dflex justify-content-between align-items-center" href="#" variant="dark">
        <font-awesome-icon icon="inbox" size="md"/>  Inbox
        <b-badge variant="primary" pill>3</b-badge>
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="star" size="md"/>  Starred
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="clock" size="md"/>  Snoozed
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="arrow-right" size="md"/>  Important
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="paper-plane" size="md"/>  Sent
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="file" size="md"/>  Drafts
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="exclamation-circle" size="md"/>  Spam
      </b-list-group-item>
      <b-list-group-item href="#">
        <font-awesome-icon icon="trash" size="md"/>  Trash
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