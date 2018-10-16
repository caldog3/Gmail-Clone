/* eslint-disable */
<template>
  <div id="body" v-if="messages[0] !== undefined">
    <div class="flexboxSubject">
      <h5 class="leftAlign">{{messages[0].subject}}</h5>
      <h5 class="rightAlign"><font-awesome-icon style="text-align=right;" class="Icon" icon="print" /></h5>
    </div>

    <div v-for="message in messages" :key="message.messageId">
        <!-- This is for collapsing emails to not take up so much space -->
      <message-body :message="message"/>
    </div>

    <div class="response-buttons"> 
      <button type="button" v-on:click="reply"><font-awesome-icon class="Icon" icon="reply" /> Reply</button>
      &emsp;
      <span v-bind:class="ifGroupMessage()">
        <button type="button"><font-awesome-icon class="Icon" icon="reply-all" /> ReplyAll</button>
      &emsp;
      </span>
      <button type="button"><font-awesome-icon class="Icon" icon="long-arrow-alt-right" /> Forward</button>
    </div>
  </div>
</template>

<script>
import { trashMessage } from './../store-utility-files/gmail-api-calls';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import MessageBody from "./MessageBody";
import eventBus from '../event_bus';
import { sortBy } from 'lodash';

export default {
  name: 'ThreadBody',
  components: {
    FontAwesomeIcon,
    MessageBody
  },
  data() {
    return {
      composeMessage: "Just a message for filler until the rich text editor works",
    };
  },
  methods: {
    reply() {
      console.log("in the reply"); 
      //testing this out
      let headerSection = {
        'Content-Type': 'text/plain; charset="\UTF-8\"',
        'MIME-Version': '1.0',
        'Content-Transfer-Encoding': '7bit',
        'Subject': this.subject, //need a subject variable
        'From': this.sender,
        'To': this.composeTo,
        'Subject': this.composeSubject
      }
      sendMessage(headerSection, this.responseBody);
    },
    getMessages(){
      let messages = this.$store.state.threadMessages;
      const threadMessages = messages[this.$route.params.id];
        let object = sortBy(threadMessages, m => m.unixTime);
        let time = object[0].unixTime;

          var ts = Math.round((new Date()).getTime() / 1000);
          var diff = Math.floor((ts - time)), units = [
            { d: 60, l: "seconds" },
            { d: 60, l: "minutes" },
            { d: 24, l: "hours" },
            { d: 7, l: "days" }
          ];
          var s = '';
          var times = [];
          for (var i = 0; i < units.length; ++i) {
            times[i] = (diff % units[i].d);
            diff = Math.floor(diff / units[i].d);
          }
          if (times[3] === 0) {
            if (times[2] === 0) {
              if (times[1] != 1) { s = times[1] + " minutes"}
              else { s = times[1] + " minute"}
            }
            else {
              if (times[2] != 1) {s = times[2] + " hours"}
              else { s = times[2] + " hour"}
            }
          }
          else {
            if (times[3] != 1) {s = times[3] + " days"}
            else {s = times[3] + " day"}
          }
          // eslint-disable-next-line
          this.timeAgo = s.slice();
// This is all in this property because it overflows the stack if I call another function...
      this.messages = object;
    },
    trash() {
      let thisThreadid = this.messages[0].threadId;
      trashMessage(thisThreadid);
      eventBus.$emit('MESSAGE_LIST');
      this.$router.go(-1);
    },
    ifGroupMessage() {
      let to = this.messages[0].to;
      //console.log(to);
      var theClass = 'not-group-message';
      //console.log(message.unread);
      if(to.includes(",")){
          theClass = 'group-message';
      }
      return theClass;
    },
  },
  created() {
    this.getMessages();
    eventBus.$on("TRASHING_THREAD", this.trash);
  }
}
</script>

<style scoped>
button {
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 10px 25px 5px 25px;
  outline: none;
}
button:hover {
  background-color: #F2F2F2;
}

.leftAlign {
  text-align: left;
  margin-left: 2%;
}
.rightAlign {
  text-align: right;
  margin-right: 10px;
}
.flexboxSubject {
  display:flex;
  justify-content: space-between;
}
.response-buttons {
  padding: 40px 0px;
  text-align: left;
  margin-left: 2%;
  /* padding-bottom: 40px; */
}
.group-message {
  display: inline;
}
.not-group-message {
  display: none;
}
#body {
  background-color: white !important;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 1%;
}
</style>