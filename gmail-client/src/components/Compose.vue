/* eslint-disable */

<template>
  <div class="compose" v-if="active" @click.stop>
    <div class="headerSection">
      <div class="head">
        <h2>New Message</h2>
      </div>
      <!-- <div class="alterCompose">
        <a class="close" @click="minimize">_</a>
      </div>
      <div class="alterCompose">
        <a class="close" @click="fullScreen">/</a>
      </div> -->
      <div class="alterCompose">
        <a class="close" @click="close">×</a>
      </div>
    </div>
    <div class="section">
      <div>
        <input class="full" type="email" v-model="composeTo"  placeholder="Recipients" @focus="focusOnSection('to')">
      </div>
    </div>
    <div class="section">
      <input class="full2" placeholder="Subject" id="composeSubject" @focus="focusOnSection('subject')">
    </div>
    <div class="sectionText">
      <textarea placeholder="Body" id="composeMessage" @focus="focusOnSection('body')"></textarea>
    </div>
    <div class="footerSection">
      <div class="sendButton">
        <input type="submit" class="SendButton1" value="Send" @click="send">
      </div>
    </div>
  </div>
</template>

<style scoped>
.compose {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  right: 10px;
  width: 510px;
  display: flex;
  height: 400px;
  flex-direction: column;
  align-content: stretch;
  align-items: center;
}
.flexFrom {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
}
.head {
  width: 470px;
}
.headerSection {
  background: #404040;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  padding: 4px;
}
h2 {
  color: white;
  font-size: 15px;
  padding: 8px;
  text-align: left;
  margin: 0px;
  font-weight: bold;
}
a:not([href]):not([tabindex]) {
  color: #b2b2b2;
  height: 100%;
}
.alterCompose {
  margin-right: auto;
  font: 16px/27px sans-serif;
  height: 100%;
  margin-left: 5px;
  margin-right: 4px;
}
.section {
  width: 100%;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
}
.sectionText {
  width: 100%;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  flex-grow: 1;
  flex-basis: 0;
}
.TO {
  width: 15px;
}
.full1 {
  width: 460px;
  border: none;
  outline: none;
  overflow: hidden;
}
.full2 {
  width: 100%;
  border: none;
  outline: none;
  overflow: hidden;
}
.full {
  width: 100%;
  border: none;
  outline: none;
  overflow: hidden;
}
textarea {
  width: 100%;
  border: none;
  outline: none;
  height: 100%;
}
.footerSection {
  overflow: hidden;
  width: 510px;
  padding: 4px;
}
.sendButton {
  float: left;
  margin: 4px;
  color: white;
  padding: 3px;
}
.SendButton1 {
  background-color: blue;
  border-radius: 3px;
  color: white;
  border: none;
  outline: none;
}
</style>

<script>
import eventBus from '../event_bus.js'
import DropDown from './drop-down'
import Icon from './icon'
//Temporarily here until the method is moved to the store
import axios from 'axios';
import { getAuthHeader } from './../store-utility-files/email'


const getInitialMessage = () => ({
  to: '',
  cc: '',
  bcc: '',
  body: '',
  from: window.currentUser
})

export default {
  name: 'Compose',
  components: {
    DropDown,
    Icon
  },
  data() {
    return {
      composeTo: '',
      composeSubject: '',
      composeMessage: '',
        
      currentUser: window.currentUser,
      message: getInitialMessage(),
      active: false,
      activeSection: 'to',
      ccActive: false,
      bccActive: false
    }
  },
  methods: {
      
    open() {
      this.active = true
    },
    close() {
      this.active = false
    },
    minimize() {
// here we'll minimize this somehow....
    },
    fullScreen() {
// here we'll full screen this somehow...
    },
    sendMessage(headers_obj, message, callback) {
        var email = '';
        for(var header in headers_obj) {
            email += header += ": "+headers_obj[header]+"\r\n";
        }
        email += "\r\n" + message;
        //this.$store.sendMessage(email)
        //This is where I need a url instead of a gapi message
        let url = "https://www.googleapis.com/gmail/v1/users/me/messages/send";
        
        console.log(window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_'));
        var sendRequest = axios.post(url, {
            'userid': 'me',
            'resource': {
                'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
            }}, getAuthHeader())
        .then(response => {
        return sendRequest.execute(callback);
        });
    },
    send() {
      this.close()
      this.sendMessage(
          {
            'To': this.composeTo,
            'Subject': this.composeSubject
          },
          this.composeMessage,
          this.composeTidy
      );
      return false;
    },
    composeTidy() {
        this.composeTo = '';
        this.composeSubject = '';
        // $('#send-button').removeClass('disabled');
    },


    focusOnSection(section) {
      this.activeSection = section
      this.ccActive = this.message.cc !== ''
      this.bccActive = this.message.bcc !== ''
    }
  },
  created() {
    eventBus.$on('BODY_CLICK', this.close)
    eventBus.$on('KEYUP_ESCAPE', this.close)
    eventBus.$on('COMPOSE_OPEN', this.open);
  }
}
</script>
