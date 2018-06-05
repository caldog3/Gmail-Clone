<template>
  <div class="sideBar">
    <button disabled="disabled">Compose</button>
    <b-list-group>
      <b-list-group-item>Inbox</b-list-group-item>
      <b-list-group-item>Starred</b-list-group-item>
      <b-list-group-item>Snoozed</b-list-group-item>
      <b-list-group-item>Important</b-list-group-item>
      <b-list-group-item>Sent</b-list-group-item>
      <b-list-group-item>Drafts</b-list-group-item>
      <b-list-group-item>Categories</b-list-group-item>
    </b-list-group> 
  </div>
</template>

<style scoped>
.sideBar {
  /* max-width: 270px; */
  background-color: white;
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

<style scoped>
  sideBar {
    text-align: left;
  }
</style>