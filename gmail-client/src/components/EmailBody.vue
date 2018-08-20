/* eslint-disable */
<template>
  <div id="body">
    <div class="flexboxSubject">
      <h4 class="leftAlign">Synchronize</h4>
      
      <img src="./../assets/lock.png">
    </div>

    <div v-for="message in messages" :key="message.messageId">
      <div class="flexboxSubject">
        <div class="leftAlign">
          <hr>
          <b>Ally Walker</b>
        </div>
        <div class="rightAlign shift-down">
          expires in 4 days
        </div>
      </div>


      <div class="leftAlign">
        <p>
 			    Quick win moving the goalposts, or run it up the flagpole I have zero 
          cycles for this, or where the metal hits the meat but UX. We just need
          to put these last issues to bed. Let's prioritize the low-hanging 
          fruit strategic staircase that jerk from finance really threw me under
          the bus, baseline accountable talk. Timeframe. Tbrand terrorists gain
          traction what's the status on the deliverables for eow?, for close 
          the loop so we want to see more charts. Back to the drawing-board 
          loop back we are running out of runway yet root-and-branch review on
          your plate, or quick win. Peel the onion. Data-point action item, 
          nor quick-win or overcome key issues to meet key milestones, and 
          streamline, yet game-plan timeframe. Run it up the flagpole, ping the
          boss and circle back peel the onion to be inspired is to become 
          creative, innovative and energized we want this philosophy to trickle 
          down to all our stakeholders. Closer to the metal. Timeframe. 
          Player-coach drink from the firehose, digitalize nor imagineer. On your 
          plate level the playing field. Digitalize innovation is hot right now. 
          I have zero cycles for this blue sky but we need to start advertising on 
          social media please advise soonest so strategic staircase. Win-win. We 
          need to future-proof this wiggle room, but productize. 
        </p>
        <p>
          Accountable talk tbrand terrorists, nor game plan, nor put a record on 
          and see who dances, yet good optics so highlights . Can you send me an 
          invite? golden goose. We don't want to boil the ocean curate quick win 
          streamline. Please use "solutionise" instead of solution ideas! :). I 
          have zero cycles for this parallel path, yet product management breakout 
          fastworks and parallel path and upsell yet deploy. 
        </p>
      </div>
      
      
    </div>

 
  </div>
</template>

<style scoped>
img {
  width: 40px;
  height: 40px;
  margin-top: 8px;
}
p {
  margin-right: 73px;
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
  margin-bottom: 15px;
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
  padding-bottom: 2%;
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