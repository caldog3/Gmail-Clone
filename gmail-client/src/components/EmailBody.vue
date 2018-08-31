/* eslint-disable */
<template>
  <div id="body">
    <div class="flexboxSubject">
      <h5 class="leftAlign">{{messages[0].subject}}</h5>
      <h5 class="rightAlign"><font-awesome-icon style="text-align=right;" class="Icon" icon="print" /></h5>
    </div>

    <div v-for="message in messages" :key="message.messageId">
      <div class="flexboxSubject">
        <div class="leftAlign">
          <hr>
          <b>{{message.detailedFrom}}</b>
        </div>
        <div class="rightAlign shift-down">
          <div class="flexRight">
              <div>
                {{message.time}} ({{ timeAgo }} ago)
              </div>
              <div class="starBound">
                <div class="theRestoftheTime">
                  <span class="highlightArea">
                    <input class="star" v-on:click="starredLabelToggle(message)" type="checkbox" :checked="message.starred" title="bookmark page">
                  </span> 
                </div>
                <div class="firefoxOnly">
                  <input id="ffstar"  type="checkbox" v-on:click="starredLabelToggle(message)" :checked="message.starred" title="bookmark page">
                  <label for="ffstar" class="notchecked">&#X2606;</label>
                  <label for="ffstar" style="color:gold" class="checked">&#X2605;</label>
                </div>
              </div>
              <div>
                <font-awesome-icon class="Icon" icon="reply" />
              </div>
              <div>
                <font-awesome-icon class="Icon" icon="ellipsis-v" />
              </div>
          </div>
        </div>
      </div>

      <div class="leftAlign recipients">
        <p>to {{message.to}}</p>
      </div>
      
      <div v-html="message.body" class="leftAlign"></div>
      
      <div v-if="message.attachmentIds.length > 0">
        <div v-for="attachmentId in message.attachmentIds" :key="attachmentId.attachmentId">
          <div class="attachment-container">
            <div class="attachment">
              <a href="#openModal">
                <object :data="`data:${attachments[attachmentId.attachmentId].mimeType};base64,${attachments[attachmentId.attachmentId].data}`"/>
              </a>
              <div id="openModal" class="modalDialog">
                <a href="#close" title="Close" class="close">X</a>
                <object :data="`data:${attachments[attachmentId.attachmentId].mimeType};base64,${attachments[attachmentId.attachmentId].data}`"/>
              </div>
            </div>
          </div>
        </div>
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
.starBound {
  width: 30px;
  height: 30px;
  overflow: hidden;
  position: relative;
  top: -6px;
}
.firefoxOnly label {
  margin-right: 4px;
  font-size: 22px;
}
#ffstar {
  display:none;
}
.checked {
  display:none
}
.notchecked {
  display:inline-block;
}
#ffstar:checked ~ .checked {
  display:inline-block;
}
#ffstar:checked ~ .notchecked {
  display:none;
}
.highlightArea label {
  width: 30px;
  height: 30px;
  
}

.flexRight {
  display: flex;
  flex-direction: row;
  width: 250px;
  justify-content: space-between;
  font-size: small;
}
.shift-down {
  margin-top: 31px;
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
  /* top: -6px; */
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
.attachment-container {
  height: 120px;
  width: 180px;
}
.attachment {
  overflow: hidden;
  border-style: solid;
  border-width: 5px;
  /* margin: auto; position: relative;  */
  max-width: 100%; max-height: 100%;
}
.modalDialog {
	position: fixed;
	font-family: Arial, Helvetica, sans-serif;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0,0,0,0.8);
	z-index: 99999;
	opacity:0;
	-webkit-transition: opacity 400ms ease-in;
	-moz-transition: opacity 400ms ease-in;
	transition: opacity 400ms ease-in;
	pointer-events: none;
}
.modalDialog:target {
	opacity:1;
	pointer-events: auto;
}

.modalDialog > div {
	width: 400px;
	position: relative;
	margin: 10% auto;
	padding: 5px 20px 13px 20px;
	border-radius: 10px;
	background: #fff;
	background: -moz-linear-gradient(#fff, #999);
	background: -webkit-linear-gradient(#fff, #999);
	background: -o-linear-gradient(#fff, #999);
}
.close {
	background: #606061;
	color: #FFFFFF;
	line-height: 25px;
	position: absolute;
	right: -12px;
	text-align: center;
	top: -10px;
	width: 24px;
	text-decoration: none;
	font-weight: bold;
	-webkit-border-radius: 12px;
	-moz-border-radius: 12px;
	border-radius: 12px;
	-moz-box-shadow: 1px 1px 3px #000;
	-webkit-box-shadow: 1px 1px 3px #000;
	box-shadow: 1px 1px 3px #000;
}

.close:hover { background: #00d9ff; }

@-moz-document url-prefix() {
  .theRestoftheTime {
    display: none;
  }
}

</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { sortBy } from 'lodash'
import eventBus from '../event_bus';
import { trashMessage, markAsStarred, unMarkAsStarred } from './../store-utility-files/gmail-api-calls';


export default {
  name: 'EmailBody',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      timeAgo: "1 hour",
      messageUnix: 0,
    }
  },
  computed: {
    messages(){
      let messages = this.$store.state.threadMessages;
      const threadMessages = messages[this.$route.params.id];
        let object = sortBy(threadMessages, m => m.unixTime);
        let time = object[0].unixTime;
        // this.messageUnix = time;
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
              s = times[1] + " minutes";
            }
            else {s = times[2] + " hours"}
          }
          else {s = times[3] + " days"}
          // eslint-disable-next-line
          this.timeAgo = s.slice();
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
    console.log(this.$store.state.labelNextPageTokens);
    eventBus.$on("TRASHING_THREAD", this.trash);
  }
}
</script>