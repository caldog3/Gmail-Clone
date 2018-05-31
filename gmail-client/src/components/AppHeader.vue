<template>
  <div class="header">
      <div class="logo">
        <h3>Google</h3>
      </div>
<b-navbar toggleable="md" type="dark" variant="info">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">NavBar</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item href="#">Link</b-nav-item>
      <b-nav-item href="#" disabled>Disabled</b-nav-item>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>  
  </div>
</template>

<style scoped>
.logo {
  float: left;
  width: 150px;
  margin: 0 20px 0 0;
}
</style>

<script>

export default {
  name: 'AppHeader',
  components: {

  },
  data() {
    return {
      currentUser: window.currentUser
    }
  },
  methods: {
    // search(event) {
    //   this.$store.dispatch('search', event.target.value)
    // }
  }
}
</script>
