/* eslint-disable */
<template>
    <button @click="authenticate('google')">Sign In</button>
</template>

<style scoped>

</style>

<script>
import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueAuthenticate from 'vue-authenticate';
import axios from 'axios';

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: process.env.BASE_URL,  
  providers: {
    google: {
      clientId: process.env.CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
      responseType: 'token',
      scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send',
    }
  }
})
export default {
  name: 'GmailAuth',
  methods: {
    authenticate(provider){
      this.$auth.authenticate(provider)
      .then((result) => {
        this.$store.dispatch('setToken', result.access_token);
      })
    }
  }
}
</script>