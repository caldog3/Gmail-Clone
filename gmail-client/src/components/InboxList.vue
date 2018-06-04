/* eslint-disable */
<template>
  <div>
    <b-tabs>
        <b-tab title="Primary">
            <div v-if="loadedMessage">
                <ul id="example-1">
                    <li v-for="message in messages" :key="message.from">
                        {{ message.from }} |
                        {{ message.subject }}|
                        {{ message.snippet }}...|
                        {{ message.time }}
                    </li>
                </ul>
            </div>
            <div v-else>
                <button type="submit" @click="getListOfMessages">Get Emails</button>
            </div>
        </b-tab>
        <b-tab title="Social">
            
        </b-tab>
        <b-tab title="Promotions">
        </b-tab>
    </b-tabs>
  </div>
</template>

<style scoped>
</style>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
// import base64 from 'base-64';

Vue.use(VueAxios, axios)

export default {
  name: 'InboxList',
  data () {
    return {
      messages: [],
      loadedMessage: false,
    }
  },
  methods: {
    getListOfMessages(){
      axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages`, 
        { 
          headers: { 
            Authorization: `Bearer ${this.token}`
          }
        }).then((response) => {
            this.loadedMessage = true;
          return response.data.messages;
        }).then((messages)=>{
          console.log(messages);
          messages.forEach(message => {
            this.getMessageContent(message.id);
          });
        }).catch((error) => {
          console.log(error);
        });
    },
    getMessageContent(id){
        axios.get(`https://www.googleapis.com/gmail/v1/users/me/messages/${id}`, 
        { 
          headers: { 
            Authorization: `Bearer ${this.token}`
          }
        }).then((response) => {
          console.log("MAIN RESPONSE JSON");
          console.log(response);
          var headers = response.data.payload.headers;
          var isPromo = true;
          for (var i = 0; i < response.data.labelIds.length; i++) {
            let indexSpot = response.data.labelIds[i];
            if (indexSpot === "CATEGORY_PROMOTIONS" || indexSpot === "CATEGORY_SOCIAL") {
              isPromo = false;
            }
          }
          if (isPromo) {
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
              else if (headers[i].name === "Date") {
                var time = headers[i].value;
              }
            }
            let snippet = response.data.snippet;
            let body = atob(response.data.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/'));
            this.messages.push({from, to, subject, snippet, body, time});
          } 
        }).catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>