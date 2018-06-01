<template>
  <div id="app">
    <app-header/>
    <div class="sideBar">
      <message-sidebar/>
    </div>
    <div class="mainView">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import AppHeader from './components/AppHeader';
import MessageSidebar from './components/MessageSidebar';

export default {
  name: 'App',
  components: { 
    AppHeader,
    MessageSidebar
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
  /* margin-top: 60px; */
}
body {
  background-color: #eeeeee;
  overflow: hidden;
}
.sideBar {
  min-width: 270px;
  height: 860px;
  float: left;
}
.mainView {
  overflow-y: auto;
  height: 800px;
  /* overflow-x: hidden; */
}
</style>
