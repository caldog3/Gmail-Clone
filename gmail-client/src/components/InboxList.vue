
/* eslint-disable */
<template>
  <div>
    <b-tabs>
        <b-tab title="Primary">
            <div v-if="loadedMessage">
                <table class="table table-striped table-inbox hidden" id="example-1">
                  <thead>
                    <tr>
                      <th class="OneTH">Sender</th>
                      <th class="TwoTH">Subject - Snippet</th>
                      <th class="ThreeTH">Time</th>
                    </tr>
                  </thead>
                    <tbody v-for="message in messages" :key="message.id">
                        <td class="One"><b><span class="leftAlign">{{ message.conciseFrom }}</span></b></td>
                   <!-- <td>{{ message. body}}</td> -->
                        <td class="Two"><span class="leftAlign"><b>{{ message.subject }} </b>- <i><span v-html="message.snippet"></span></i></span>...</td>
                        <td class="Three"><span class="rightAlign">{{ message.time }}</span></td>

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
                    <th class="OneTH">Sender</th>
                    <th class="TwoTH">Subject - Snippet</th>
                    <th class="ThreeTH">Time</th>
                  </tr>
                </thead>
                  <tbody v-for="socialM in socialMs" :key="socialM.id">
                      <td class="One"><b><span class="leftAlign">{{ socialM.conciseFrom }}</span></b></td>
                 <!-- <td>{{ socialM. body}}</td> -->
                      <td class="Two"><span class="leftAlign"><b>{{ socialM.subject }}</b> - <i><span v-html="socialM.snippet"></span></i></span>...</td>
                      <td class="Three"><span class="rightAlign">{{ socialM.time }}</span></td>

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
                  <th class="OneTH">Sender</th>
                  <th class="TwoTH">Subject - Snippet</th>
                  <th class="ThreeTH">Time</th>
                </tr>
              </thead>
                <tbody v-for="promoM in promoMs" :key="promoM.id">
                    <td class="One"><b><span class="leftAlign">{{ promoM.conciseFrom }}</span></b></td>
               <!-- <td>{{ promoM. body}}</td> -->
                    <td class="Two"><span class="leftAlign"><b>{{ promoM.subject }}</b> - <i><span v-html="promoM.snippet"></span></i></span>...</td>
                    <td class="Three"><span class="rightAlign">{{ promoM.time }}</span></td>

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
table {
  width: 100%;
  overflow: hidden;
  table-layout: fixed;
}

td { 
  overflow:hidden;
  white-space:nowrap;  
} 

.One {
  width: 15%;
  min-width: 15%;
  max-width: 15%;
}

.OneTH {
  width: 15%;
  min-width: 15%;
  max-width: 15%;
}

.Two {
  width: 79%;
  min-width: 79%;
  max-width: 79%;
  overflow: hidden;
}

.TwoTH {
  width: 79%;
  min-width: 79%;
  max-width: 79%;
}

.Three {
  width: 10%;
  min-width: 10%;
  max-width: 10%;
}

.ThreeTH {
  width: 10%;
  min-width: 10%;
  max-width: 10%;
}

.leftAlign {
  float: left;
}
.rightAlign {
  float: right;
}

tbody {
  line-height: 5px;
}

@media screen and (max-width : 858px) {

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .One {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
  }

  .Two {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    overflow: hidden; 
  }

  .Three {
    width: 100%;
    min-width: 100%;
    max-width: 100%;    
  }
}

</style>

<script>
import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
import base64 from 'base-64';
import moment from 'moment';

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
  computed: {
    token() {
      return this.$store.getters.getToken;
    }
  },
  methods: {
    getListOfMessages(){
      //console.log("AAA");
     // console.log(this.token);
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
          console.log(response.data.labelIds);
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
          }
          var unix = moment.unix(response.data.internalDate/1000);
          var currentUnix = moment().unix();
          currentUnix = moment.unix(currentUnix);
          var time = "";
          console.log(unix);
          console.log(currentUnix);
          if (currentUnix.format("MMM D") === unix.format("MMM D")) {
            time = unix.format("h:mm a");
          }
          else if (currentUnix.format("YYYY") === unix.format("YYYY")) {
            time = unix.format("MMM D");
          }
          else {
            time = unix.format("DD/MM/YY");
          }

          //response.data.internalDate gives UNIX time (we should use that instead of the header maybe)
          let snippet = response.data.snippet;
          let id = response.data.id;
          var body = "";
          if (response.data.payload.parts === undefined) {
            body = atob(response.data.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
          }
          else {
            body = atob(response.data.payload.parts[1].body.data.replace(/-/g, '+').replace(/_/g, '/'));
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
          let testTime = response.data.internalDate;
        //  console.log(moment().calendar());
        }).catch((error) => {
          console.log(error);
        });
    }
  }
}
</script>