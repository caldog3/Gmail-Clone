<template>
  <div class="column">
    <!-- <h1>Gmail Clone</h1> -->
    <div class="logo">
      <img src="./../assets/2040.png" alt="" class="responsive">
    </div>
    <br>
    <div>
      <!-- It's here
      <boardal/> -->
    </div>
    <input v-model="name" placeholder="First and Last Name">
    <input v-model="email" placeholder="email address">
    <br>
    <!-- <input type="checkbox" name="tutorial" value="true" v-model="tutorialUser"> I'm a tutorial user -->
    <button @click="login">Log In</button>

    <!-- <button @click="authenticate()">Sign In</button> -->
    <div class="whiteSpace"></div>

    
  </div>
</template>

<style scoped>
.column {
  background-color: white;
  height: 100%;
}
.whiteSpace {
  height: 9999px;
  /* not sure if this is the best strategy for solving this but I mean it works.... */
}
.logo {
  width: 40%;
  margin: auto;
}
.responsive {
  width: 100%;
  height: auto;
}
</style>

<script>
import { fireRetrieveMessages } from '../firebase/firebase';
import eventBus from './../event_bus';
// import Boardal from './OnboardingModal';

 export default {
   name: 'LoginPage',
   data(){
     return {
       name: "",
       email: "",
       tutorialUser: false,
     };
   },
   components: {
    //  Boardal,
   },
   methods: {
    authenticate(){
      //  const googleAuth = this.$store.getters.googleAuth;
      // googleAuth.signIn().then(() => {
      //   const currentUser = googleAuth.currentUser.get();
		  //   const currentUserProfile = currentUser.getBasicProfile();

      //   this.$store.commit('currentUser', currentUser);
      //   this.$store.commit('currentUserProfile', currentUserProfile);
      //   this.$store.commit('setToken', currentUser.Zi.access_token);
      //   this.$store.commit('sessionExpiration', currentUser.Zi.expires_at);
      // });
     },
     login(){
       
      this.$store.state.userEmail = this.email;
      this.$store.state.userName = this.name;
      this.email = "";
      this.name = "";
      eventBus.$emit('DATA_FETCHING_COMPLETE');
      if (this.tutorialUser) {
        this.$store.state.tutorialUser = true;
        eventBus.$emit("SHOW_INTRO_MODAL");
        // eventBus.$emit('TOGGLE_TUTORIAL_USER');
      }
      
      fireRetrieveMessages();
     }
   }
 }
</script>

