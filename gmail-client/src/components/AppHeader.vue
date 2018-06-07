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
        <span class="icon">
          <font-awesome-icon icon="search" size="lg"/>
        </span>
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
          <!-- <img :src="currentUserProfile.photoURL" alt="Avatar"> -->
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
  /* border-style: solid; */
  /* border-width: 1px; */
  /* border-color: red; */
  border-radius: 5px;
  background-color: #BDBDBD;  
  width: 60%;
  height: 35px;
}
.search > input{
  /* min-width: 310px; */
  float: left;
  margin-left: 5px;
  width: 80%;
  border: none;
  background-color: #BDBDBD;
  -webkit-appearance: none;
  height: 100%;
}

input:focus {
  outline-width: 0;
}

.icon {
  float: left;
  cursor: pointer;
  padding: 7px;
}
@media screen and (max-width : 930px) {
  .search { 
  width: 40%;
  height: 35px;
}
.search > input{
}
  .icon {
    margin-left: 0px;
  }
  @media screen and (max-width : 858px) and (min-width : 750px) {
    .search {
      background-color: #BDBDBD;    
      width: 300px; 
    }
    .search > input{
      display: flex;
      width: 250px;
      background-color: #BDBDBD;  
    }
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
