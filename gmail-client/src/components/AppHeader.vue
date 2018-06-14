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
              <svg width="60" height="60" viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet">
              <defs>
                <clipPath id="myCircle">
                  <circle cx="50" cy="50" r="40"/>
                </clipPath>
              </defs>
            <!-- <image width="60" height="60" xlink:href="{{ emailPic }}"/> -->
            <image width="90" height="90" xlink:href="https://lh5.googleusercontent.com/-ebIkXc5Lq3M/AAAAAAAAAAI/AAAAAAAABUw/3E4p89NPZZ8/s96/photo.jpg" clip-path="url(#myCircle)" />
            <!-- We need to make the image smaller but keep the amount of image that's visible in the picture currently -->
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
  height: 80px;
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
  },
  created() {
    
  }
}
</script>
