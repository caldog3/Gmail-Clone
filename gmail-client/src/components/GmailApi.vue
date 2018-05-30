/* eslint-disable */
<template>
  <div>
    <h1>Gmail Client</h1>
    <button @click="getMessages('google')">auth Google</button>
    
    <ol id="example-1">
    <li v-for="message in messages" :key="message.id">
      <hr style="height:.3em;background-color:#333;">
      From: {{ message.from }} <b>|</b>
      To: {{ message.to }} <b>|</b>
      Subject: {{ message.subject }}
      <hr>
      {{ message.snippet }}
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
  baseUrl: process.env.BASE_URL,  
  providers: {
    google: {
      clientId: process.env.CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
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

          var headers = response.data.payload.headers;
          console.log("THIS IS A HEADER");
          console.log(headers);
          for (var i = 0; i < headers.length; i++) {
            if (headers[i].name === "From") {
              var from = headers[i].value;
            }
            else if (headers[i].name === "Delivered-To") {
              var to = headers[i].value;
            }
            else if (headers[i].name === "Subject") {
              var subject = headers[i].value;
            }
          }
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
