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
          <div class="flex1">
            <div class="searchIcon">
              <font-awesome-icon icon="search" size="lg"/>
            </div>
            <div class="searchBar">
              <input type="text" v-model="searchQuery" placeholder="Search Mail">  
            </div>
          </div>  
        </div>
        <input type="submit" class="searchButton" value="Search" @click="searching">

        <div>
          <div class="flex1">
            <div class="logoutButton">
              <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="signOut">Sign Out</b-button>        
            </div>
            <div class="userPhoto"> 
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
        </div>

      </div>   
    </b-navbar>
  </div>
</template>

<style scoped>
.searchButton {
  width: 73px;
  background-color: #6c757d;
  border-radius: 5px;
  height: 31px;
  line-height: 31px;
}
.searchButton input:focus {
  background-color: #6c757d;
  color: white;
}
.search:focus-within .searchButton {
  background-color: #6c757d;
  color: white;
}
.header {
  /* height: 64px; */
  border-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(153, 153, 153, 0.5);
  min-width: 770px;
  overflow: hidden;
  height: 91px;
  color: white;
  /* change here ^ */
}
.flexBox {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  height: 75px;
}
.flexBox div:last-child {
  margin-left: auto;
}
.menu {
  padding-left: 10px;
  padding-right: 25px;
}
.brand{
  padding-right: 85px;
  /* margin-top: 5px; */
}
img {
  padding-right: 10px;
}
.navbar-light .navbar-brand {
  color: white;
  /* change here ^ */
}
.search {
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.5);
  width: 60%;
  margin-right: 10px;
  height: 45px;
  color: white;
}
.search:focus-within {
  background-color: white;
  color: black
}
.flex1 {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  height: 100%
}
.searchIcon {
  margin: 10px;
}
.logoutButton {
  margin: 10px;
}
.userPhoto {
  margin-top: 15px;
}
::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  /* change here ^ */
  opacity: 1; /* Firefox */
  font-weight: bold;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: white;
  /* change here ^ */
  font-weight: bold;
}
::-ms-input-placeholder { /* Microsoft Edge */
  color: white;
  /* change here ^ */
  font-weight: bold;
}
.searchBar {
  border: none;
}
input {
  background-color: rgba(255, 255, 255, 0.0);
  color: white;
  width: 100%;
  -webkit-appearance: none;
  border: none;
  outline: none;
  padding-top: 0px;
}
input:focus {
  background-color: white;
  color: black;
}
.searchBar {
  flex-grow: 1;
  flex-basis: 0;
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
.flex div:last-child {
  margin-top: 20px;
}
.dropbtn {
  color: black;
  padding: 0px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  background-color: rgba(255, 0, 0, 0.0);
}




.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 99999999;
  cursor: default;
  right: 10px;
}
#Dropdown {
  color: black;
  
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown a:hover {background-color: #ddd;}
.show {
  display: block;
  position: relative;
  right: 65px;  
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

export default {
  name: 'AppHeader',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      searchQuery: '',
    }
  },
  computed: {
    photoUrl(){
      return this.$store.getters.getCurrentUserProfile.Paa;
    }
  },
  methods: {
    searching() {

      if (this.$store.state.labelMessages.SEARCH !== undefined) {
        this.$store.state.labelMessages.SEARCH = [];
      }
      this.$router.push({ path: '/SEARCH/'});
      console.log("AM I SEARCHING?");
      console.log(this.searchQuery);
      // this.$router.push({ path: '/SEARCH="' + this.searchQuery + '"/'});
      this.$store.state.currentFolder  = "SEARCH";
      console.log("IT has been set to: " + this.$store.state.currentFolder);
      this.$store.state.viewFolder = "Search";
      this.$store.dispatch("getQueryListOfMessages", this.searchQuery);
      console.log("State of the store");
      console.log(this.$store.state.labelMessages.SEARCH);
    },
    signOut(){
      this.$store.dispatch('signOut');
      this.$router.push({ path: '/' });
    },
    DropdownFunction() { 
      document.getElementById("Dropdown").classList.toggle("show");
    },
    // Close the dropdown if the user clicks outside of it
    window:onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }
  }
}
</script>
