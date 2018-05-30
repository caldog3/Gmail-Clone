/* eslint-disable */
<template>

  <div>
    <h1>Gmail Client</h1>
    <button @click="getMessages('google')">auth Google</button>
    
    <table class="table table-striped table-inbox hidden">
      <thead>
        <tr>
          <th>Sender</th>
          <th>Subject</th>
          <th>Snippet</th>
        </tr>
      </thead>
      <tbody v-for="message in messages" :key="message.id">
        <td> {{ message.from }}</td>
        <td> {{ message.subject }}</td>
        <td> {{ message.snippet }}</td>
      </tbody>
    </table>
    <!-- <ol id="example-1">
    <li v-for="message in messages" :key="message.id">
      <hr style="height:.3em;background-color:#333;">
      Sender: {{ message.from }} <b>|</b>
      Recipient: {{ message.to }} <b>|</b>
      Subject: {{ message.subject }}
      <hr>
      Snippet: {{ message.snippet }}
      <hr>
      Body (decoded!): {{ message.body }}
    </li>
  </ol> -->
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
  baseUrl: 'http://localhost:8081/',  
  providers: {
    google: {
      clientId: '237263439048-jvpivlg7udbejf58b808n9l865lgdv08.apps.googleusercontent.com',
      //api_key: 'AIzaSyCbyD3kOV71n_jh7-osWjQ87yXQ_hSPlmE',
      redirectUri: 'http://localhost:8081/',
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
            }
            let snippet = response.data.snippet;
            //////////////////
            var message = response.data.payload;
            var encodedBody = '';
            if(typeof message.parts === 'undefined')
            {
              encodedBody = message.body.data;
            }
            else
            {
              encodedBody = this. getHTMLPart(message.parts);
            }
            encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
            let body = decodeURIComponent(escape(window.atob(encodedBody)));
          
            //Parts[1] is text with all the styling and tags / not sure how to use that though since
               //it is all one string
            //Parts[0] is plain text
          //  let body = atob(response.data.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/'));
            this.messages.push({from, to, subject, snippet, body});
          } 
        }).catch((error) => {
          console.log(error);
        });
    },
    getHTMLPart(arr) {
      for(var x = 0; x <= arr.length; x++)
      {
        if(typeof arr[x].parts === 'undefined')
        {
          if(arr[x].mimeType === 'text/html')
          {
            return arr[x].body.data;
          }
        }
        else
        {
          return getHTMLPart(arr[x].parts);
        }
      }
      return '';
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
