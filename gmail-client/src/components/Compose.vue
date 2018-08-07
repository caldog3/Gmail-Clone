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
      <!-- <div class="selected">
        <input class="full" type="email" v-model="composeTo" placeholder="To" @focus="focusOnSection('to')">
      </div> -->
    </div>
    <div class="section">
      <input class="full2" v-model="composeSubject" placeholder="Subject" id="composeSubject" @focus="focusOnSection('subject')">
    </div>
    <div class="sectionText">
      <textarea v-model="composeMessage" placeholder="" id="composeMessage" @focus="focusOnSection('body')"></textarea>
      <!-- <div class="textSpace" contenteditable="true" v-model="composeMessage" placeholder="" id="composeMessage" @focus="focusOnSection('body')"> </div> -->

    </div>
    <div class="footerSection">
      <div class="sendButton">
        <input type="submit" class="SendButton1" value="Send" @click="send">
      </div>
      <div class="sendButton">
        <input type="submit" class="SendButton2" value="Send Private" @click="send">
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
  /* height: 500px; */
  flex-direction: column;
  align-content: stretch;
  align-items: center;
  margin-right: 20px;
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
  /* for now */
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
  padding: 4px;
  height: 55px;
}
.sendButton {
  float: left;
  margin: 4px;
  color: white;
  padding: 3px;
}
.SendButton1 {
  background-color: #4285F4;
  border-radius: 5px;
  color: white;
  border: none;
  outline: none;
  width: 80px;
  height: 2.2em;
}
.SendButton2 {
  background-color: grey;
  border-radius: 5px;
  color: white;
  border: none;
  outline: none;
  width: 110px;
  height: 2.2em;
}
</style>

<script>
import { sendMessage } from './../store-utility-files/gmail-api-calls';
import eventBus from '../event_bus.js';
import Icon from './icon';

export default {
  name: 'Compose',
  components: {
    Icon
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
      this.active = false
    },
    send() {
      this.close();
      let headerSection = {
        'To': this.composeTo,
        'Subject': this.composeSubject
      }
      sendMessage(headerSection, this.composeMessage);
      this.composeTidy();
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
    }
  },
  created() {
    eventBus.$on('BODY_CLICK', this.close)
    eventBus.$on('KEYUP_ESCAPE', this.close)
    eventBus.$on('COMPOSE_OPEN', this.open);
  }
}
</script>
