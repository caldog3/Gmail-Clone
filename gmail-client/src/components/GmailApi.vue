/* eslint-disable */
<template>
  <div>
    <h1>Gmail Client</h1>
    <button @click="getMessages('google')">auth Google</button>
    
    <ol id="example-1">
    <li v-for="message in messages" :key="message.id">
      <hr>
      From: {{ message.from }}
      To: {{ message.to }}
      Subject: {{ message.subject }}
    </li>
  </ol>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios';
import base64 from 'base-64';

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://localhost:8080/',  
  providers: {
    google: {
      clientId: 'XXXXXXXXXXXX.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/',
      responseType: 'token',
      scope: 'https://www.googleapis.com/auth/gmail.readonly',
    }
  }
})
export default {
  name: 'GmailApi',
  data () {
    return { 
      token: '',
      messages: []
    }
  },
  methods: {
    getMessages(provider){
      this.authenticate(provider);
      this.getListOfMessages();
    },
    getListOfMessages(){
      axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages`, 
        { 
          headers: { 
            Authorization: `Bearer ${this.token}`
          }
        }).then((response) => {
          return response.data.messages;
        }).then((messages)=>{
          console.log(messages);
          messages.forEach(message => {
            this.getMessageSnippet(message.id);
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    getMessageSnippet(id){
        axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${id}`, 
        { 
          headers: { 
            Authorization: `Bearer ${this.token}`
          }
        }).then((response) => {
          let headers = response.data.payload.headers;

          let from = headers[19].value;
          let to = headers[21].value;
          let subject = headers[23].value;
          let snippet = response.data.snippet;

          this.messages.push({from, to, subject, snippet});
        }).catch((error) => {
          console.log(error);
        });
    },
    authenticate(provider){
      this.$auth.authenticate(provider)
      .then((result) => {
        this.token = result.access_token;
      })
    },
  }
}
</script>

<style>
</style>
