/* eslint-disable */
<template>
  <div>
    <div id="body">
      <div class="flexboxSubject">
        <div class="leftAlign">{{messages[0].subject}}</div>
        <div class="rightAlign"><font-awesome-icon style="text-align=right;" class="Icon" icon="print" /></div>
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
            <img width="213" height="120" alt="An Image should be here" :src="`data:${attachments[attachmentId.attachmentId].mimeType};base64,${attachments[attachmentId.attachmentId].data}`"/>
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







    <div class="ALL">

      <div class="messageFlex">
        <div class="line">
          <div class="me1">
            <div class="meMess1">
              Leverage agile frameworks to provide a robust synopsis for high level overviews. 
              Iterative approaches to corporate strategy foster collaborative thinking to further 
              the overall value proposition. 
              
              <i> <div class="side"> expires in 1 day </div> </i>
            </div>
            <div class="photo">
              <img src="./../assets/user1.jpg">
            </div>
          </div>
        </div>
        <div class="line">
          <div class="them2">
            <div class="themMess2">
              Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. 
              
              <i> <div class="side"> expires in 2 days </div> </i>
            </div>  
            <div class="photo">
              <img src="./../assets/user4.jpg">
            </div>
          </div>
        </div>
        <div class="line">
          <div class="them3">
            <div class="themMess3">
              Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
              
              <i> <div class="side"> expires in 2 days </div> </i>
            </div>
            <div class="photo">
              <img src="./../assets/user4.jpg">
            </div>
          </div>
        </div>
        <div class="line">
          <div class="me4">
            <div class="meMess4">
              User generated content in real-time will have multiple touchpoints for offshoring.
              
              <i> <div class="side"> expires in 4 days </div> </i>
            </div>
            <div class="photo">
              <img src="./../assets/user1.jpg">
            </div>
          </div>
        </div>
        <div class="fill">

        </div>

      </div>

      <div class="send">
        <div> 
          Send a message
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.ALL {
  width: 100%;
  /* height: 400px; */
  background-color: rgba(180, 180, 180, 0.7);
  text-align: left;
  margin: 4px 0px 0px 8px;
  /* overflow-y: scroll; */
}
.messageFlex {
  display: flex;
  flex-direction: column;
  width: 100%;
  
}
.line {
  width: 100%;
  padding: 0px 5px 5px 4px;
}
.me1 {
  width: 55%;
  float: right;
  display: flex;
  flex-direction: row;
  margin: 5px 2px 2px 2px;
}
.meMess1 {
  background-color: white;
  padding: 10px;
}
.me4 {
  width: 45%;
  float: right;
  display: flex;
  flex-direction: row;
}
.meMess4 {
  background-color: white;
  padding: 10px;
}
.them2 {
  width: 35%;
  float: left;
  display: flex;
  flex-direction: row-reverse;
}
.themMess2 {
  background-color: white;
  padding: 10px;
}
.them3 {
  width: 45%;
  float: left;
  display: flex;
  flex-direction: row-reverse;
}
.themMess3 {
  background-color: white;
  padding: 10px;
}

img {
  width: 70px;
  height: 70px;

}
.send {
  /* position: absolute; */
  height: 70px;
  background-color: white;
  display: flex;
  flex-direction: row;
  margin-top: auto;
}
.send > div {
  margin: 20px;
  height: 30px;
  line-height: 30px;
}
.fill {
  height: 40px;
}
.side {
  text-align: right;
}




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
/* div {
  padding-top: 15px;
} */
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
  display: none;
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
          console.log(times);
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