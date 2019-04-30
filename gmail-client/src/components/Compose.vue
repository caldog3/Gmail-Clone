/* eslint-disable */

<template>
  <div class="compose" v-if="active" @click.stop>
    <div class="headerSection">
      <div class="head">
        <h2>New Message</h2>
      </div>
      <div class="alterCompose">
        <a class="close" @click="close">×</a>
      </div>
    </div>

    <div class="sectionTop">
      <div class="unselected">
        <input class="full" type="email" v-model="composeTo" placeholder="Recipients" @focus="focusOnSection('to')">
      </div>
    </div>

    <div class="section">
      <input class="full2" v-model="composeSubject" placeholder="Subject" id="composeSubject" @focus="focusOnSection('subject')">
    </div>

    <div @focus="focusOnSection('body')">
      <quill-editor v-model="composeMessage"/>
    </div>
    
    <div class="footerSection">
      <div class="sendButton">
        <input type="submit" class="SendButton1" value="Send" @click="sendCompose">
      </div>
    </div>  
  </div>
</template>

<script>
import { sendMessage } from './../store-utility-files/gmail-api-calls';
import QuillEditor from './QuillEditor';
import eventBus from '../event_bus.js';
import Icon from './icon';
import { setupEmailBody } from '../store-utility-files/email';
//Devon Firebase testing:
import { fireRetrieveMessages, testTwoFirebase } from '../firebase/firebase';
//end of test

export default {
  name: 'Compose',
  components: {
    Icon,
    QuillEditor
  },
  data() {
    return {
      composeTo: '',
      composeSubject: '',
      composeMessage: '',
        
      currentUser: window.currentUser,
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
      //Devon Firebase testing:
      //fireRetrieveMessages('how.d.65@gmail.com')
      testTwoFirebase();
      //end of test
      this.active = false
      // this.composeTidy();
    },
    sendCompose() {

      console.log("TO access test:", this.composeTo);
      var sender = this.$store.state.currentUser.w3.U3;

      const {headers, body} = setupEmailBody(this.composeSubject, this.composeTo, this.composeMessage, sender);
      console.log("SEND COMPOSE: hope this works ", headers);
      console.log("BODY before Base64: ", body);
      //function to decode it
      sendMessage(headers, body);
      this.close();
      //Tidy needs to wait for this to finish
      // this.composeTidy();
    },
    composeTidy() {
      this.composeTo = '';
      this.composeSubject = '';
      this.composeMessage = '';
    },
    focusOnSection(section) {
      this.activeSection = section;
      // this.ccActive = this.message.cc !== '';
      // this.bccActive = this.message.bcc !== '';
    },
    draftSetup() {  // do we need to pass in the recipient and message data or set it in the store or what?
      this.composeMessage = "THIS IS A TEST";
    },
  },
  created() {
    eventBus.$on('BODY_CLICK', this.close)
    eventBus.$on('KEYUP_ESCAPE', this.close)
    eventBus.$on('COMPOSE_OPEN', this.open);
    eventBus.$on('ENTER_DRAFT', this.draftSetup);
  }
}
</script>

<style scoped>
.compose {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  right: 10px;
  width: 510px;
  display: flex;
  /* height: 500px; */
  flex-direction: column;
  align-content: stretch;
  align-items: center;
  margin-right: 20px;
  z-index: 999;
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
  height: 35px;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  padding: 4px;
  width: 100%;
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
.sectionTop {
  width: 100%;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  height: 35px;
}
.section {
  width: 100%;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  height: 35px;
}
.sectionText {
  width: 100%;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  flex-grow: 1;
  flex-basis: 0;
  min-height: 290px;
}
.TO {
  width: 15px;
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
  min-height: 285px;
  resize: none;
}
.textSpace {
  width: 100%;
  border: none;
  outline: none;
  height: 100%;
  min-height: 285px;
  resize: none;
}
.footerSection {
  overflow: hidden;
  width: 510px;
  margin: 4px;
  height: 55px;
}
.sendButton {
  float: right;
  margin: 4px;
  color: white;
  padding: 3px;
}
.SendButton1 {
  background-color: #297be6;
  border-radius: 5px;
  color: white;
  border: none;
  outline: none;
  width: 4.5em;
  height: 2.2em;

}
</style>