<template>
  <div class="column">
    <h1>Gmail Clone</h1>
    <div class="logo">
      <img src="./../assets/gmailLogo.png" alt="" class="responsive">
    </div>
    <br>
    <button @click="authenticate()">Sign In</button>
    <div class="whiteSpace">
    </div>
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

 export default {
   name: 'LoginPage',
   methods: {
    authenticate(){
       let googleAuth = this.$store.getters.googleAuth;
      googleAuth.signIn().then(() => {
        let currentUser = googleAuth.currentUser.get();
		    let currentUserProfile = currentUser.getBasicProfile();

        this.$store.commit('currentUser', currentUser);
        this.$store.commit('currentUserProfile', currentUserProfile);
        this.$store.commit('setToken', currentUser.Zi.access_token);
        this.$store.commit('sessionExpiration', currentUser.Zi.expires_at);
      });
     }
   }
 }
</script>

