<template>
  <div class="header">
    <b-navbar toggleable="md" varaiant="faded" type="light">
      <div class="menu">
        <font-awesome-icon icon="bars" size="lg"/>
      </div>
      <div class="brand">
        <b-navbar-brand href="#">
          <img src="./../assets/gmail.png" class="d-inline-block align-top" alt="BV">
          Gmail
        </b-navbar-brand>
      </div>
      
      <div class="search">
          <font-awesome-icon icon="search" size="lg"/>
          <input type="text" placeholder="Search mail">     
      </div>
      <b-navbar-nav class="ml-auto">
        <svg width="60" height="60">
          <defs>
            <clipPath id="myCircle">
               <circle cx="30" cy="30" r="20" fill="#FFFFFF" />
            </clipPath>
          </defs>
          <image width="60" height="60" xlink:href="./../assets/ammon.jpg" clip-path="url(#myCircle)" />
        </svg>
      </b-navbar-nav>
    </b-navbar>
    
  </div>
</template>

<style scoped>
.header {
  /* height: 64px; */
  background-color: white;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d3d3d3;
}
.menu {
  padding-left: 10px;
  padding-right: 25px;
}
img {
  padding-right: 10px;
}
.brand{
  padding-right: 9%;
}
.search {
  border-style: solid;
  border-width: 1px;
  border-color: red;
  background-color: grey;  
}
.search > input{
  min-width: 310px;
}
</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppHeader',
  components: {
    FontAwesomeIcon
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
