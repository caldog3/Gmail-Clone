<template>
  <div id="app">
    <!-- LOG-IN SCREEN -->
    <div class="notLoggedIn" v-if="!loggedIn">
      <login-page/>
    </div>

      <!-- OUR ACTUAL EMAIL -->
    <div class="loggedIn" v-else-if="loggedIn && this.loading">

      <div id="header" ref="appHeader"><app-header/></div>

      <div class="sideBar"><message-sidebar/></div>

      <div class="mainView">
        <utility-bar/>
        <div class="emailList" :style="emailListHeight">
          <router-view/>
          <div class="termsUnderneath">
            <br><br>
            <p>
              <a href="https://policies.google.com/terms" rel="noopener noreferrer" target="_blank">Terms</a> 
              - 
              <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Privacy</a> 
              - 
              <a href="https://www.google.com/gmail/about/policy/" rel="noopener noreferrer" target="_blank">Program Policies</a>
            </p>
          </div>
        </div>
      </div>

      <Compose/>
      
    </div>

    <!-- LOADING SCREEN - NOTE: has to be here because of v-else-if evaluation order -->
    <div class="loadingScreen" v-else-if="loggedIn && triggerLoading">
      <loading-screen/>
    </div>


  </div>
</template>

<script>
import Vue from "vue";
import eventBus from "./event_bus";
import Compose from "./components/Compose";
import AppHeader from "./components/AppHeader";
import MessageSidebar from "./components/MessageSidebar";
import UtilityBar from "./components/UtilityBar";
import LoginPage from "./components/LoginPage";
import LoadingScreen from "./components/LoadingScreen";
import { setTimeout } from 'timers';

export default {
  name: "App",
  data() {
    return {
      emailListHeight: {},
      initialHeightCalculated: false,
      loading: false,
    };
  },
  components: {
    AppHeader,
    MessageSidebar,
    UtilityBar,
    LoginPage,
    Compose,
    LoadingScreen,
  },
  computed: {
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    },
    triggerLoading: function() {
      this.loaded(false);
      return true;
    }
  },
  methods: {
    setEmailListHeight() {
      let verticalPadding = 40;
      if (this.$refs.appHeader !== undefined) {
        let height =
          window.innerHeight -
          this.$refs.appHeader.clientHeight -
          verticalPadding;
        Vue.set(this.emailListHeight, "height", `${height}px`);

        if (!this.initialHeightCalculated){
          this.initialHeightCalculated = true;
        }
      }
    },
    loaded(ourBool) {
      console.log("reached loaded");
      let returnVal = ourBool;
      this.updateLoading();
      return returnVal;
    },
    updateLoading() {
      console.log("Reached update loading");
      if (this.loading === false) {
        setTimeout(() => {
          console.log("passed the timeout");
          this.loading = true;
          this.loaded(true);
        }, 4500);
      }
      //   ^^ HERES THE TIME IN MILISECONDS
    },

  },
  beforeUpdate() {
    if (!this.initialHeightCalculated){
      this.setEmailListHeight();
    }
    
    this.$nextTick(function() {
      window.addEventListener("resize", this.setEmailListHeight);
    });
  },
  mounted() {
    this.setEmailListHeight();   
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
  top: 0;
  bottom: 0;
}
#header {
  height: 91px;
}
body {
  overflow: hidden;
}
.loggedIn {
  background-image: url(assets/Background15.jpg);
  box-shadow: inset 0 0 0 1000px rgba(0,0,0,.25);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  /* position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0; */
  /* z-index: -3;
  position: relative; */
}
.sideBar {
  min-width: 270px;
  height: 860px;
  float: left;
}
.emailList {
  overflow-y: auto;
  padding-right: 5px;
  padding-bottom: 60px;
}
.termsUnderneath {
  color: white;
}
.notLoggedIn {
  height: 100%;
}
.mainView {
  margin-right: 50px;
  min-width: 770px;
}

/* Scroll Bar for EmailList */
/* width */
.emailList::-webkit-scrollbar {
  width: 12px;
}
/* Track */
.emailList::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
/* Handle */
.emailList::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5); 
}
/* Handle on hover */
.emailList::-webkit-scrollbar-thumb:hover {
 background: rgba(255, 255, 255, 0.9);
}

/* Scroll Bar for SideBar */
/* width */
.optionsA::-webkit-scrollbar {
  width: 6px;
}
/* Track */
.optionsA::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
/* Handle */
.optionsA::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5); 
}
/* Handle on hover */
.optionsA::-webkit-scrollbar-thumb:hover {
 background: rgba(255, 255, 255, 0.9);
}


.termsUnderneath a:link {
  text-decoration: none;
  color: white;
}
.termsUnderneath a:visited {
  text-decoration: none;
  color: white;
}
.termsUnderneath a:hover {
  text-decoration: none;
  color: white;
}
.termsUnderneath a:active {
  text-decoration: none;
  color: white;
}
</style>
