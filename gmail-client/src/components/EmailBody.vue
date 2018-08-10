/* eslint-disable */
<template>
  <div class="flexIt">
    <div class="hide">
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
              {{message.time}} ({{ timeAgo }} ago)
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
    </div>

    <div class="privateMess">
      <div class="allMess">

        <div class="line">
          <div class="themA">
            <div class="them1">
              We need to leverage our synergies customer centric.
            </div> 
            
            <div class="themTime">
              <div>Sun, 12:34</div>
              <div>expires in 7 days</div>
            </div>
          </div>
        </div>

        <div class="line">
          <div class="meB">
            <div class="me2">
              API conformance is highly measurable and suppliers who claim it must be included with each copy of this License.
            </div> 
            
            <div class="meTime">
              <div>Mon, 4:03</div>
              <div>expires in 8 days</div>
            </div>
          </div>
        </div>
       
        <div class="line">
          <div class="themC">
            <div class="them3">
              Core competencies let's unpack that later, we need a recap by eod, 
              cob or whatever comes first. Please advise soonest bells and whistles critical mass run it up the flagpole. 
            </div> 
            
            <div class="themTime">
              <div>Mon, 9:54</div>
              <div>expires in 8 days</div>
            </div>
          </div>
        </div>

        <div class="line">
          <div class="meD">
            <div class="me4">
              This proposal is a win-win 
              situation which will cause a stellar paradigm shift, and produce a multi-fold increase in deliverables.
            </div> 
            
            <div class="meTime">
              <div>Mon, 4:03</div>
              <div>expires in 8 days</div>
            </div>
          </div>
        </div>

        <div class="search">
          Send
        </div>

      </div>
    </div>


    <div class="altSidebar">
      <div class="topBar">
        Start a chat 
      </div>
      <div class="entry">
        <div class="name">
          Darren A. Myers
        </div>
        <div class="time">
          7 mins
        </div>
      </div>
      <div class="entry current">
        <div class="name">
          Louise	Osborne
        </div>
        <div class="time">
          2 hours
        </div>
      </div>
      <div class="entry">
        <div class="name">
          Chris	Holloway
        </div>
        <div class="time">
          7 hours
        </div>
      </div>
      <div class="entry">
        <div class="name">
          Dianne	Mason
        </div>
        <div class="time">
          1 day
        </div>
      </div>
      <div class="entry">
        <div class="name">
          Grant	Burns
        </div>
        <div class="time">
          1 day
        </div>
      </div>
      <div class="entry">
        <div class="name">
          Philip	Cross
        </div>
        <div class="time">
          2 days
        </div>
      </div>
      <div class="entry">
        <div class="name">
          Ginger	Wolfe
        </div>
        <div class="time">
          3 days
        </div>
      </div>
      <div class="entry">
        <div class="name">
          Erika	Gonzales
        </div>
        <div class="time">
          5 days
        </div>
      </div>


    </div>
  </div>
</template>

<style scoped>
.flexIt {
  display: flex;
  flex-direction: row;
}
.altSidebar {
  width: 270px;
  height: 500px;
  display: flex;
  flex-direction: column;
}
.entry {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  height: 40px;
  line-height: 40px;
  padding: 3px 6px 3px 6px;
}
.topBar {
  color: white;
  margin-top: 20px;
}
.current {
  background: rgba(255, 255, 255, 0.4);
  border-radius: 0px 20px 20px 0px;
}
.hide {
  display: none;
  visibility: hidden;
}
.privateMess {
  background: rgba(255, 255, 255, 0.4);
  flex-grow: 1;
  flex-basis: 0;
  border-radius: 20px;
}
.allMess {
  display: flex;
  flex-direction: column;
}
.line {
  width: auto;
  margin: 10px 25px 0px 25px;
  text-align: left;
}
.search {
  height: 50px;
  line-height: 50px;
  background-color:rgba(255, 255, 255, 0.4);
  text-align: left;
  padding-left: 10px;
  margin: 10px;
  border-radius: 20px;
}

.themA {
  display: flex;
  flex-direction: column;
  width: 395px;
}
.them1 {
  float: left;
  position: relative;
	background: white;
	border-radius: 20px;
  padding: 10px;
}
.them1:after {
	content: '';
	position: absolute;
	left: -1;
	top: 55%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: white;
	border-left: 0;
	border-bottom: 0;
	margin-top: -10px;
	margin-left: -20px;
}
.themC {
  display: flex;
  flex-direction: column;
  width: 526px;
}
.them3 {
  float: left;
  position: relative;
	background: white;
	border-radius: 20px;
  padding: 10px;
}
.them3:after {
	content: '';
	position: absolute;
	left: 9px;
	top: 77%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: white;
	border-left: 0;
	border-bottom: 0;
	margin-top: -10px;
	margin-left: -20px;
}
.meB {
  display: flex;
  flex-direction: column;
  width: 427px;
  float: right;
}
.me2 {
  float: right;
  position: relative;
	background: white;
	border-radius: 20px;
  padding: 10px;
}
.me2:after {
	content: '';
	position: absolute;
	right: 9px;
	top: 75%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-left-color: white;
	border-right: 0;
	border-bottom: 0;
	margin-top: -10px;
	margin-right: -20px;
}
.meD {
  display: flex;
  flex-direction: column;
  width: 427px;
  float: right;
}
.me4 {
  float: right;
  position: relative;
	background: white;
	border-radius: 20px;
  padding: 10px;
}
.me4:after {
	content: '';
	position: absolute;
	right: 9px;
	top: 79%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-left-color: white;
	border-right: 0;
	border-bottom: 0;
	margin-top: -10px;
	margin-right: -20px;
}
.themTime {
  text-align: left;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.meTime {
  text-align: right;
  color: white;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
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
/* object {
    pointer-events: none;
} */
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
      console.log("in the trash folder");
      console.log("thread Id: ");
      console.log(this.messages);
      let thisThreadid = this.messages[0].threadId;
      console.log(thisThreadid);
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