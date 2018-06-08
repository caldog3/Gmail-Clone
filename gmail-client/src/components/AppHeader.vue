<template>
  <div class="header">
    <b-navbar toggleable="md" varaiant="faded" type="light">
      <div class="flexBox">
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
        <div class="flex">
          <div class="searchIcon">
            <font-awesome-icon icon="search" size="lg"/>
          </div>
          <div class="searchBar">
            <input type="text" placeholder="Search Mail">  
          </div>
        </div>  
      </div>
      <div>
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
        
          <imgage width="60" height="60" xlink:href="'https://img.devidentify.com/amugimu@gmail.com'"/>
        </svg>
      </b-navbar-nav>
      </div>
      </div>
    </b-navbar>
    
  </div>
</template>

<style scoped>

.flexBox {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
}
.flexBox div:last-child {
  margin-left: auto;
}
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
  /* margin-top: 17px;
  margin-bottom: 5px; */
}
img {
  padding-right: 10px;
}
.brand{
  padding-right: 85px;
  /* margin-top: 5px; */
}

.search {
  border-radius: 5px;
  background-color: #F5F7F7;  
  width: 60%;
  margin-right: 10px;
  height: 55px;
  /* margin-top:2px;
  margin-bottom: 2px; */
}
.searchIcon {
  margin-right: 3px;
  margin-left: 3px;
}

.searchBar {
  border: none;
}
input {
  background-color: #F5F7F7;
  width: 100%;
  -webkit-appearance: none;
  border: none;
  outline: none;
}

.flex {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  height: 100%
}

.flex > div {
  margin: 4px;
}

.searchBar {
  flex-grow: 1;
  flex-basis: 0;
}


@media screen and (max-width : 700px) {
  .search { 
  width: 40%;
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
  data() {
    return {
      profileJSON: {},
    }
  },
  methods: {
    signOut(){
      this.$store.dispatch('signOut');
    },
    getProfile() {
      var devIdentify = require("dev-identify")
      var email = "amugimu@gmail.com"
      devIdentify(email)
      .then(function(result) {
      console.log(result)
      this.profileJSON = result;
      });
    }
  }
}
</script>
