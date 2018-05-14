<template>
    <button @click="authenticate('google')">auth Google</button>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8082/', // Your API domain
  
  providers: {
    google: {
      // Create a client ID and api key through the google 
      // developer console.
      clientId: 'XXXXXXXXXXXX-XXXXXXXXXXXXXXXX.apps.googleusercontent.com',
      // Still figuring out the best use for the redirectUri
      redirectUri: 'http://localhost:8080/',
      // This is a scope for testing purposes. To be change to 
      // one of the Gmail scopes.
      scope: 'https://www.googleapis.com/auth/drive.metadata.readonly',
    }
  }
})
export default {
  name: 'GmailApi',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    login: function () {
      this.$auth.login({ email, password }).then(function () {
        // Execute application logic after successful login
      })
    },

    register: function () {
      this.$auth.register({ name, email, password }).then(function () {
        // Execute application logic after successful registration
      })
    },
    authenticate: function (provider) {
      this.$auth.authenticate(provider).then(function (result) {
        // Execute application logic after successful social authentication
      })
    }
  }
}
</script>

<style>
</style>
