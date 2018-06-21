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
          <div class="flex">
            <div>
              <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="signOut">Sign Out</b-button>        
            </div>
            <div>
              <svg width="70" height="70" viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet">
              <defs>
                <clipPath id="myCircle">
                  <circle cx="45" cy="44" r="40"/>
                </clipPath>
              </defs>
            <!-- There's an error with the xlink stuff here that needs to be binded properly or something... -->
            <image width="90" height="90" v-bind:href="photoUrl" clip-path="url(#myCircle)" />
              </svg>
            </div>
          </div>
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
  min-width: 770px;
  overflow: hidden;
  height: 91px;
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
  height: 45px;
  /* margin-top:2px;
  margin-bottom: 2px; */
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
  margin: 10px;
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
import { getProfileEmail } from './../store-utility-files/gmail-api-calls';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import eventBus from './../event_bus';
import axios from 'axios';

export default {
  name: 'AppHeader',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      profileJSON: {},
      photoUrl: '',
    }
  },
  methods: {
    signOut(){
      this.$store.dispatch('signOut');
      this.$router.push({ path: '/' });
    },
    // getProfile() {
    //   var devIdentify = require("dev-identify")
    //   var email = "amugimu@gmail.com"
    //   devIdentify(email)
    //   .then(function(result) {
    //   console.log(result)
    //   this.profileJSON = result;
    //   });
    // }
    retrievePhotoURL(userEmail) {
      axios.get(`https://picasaweb.google.com/data/entry/api/user/${userEmail}?alt=json`)
      .then(response => {
        this.photoUrl = response.data.entry.gphoto$thumbnail.$t;
      })
    },
  },

  created () {
    getProfileEmail();
    eventBus.$on('PROFILE_EMAIL', email => {
      this.retrievePhotoURL(email);
    })
  },
  mounted() {
    
  }
}
</script>
