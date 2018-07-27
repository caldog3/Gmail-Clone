/* eslint-disable */
<template>
  <div id="body">
    <div class="flexboxSubject">
      <h4 class="leftAlign">{{messages[0].subject}}</h4>
      <h4 class="rightAlign"><font-awesome-icon style="text-align=right;" class="Icon" icon="print" /></h4>
    </div>

    <div v-for="message in messages" :key="message.messageId">
      <div class="flexboxSubject">
        <div class="leftAlign">
          <hr>
          <b>{{message.detailedFrom}}</b>
        </div>
        <div class="rightAlign shift-down">
          {{message.time}} ({{ timeAgo }})
          <span class="highlightArea">
            <input class="star" v-on:click="starredLabelToggle(message)" type="checkbox" :checked="message.starred" title="bookmark page">
          </span> 
          <font-awesome-icon class="Icon" icon="reply" />
          <font-awesome-icon class="Icon" icon="ellipsis-v" />
        </div>
      </div>
      <div class="leftAlign recipients">
        <p>to {{message.to}}</p>
      </div>
      <div v-html="message.body" class="leftAlign"></div>
      
      <div v-if="message.attachmentIds.length > 0">
        <!-- <div v-for="attachmentId in message.attachmentIds" :key="attachmentId.attachmentId"> -->
          <h4>You have {{message.attachmentIds.length}} attachment(s).</h4>
          <h5>Support for them is imminent</h5>
          <img img width="16" height="16" alt=" An Image should be here" src="'data:' + attachments[attachmentId.attachmentId].mimeType + ';base64,' +  attachments[attachmentId.attachmentId].data"/>
          <!-- {{attachments[attachmentId.attachmentId].mimeType}} -->
        <!-- </div> -->
      </div>
    </div>
    <div class="response-buttons"> 
      <button type="button"><font-awesome-icon class="Icon" icon="reply" /> Reply</button>
      &emsp;
      <span v-bind:class="ifGroupMessage()">
        <button type="button"><font-awesome-icon class="Icon" icon="reply-all" /> ReplyAll</button>
      &emsp;
      </span>
      <button type="button"><font-awesome-icon class="Icon" icon="long-arrow-alt-right" /> Forward</button>
    </div>
  </div>

</template>

<style scoped>

.shift-down {
  margin-top: 20px;
}
.recipients {
  font-size: .8em;
}
.leftAlign {
  text-align: left;
  margin-left: 2%;
}
.rightAlign {
  text-align: right;
}
.flexboxSubject {
  display:flex;
  justify-content: space-between;
}
.response-buttons {
  padding: 40px;
  text-align: left;
  margin-left: 2%;
  /* padding-bottom: 40px; */
}
h4 {
  padding-top: 15px;
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
.star {
  visibility: hidden;
  font-size: 20px;
  cursor: pointer;
  position: relative;
  left: 5px;
  top: 1px;
  width: 30px;
  height: 30px;
}
.star:before {
  content: "\2606";
  position: absolute;
  visibility:visible;
}
.star:checked:before {
  content: "\2605";
  position: absolute;
  color:gold;
}

</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { sortBy } from 'lodash'
import { markAsStarred, unMarkAsStarred } from './../store-utility-files/gmail-api-calls';


export default {
  name: 'EmailBody',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      timeAgo: "1 hour ago",
      messageUnix: 0,
    }
  },
  computed: {
    messages(){
      let messages = this.$store.state.threadMessages;
      const threadMessages = messages[this.$route.params.id];
        let object = sortBy(threadMessages, m => m.unixTime);
        let time = object[0].unixTime;
        this.messageUnix = time;
          var ts = Math.round((new Date()).getTime() / 1000);
          console.log("currentTime: " + ts);
          console.log("messageTime: " + time);
          var diff = Math.floor((ts - time)), units = [
            { d: 60, l: "seconds" },
            { d: 60, l: "minutes" },
            { d: 24, l: "hours" },
            { d: 7, l: "days" }
          ];
          var s = '';
          for (var i = 0; i < units.length; ++i) {
            s = (diff % units[i].d) + " " + units[i].l + " " + s;
            diff = Math.floor(diff / units[i].d);
          }
          this.timeAgo = s;
          console.log("this is the s: "+ s);
// This is all in this property because it overflows the stack if I call another function...

      return object;
    },
    attachments(){
     return this.$store.getters.getAttachments;
    },

  },
  methods: {
    starredLabelToggle(thread) {
      thread.starred = !thread.starred;
      if(thread.starred === true) {
        markAsStarred(thread.threadId);
      }
      else {
        unMarkAsStarred(thread.threadId);
      }

    },
    timeDifference(object) {
      let thisMessage = this.messages(object);
      console.log(thisMessage);
      var ts = Math.round((new Date()).getTime() / 1000);
      console.log("currentTime: " + ts);
      console.log("messageTime: " + messageTime);
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
    console.log(this.$store.state.labelNextPageTokens);
  }
}
</script>