/* eslint-disable */
<template>
  <div id="body" v-if="messages[0] !== undefined">
    <div class="flexboxSubject">
      <h5 class="leftAlign">{{messages[0].subject}}</h5>
      <h5 class="rightAlign"><font-awesome-icon style="text-align=right;" class="Icon" icon="print" /></h5>
    </div>

    <div v-for="message in messages" :key="message.messageId">
      <message-body :message="message"/>
    </div>
    <!-- This is the quill response body -->
    <div class="quill" @focus="focusOnSection('body')" v-if="replying">
      <quill-editor v-model="responseHTML"/>
      <div class="quill-spacing">
        <button class="sendBar" type="button" v-on:click="replySend">
          <font-awesome-icon class="Icon" icon="reply" /> Send
        </button>
      </div>
    </div>
    <!-- we need a send button that triggers "reply()" -->
    <!-- End of the quill -->

    <div class="response-buttons" v-if="!replying"> 
      <button type="button" v-on:click="toggleReply"><font-awesome-icon class="Icon" icon="reply" /> Reply</button>
      &emsp;
      <span v-bind:class="ifGroupMessage()">
        <button type="button" v-on:click="replyAll"><font-awesome-icon class="Icon" icon="reply-all" /> ReplyAll</button>
      &emsp;
      </span>
      <button type="button" v-on:click="forward"><font-awesome-icon class="Icon" icon="long-arrow-alt-right" /> Forward</button>
    </div>
  </div>
</template>

<script>
import { trashMessage, sendReply, forwardMessage, sendForward } from './../store-utility-files/gmail-api-calls';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import MessageBody from "./MessageBody";
import QuillEditor from './QuillEditor';
import eventBus from '../event_bus';
import { sortBy } from 'lodash';
import { setupEmailBody } from '../store-utility-files/email';


export default {
  name: 'ThreadBody',
  components: {
    FontAwesomeIcon,
    MessageBody,
    QuillEditor,
  },
  data() {
    return {
      responsePlain: 'Test value 3 plain',
      responseHTML: '',
      responseBody: "",
      forwardingBody: "",
      subject: '',
      sender: '',
      recipient: '',
      multipartBoundary: '',
      allReplyRecipients: '',
      finalMessageBody: '',
      replying: false,
    };
  },
  methods: {
    toggleReply() {
      this.replying = true;
    },
    replySend() {
      //we'll link these two up soon
      console.log("You clicked the send button");

      const {headers, body} = setupEmailBody("Re: " + this.subject, this.recipient, this.responseHTML, this.sender);
      console.log("HEaders: ", headers);
      console.log("Body: ", body);
      let threadID = this.messages[0].threadId;
      sendReply(headers, body, threadID);
    },
    reply() {
      console.log("in the reply"); 
      //testing this out
      this.multipartBoundary = this.generateBoundary();
      let headerSection = {
        'MIME-Version': '1.0',
        'Subject': 'Re: ' + this.subject,
        'From': this.sender,
        'To': this.recipient,
        'Content-Type': 'multipart/alternative;' + 'boundary=' + this.multipartBoundary,
      }
      this.setResponseBody();
      console.log("Subject is:", this.subject);
      console.log("Sender is:", this.sender);
      console.log("Recipient is:", this.recipient);
      let id = this.messages[0].threadId;
      console.log("right before send call");
      sendReply(headerSection, this.responseBody, id);
    },
    setResponseBody() {
      //got to set up mime boundaries
      var body = "";
      body += '--' + this.multipartBoundary + '\n';
      //plain text
      body += 'Content-Type: text/plain; charset="UTF-8"\n\n';
      body += this.responsePlain + '\n';
      body += '--' + this.multipartBoundary + '\n';
      //html text
      body += 'Content-Type: text/html; charset="UTF-8"\n';
      body += 'Content-Transfer-Encoding: quoted-printable\n\n';
      body += this.responseHTML + '\n\n';

      body += '--' + this.multipartBoundary + '--';

      this.responseBody = body;
      console.log("responseBody:\n", this.responseBody);
    },
    generateBoundary() {
      //12 0's and then 16 digit random...
      var boundChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var boundLength = 16;
      var randBoundary = "000000000000";
      randBoundary += Array(boundLength).fill(boundChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

      // console.log("gererated boundary:", randBoundary);
      this.multipartBoundary = randBoundary;
      return randBoundary;
    },
    replyAll() {
      console.log("in the replyAll");
      this.multipartBoundary = this.generateBoundary();
      let headerSection = {
        'MIME-Version': '1.0',
        // 'Content-Transfer-Encoding': '7bit',
        'Subject': 'Re: ' + this.subject,
        'From': this.sender,
        'To': this.allReplyRecipients,
        'Content-Type': 'multipart/alternative;' + 'boundary=' + this.multipartBoundary,
      }
      this.setResponseBody();
      let id = this.messages[0].threadId;
      sendReply(headerSection, this.responseBody, id);
    },
    forward() {
      console.log("forwarding...")
      //we will need to use a v-model link here to set this recipient
      let forwardRecipient = "caldogwoods@gmail.com";
      // forwardMessage(forwardRecipient, this.finalMessageBody);
      this.multipartBoundary = this.generateBoundary();
      let headerSection = {
        'MIME-Version': '1.0',
        'Subject': 'Fwd: ' + this.subject,
        'From': this.sender,
        'To': this.forwardRecipient,
        'Content-Type': 'multipart/alternative;' + 'boundary=' + this.multipartBoundary,
      }
      this.setForwardingBody();
      let id = this.messages[0];
      sendForward(headerSection, this.forwardingBody, id);

    },
    setForwardingBody() {
      // const body1 = `--${this.multipartBoundary}\n`;
      var body = "";
      body += '--' + this.multipartBoundary + '\n';
      body += 'Content-Type: text/html; charset="UTF-8"\n';
      body += 'Content-Transfer-Encoding: quoted-printable\n\n';
      body += this.finalMessageBody + '\n\n';
      body += '--' + this.multipartBoundary + '--';
      this.forwardingBody = body;
      console.log("forwardingBody:\n", this.forwardingBody);
    },
    getMessages() {
      let messages = this.$store.state.threadMessages;
      const threadMessages = messages[this.$route.params.id];
      this.messages = sortBy(threadMessages, m => m.unixTime);
      this.subject = this.messages[this.messages.length -1].subject;
      this.recipient = this.messages[this.messages.length -1].detailedFrom;
      //this to doesn't work with group messages, includes other people
      //we need to create more parts of the object for these values ^^ vv
      this.sender = this.messages[this.messages.length -1].to;
      let allPeopleArray = this.messages[0].allParticipants;
      let userInstance = false;
      var replyAllPeople = "";
      // console.log("allPeopleArray: ", this.messages);
      for (let i = 0; i < allPeopleArray.length; i++) {
        if (allPeopleArray[i].includes(this.$store.state.currentUserProfile.U3) && !userInstance) {
          userInstance = true;
          continue;
        }
        replyAllPeople += allPeopleArray[i];
        if (allPeopleArray.length-1 == i) {
          replyAllPeople += ", ";
        }
      }
      this.allReplyRecipients = replyAllPeople;
      console.log("lastMessageInThread", this.messages[this.messages.length -1]);
      this.finalMessageBody = this.messages[this.messages.length -1].body;
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
.quill {
  align-content: center;
  padding-left: -10px;
}
.quill-spacing {
  padding-bottom: 20px;
}
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
.sendBar {
  text-align: left;
  align-content: left;
  cursor: pointer;
}
</style>