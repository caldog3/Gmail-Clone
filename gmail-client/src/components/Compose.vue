/* eslint-disable */

<template>
  <div class="compose" v-if="active" @click.stop>
    <div class="headerSection">
      <a class="close" @click="close">×</a>
      <h2>New Message</h2>
    </div>
    <div class="section">
      <div v-if="activeSection != 'to'">
        <input class="full" v-model="message.to" placeholder="Recipients" @focus="focusOnSection('to')">
      </div>
      <div v-if="activeSection == 'to'">
        <div class="input">
          <span class="TO">
          <label for="message_to">To</label>
          </span>
          <span class="fit">
            <input v-model="message.to" class="full1" v-focus>
          </span>
        </div>
        <div class="input" v-if="ccActive">
          <label for="message_cc">Cc</label>
          <div class="fit">
            <input v-model="message.cc" class="full" v-focus>
          </div>
        </div>
        <div class="input" v-if="bccActive">
          <label for="message_bcc">Bcc</label>
          <div class="fit">
            <input v-model="message.bcc" class="full" v-focus>
          </div>
        </div>
        <div class="flexFrom">
          <div class="From">
            <label>From</label>
          </div>
          <div class="dropDown">
            <DropDown class="from-address">
            <span>{{ message.from | nameAndEmail }}</span>
            <Icon name="down" />
            <!-- This is commented out because we don't have the object accounts that he uses 
                <ul class="align-right">
              <li v-for="account in currentUser.accounts">
                <a @click="message.from = account">{{ account | nameAndEmail }}</a>
              </li>
            </ul> -->
          </DropDown>
          </div>
          <div class="right">
            <a class="bcc" @click="bccActive = true" v-if="!bccActive">Bcc</a>
            <a class="cc" @click="ccActive = true" v-if="!ccActive">Cc</a>
          </div>
        </div>
      </div>
    </div>
    <div class="section">
      <input class="full2" placeholder="Subject" @focus="focusOnSection('subject')">
    </div>
    <div class="sectionText">
      <textarea placeholder="Body" @focus="focusOnSection('body')"></textarea>
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
  /* padding: 3px; */
}
.flexFrom {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
}
.From {
  width: 50px;
}
.dropDown {
  width: 390px;
}
.headerSection {
  background: #404040;
  width: 100%;
}
h2 {
  color: white;
  font-size: 13px;
  padding: 8px;
  text-align: left;
  margin: 0px;
}
a:not([href]):not([tabindex]) {
  color: #b2b2b2;
  height: 100%;
}
.close {
  float: right;
  font: 16px/27px sans-serif;
  height: 100%;
  width: 28px;
  text-align: center;
}
.close:hover {
  color: #fff;
  background: #737373;
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
  /* position: fixed;
  bottom: 0; */
}
.sendButton {
  float: left;
  margin: 4px;
  /* background-color: blue; */
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

/* .header {
  background: #404040;
  border-color: #404040;
  height: auto;
} */
/* .close {
  float: right;
  color: #b2b2b2;
  font: 16px/27px sans-serif;
  height: 28px;
  width: 28px;
  margin-top: -6px;
  margin-right: -6px;
  text-align: center;
  text-decoration: none;
} */
/* .close:hover {
  color: #fff;
  background: #737373;
} */
/* h2 {
  font: inherit;
  color: #fff;
  margin: 0;
  float: left;
} */
/* .section {
  border: 1px solid #CFCFCF;
  border-bottom: none;
  padding: 10px;
}
label {
  float: left;
  width: 40px;
}
.input {
  width: 100%;
  overflow: hidden;
  padding-bottom: 8px;
}
.cc, .bcc {
  float: right;
  margin-left: 5px;
}
.fit {
  overflow: hidden;
}
.from-address {
  display: inline-block;
  color: #777;
}
.from-address:hover {
  color: #222;
}

.footer {
  overflow: hidden;
  background: #F5F5F5;
} */
</style>

<script>
import eventBus from '../event_bus.js'
import DropDown from './drop-down'
import Icon from './icon'



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
    send() {
      this.close()
      this.message = getInitialMessage()
      this.$store.dispatch('flash', 'Sending...')
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
