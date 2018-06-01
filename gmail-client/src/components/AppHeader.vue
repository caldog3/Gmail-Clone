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
        <div class="icon">
          <font-awesome-icon icon="search" size="lg"/>
        </div>
        <input type="text" placeholder="Search Mail">     
      </div>
      <b-navbar-nav class="ml-auto">
        <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="signOut">Sign Out</b-button>
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
  padding-right: 85px;
}
.search {
  background-color: #BDBDBD;  
  width: 60%;
}
.search > input{
  float: right;
  width: 90%;
  background-color: #BDBDBD;
  -webkit-appearance: none;
}
.icon {
  float: left;
  width: 10%;
}
@media screen and (max-width : 760px) {
  .search {
    border-style: solid;
    border-width: 1px;
    border-color: blue;
    background-color: grey;  
    width: 300px;
    
  }
  .search > input{
    display: flex;
    width: 268px;
  }
  .icon {
    margin-left: 0px;
  }
}
</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'AppHeader',
  components: {
    FontAwesomeIcon
  },
  methods: {
    signOut(){
      this.$store.dispatch('signOut');
    }
  }
}
</script>
