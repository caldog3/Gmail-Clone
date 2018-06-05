/* eslint-disable */
<template>
  <div>
    <b-tabs>
        <b-tab title="Primary">
            <div v-if="loadedMessage">
                <table class="table table-striped table-inbox hidden" id="example-1">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Subject - Snippet</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                    <tbody v-for="message in messages" :key="message.id">
                        <td>{{ message.conciseFrom }}</td>
                   <!-- <td>{{ message. body}}</td> -->
                        <td>{{ message.subject }} - {{ message.snippet }}...</td>
                        <td>{{ message.time }}</td>

                    </tbody>
                </table>
            </div>
            <div v-else>
                <button type="submit" @click="getListOfMessages">Get Emails</button>
            </div>
        </b-tab>
        <b-tab title="Social">
            <div v-if="loadedMessage">
              <table class="table table-striped table-inbox hidden" id="example-1">
                <thead>
                  <tr>
                    <th>Sender</th>
                    <th>Subject - Snippet</th>
                    <th>Time</th>
                  </tr>
                </thead>
                  <tbody v-for="socialM in socialMs" :key="socialM.id">
                      <td>{{ socialM.conciseFrom }}</td>
                 <!-- <td>{{ socialM. body}}</td> -->
                      <td>{{ socialM.subject }} - {{ socialM.snippet }}...</td>
                      <td>{{ socialM.time }}</td>

                  </tbody>
              </table>
            </div>
            <div v-else>
              <p>"you don't have permission for this yet"</p>
            </div>
        </b-tab>
        <b-tab title="Promotions">
          <div v-if="loadedMessage">
            <table class="table table-striped table-inbox hidden" id="example-1">
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject - Snippet</th>
                  <th>Time</th>
                </tr>
              </thead>
                <tbody v-for="promoM in promoMs" :key="promoM.id">
                    <td>{{ promoM.conciseFrom }}</td>
               <!-- <td>{{ promoM. body}}</td> -->
                    <td>{{ promoM.subject }} - {{ promoM.snippet }}...</td>
                    <td>{{ promoM.time }}</td>

                </tbody>
            </table>
          </div>
          <div v-else>
            <p>"you don't have permission for this yet"</p>
          </div>
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
import base64 from 'base-64';

Vue.use(require('vue-moment'))
Vue.use(VueAxios, axios)

export default {
  name: 'InboxList',
  data () {
    return {
      messages: [],
      socialMs: [],
      promoMs: [],
      loadedMessage: false,
      conciseFrom: false,
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
          var isSocial = false;
          var isPromo = false;
          for (var i = 0; i < response.data.labelIds.length; i++) {
            let indexSpot = response.data.labelIds[i];
            if (indexSpot === "CATEGORY_SOCIAL") {
              isSocial = true;
            }
            if (indexSpot === "CATEGORY_PROMOTIONS") {
              isPromo = true;
            }
          }

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
          let id = response.data.id;
          var body = "";
          if (response.data.payload.parts === undefined) {
            body = atob(response.data.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
          }
          else {
            body = atob(response.data.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/'));
          }


          var conciseFrom = from.substr(0, from.indexOf('<'));
          if (conciseFrom === ""){
            conciseFrom = from;
          }

          if (!isSocial && !isPromo) {
            this.messages.push({from, conciseFrom, to, subject, snippet, body, time, id});
          }
          if (isSocial) {
            this.socialMs.push({from, conciseFrom, to, subject, snippet, body, time, id});
          }
          if (isPromo) {
            this.promoMs.push({from, conciseFrom, to, subject, snippet, body, time, id});
          }
          console.log(moment().calendar());
        }).catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>