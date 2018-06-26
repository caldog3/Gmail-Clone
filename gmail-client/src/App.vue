<template>
  <div id="app">
    <div class="loggedIn" v-if="loggedIn">

      <div id="header" ref="appHeader"><app-header/></div>

      <div class="sideBar"><message-sidebar/></div>
      
      <div class="mainView">
        <utility-bar/>
        <div class="emailList" :style="emailListHeight">
          <router-view/>
        </div>
      </div>
      <Compose/>
    </div>

    <div class="notLoggedIn" v-else>
      <login-page/>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import eventBus from './event_bus';
import Compose from './components/Compose';
import AppHeader from './components/AppHeader';
import MessageSidebar from './components/MessageSidebar';
import UtilityBar from './components/UtilityBar';
import LoginPage from './components/LoginPage';

export default {
  name: 'App',
  data() {
    return {
      emailListHeight: {},
    }
  },
  components: { 
    AppHeader,
    MessageSidebar,
    UtilityBar,
    LoginPage,
    Compose
  },
  computed: {
    loggedIn: function() {
     return this.$store.getters.loggedIn;
    },
  },
  methods: {
    setEmailListHeight() {
      let verticalPadding = 40;
      if (this.$refs.appHeader !== undefined){
        let height = window.innerHeight - this.$refs.appHeader.clientHeight - verticalPadding;
        Vue.set(this.emailListHeight, 'height', `${height}px`); 
      }
    }  
  },
  beforeUpdate(){
    this.$nextTick(function() {
      window.addEventListener('resize', this.setEmailListHeight);
    }); 
  },
  mounted() {
    this.setEmailListHeight();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
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
  /* background-image: url(assets/Background6.jpg);
  background-repeat:no-repeat;
  background-size:cover; */
}
.loggedIn {
  background-image: url(assets/Background1.jpg);
  background-repeat:no-repeat;
  background-size:cover;
}
.sideBar {
  min-width: 270px;
  height: 860px;
  float: left;
}
.emailList {
  overflow-y: auto;
  /* margin-right: 3%; */
}
.notLoggedIn {
  height: 100%;
}
.mainView {
  margin-right: 3%;
}
</style>
