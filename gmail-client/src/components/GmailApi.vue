/* eslint-disable */
<template>
  <div>
    <div class="mainContainer">
      <button @click="getMessages('google')">auth Google</button>
      <!-- <table class ="table table-striped table-inbox hidden">
        <thead>
          <tr>
            <th>Folders</th>
          </tr>
        </thead>
        <tbody v-for="label in labels" id="labelColumn"
              :key="label">

          <td> <hr>{{ label.name}} </td>
        </tbody>
      </table> -->
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
          <td> {{ message.snippet }}....</td>
        <!--   <td> {{ message.body }} </td> -->
        </tbody>
      </table>
    </div>
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

<style scoped>
.mainContainer{
  /* display: flex; */
  margin-top: 40px;
}
#labelColumn{
  
}
.fixedBar {
  /* position: fixed; */
  width: 100%;
  /* margin-top: 100px; */
}
</style>


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
      messages: [],
      labels: [],
      validated: false,
    }
  },
  methods: {
    getMessages(provider){
      if(!this.validated){
        this.authenticate(provider);
      }
      this.listLabels();
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
            // var message = response.data.payload;
            // var encodedBody = '';
            // if(typeof message.parts === 'undefined')
            // {
            //   encodedBody = message.body.data;
            // }
            // else
            // {
            //   encodedBody = this.getHTMLPart(message.parts);
            // }
            // encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
            // let body = decodeURIComponent(escape(window.atob(encodedBody)));
          
            //Parts[1] is text with all the styling and tags / not sure how to use that though since
               //it is all one string
            //Parts[0] is plain text
            let body = atob(response.data.payload.parts[0].body.data.replace(/-/g, '+').replace(/_/g, '/'));
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
    listLabels() {
      axios.get(`https://www.googleapis.com/gmail/v1/users/me/labels`, 
      { 
        headers: { 
          Authorization: `Bearer ${this.token}`
        }
      }).then((response) => {
        console.log("Labels response");
        console.log(response);
        var labels = response.data.labels;

        if (labels && labels.length > 0) {
          console.log(response.result);
          for (var i = 0; i < labels.length; i++) {
            var label = labels[i];

            console.log(label);
            let name = label.name
            this.labels.push({name});
          }
        } else {
          console.log('No Labels found.');
        }
      });
    },
    authenticate(provider){
      this.$auth.authenticate(provider)
      .then((result) => {
        this.token = result.access_token;
        this.validated = true;
      })
    },
  }
}
</script>