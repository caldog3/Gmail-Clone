<template>
  <div id="app">
    <app-header/>
    <div class="sideBar">
      <message-sidebar/>
    </div>
    <div class="mainView">
      <utility-bar/>
      <div class="emailList">
        <router-view/>
      </div>
    </div>
    
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MessageSidebar from './components/MessageSidebar';
import UtilityBar from './components/UtilityBar'

export default {
  name: 'App',
  components: { 
    AppHeader,
    MessageSidebar,
    UtilityBar
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
}
body {
  overflow: hidden;
}
.sideBar {
  min-width: 270px;
  height: 860px;
  float: left;
}
.emailList {
  overflow-y: auto;
  height: 800px;
}
</style>
