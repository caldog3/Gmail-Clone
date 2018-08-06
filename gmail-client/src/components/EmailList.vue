/* eslint-disable */
<template>
  <div class="everything">
    <template v-if="threads">
      <!-- testing how I can change things based on if anything is checked -->
      <!-- <p>{{checkedThings}}</p> -->


      <span v-if="threads[0] !== undefined && (threads[0].labelId === 'TRASH' || threads[0].labelId === 'SPAM')">
        <div id="center-align">
          <span>Messages that have been in {{threads[0].labelId}} more than 30 days will be automatically deleted. &emsp;</span>
          <span class="blue">&emsp;Empty {{threads[0].labelId}} now</span>
        </div>
        <hr id="barrier">
      </span>
      <!-- if there are no messages -->
      <span v-if="threads[0] === undefined">
        <div id="center-align">
          <span>There are no messages in this folder</span>
        </div>
      </span>

      <div class="background">
        <div v-for="thread in threads" :key="thread.threadId" v-bind:class="readClassChanger(thread)">
          <div class="FlexTable">

              <div class="checkboxes">

                <div class="first">
                  <label class="container">
                    <div class="highlightAreaCheck">
                      <input type="checkbox" checked="checked" name="checks" :value="thread.threadId" v-model="checkedEmails">
                      <span class="checkmark"></span>
                    </div>
                  </label>
                </div>

                <div class="largeOnly" v-if="labelId !== 'TRASH'">
                  <div class="highlightArea">
                    <input v-on:click="starredLabelToggle(thread)" class="star" type="checkbox" :checked="thread.starred" title="bookmark page">
                  </div>
                </div>

                <div v-else> <font-awesome-icon class="Icon" icon="trash" /> </div>
              </div>
                <!-- <div class="largeOnly">
                  <div class="highlightArea">
                    <input v-on:click="starredLabelToggle(thread)" class="star" type="checkbox" :checked="thread.starred" title="bookmark page">
                  </div>
                </label>
              </div> -->
                              
              
              

              <!-- <div class="emailLink">

                <div class="from" v-on:click="enterMessage(thread)"> 
                    <b><span class="leftAlign">
                      <span v-if="thread.from === userEmail"> me </span>
                      
                      <span class='red' v-else-if="labelId === 'DRAFT'" v-on:click.stop="openCompose()"> {{thread.conciseTo}} Draft </span>
                      <span v-else-if="labelId === 'SENT'"> To: {{thread.conciseTo}}</span>
                      <span v-else-if="thread.from !== undefined"> {{ thread.from }} </span>
                      <span class="threadLength" v-if="thread.numberOfMessages > 1">{{ thread.numberOfMessages }}</span>
                    </span></b>
                </div>
                
                <div class="snippit" v-on:click="enterMessage(thread)">
                  <div class="leftAlign1">
                      <b>{{ thread.subject }} </b>- 
                      <br class="rwd-break">
                      <i><span v-html="thread.snippet">...</span></i>
                  </div>
                </div> -->

            <div class="emailLink">

              <div class="from" v-on:click="enterMessage(thread)"> 
                  <b><span class="leftAlign">
                    <span v-if="thread.from === userEmail"> me </span>
                    <!-- The on-click needs to match the conditional for just displaying draft -->
                    <span class='red' v-else-if="labelId === 'DRAFT'" v-on:click.stop="openCompose()"> {{thread.conciseTo}} Draft </span>
                    <!-- <span v-else-if="labelId === 'TRASH'"> <font-awesome-icon style="color:black;" class="Icon" icon="trash" /> {{thread.from}}</span> -->
                    <span v-else-if="labelId === 'SENT'"> To: {{thread.conciseTo}}</span>
                    <span v-else-if="thread.from !== undefined"> {{ thread.from }} </span>
                    <span class="threadLength" v-if="thread.numberOfMessages > 1">{{ thread.numberOfMessages }}</span>
                  </span></b>
              </div>
              
              <div class="snippit" v-on:click="enterMessage(thread)">
                <div class="leftAlign1">
                    <b>{{ thread.subject }} </b>- 
                    <br class="rwd-break">
                    <i><span v-html="thread.snippet">...</span></i>
                </div>
              </div>

              <div class="dateTime"> 
                <div class="rightAlign">{{ thread.time }}</div>
              </div>

            </diV>
              <div class="hoverView">
                <div class="item">

                  <div class="highlightArea" v-on:click="archiveThread(thread)">
                    <font-awesome-icon style="color:grey;" class="Icon" icon="archive"/> 
                    <span class="tooltiptext">Archive</span>
                  </div>

                  <div class="highlightArea">
                    <font-awesome-icon style="color:grey;" class="Icon" icon="exclamation-circle" /> 
                    <span class="tooltiptext">Report Spam</span>
                  </div>

                  <div class="highlightArea" v-on:click="toggleUnread(thread)" v-if="thread.unread">
                    <font-awesome-icon style="color:grey;" class="Icon" icon="envelope-open" />
                    <span class="tooltiptext">Mark as Unread</span>
                  </div>
                  <div class="highlightArea" v-on:click="toggleUnread(thread)" v-else>
                    <font-awesome-icon style="color:grey;" class="Icon" icon="envelope" />
                    <span class="tooltiptext">Mark as Read</span>
                  </div>
                  
                  <div class="highlightArea">
                    <font-awesome-icon style="color:grey;" class="Icon" icon="clock" /> 
                    <span class="tooltiptext">Snooze</span>
                  </div>

                </div>
              </div>

              <div class="smallOnly">
                <span>{{ thread.time }}</span>
                <div class="smallHover">
                  <div class="item">

                    <div class="highlightArea" v-on:click="archiveThread(thread)">
                      <font-awesome-icon style="color:grey;" class="Icon" icon="archive"/> 
                      <span class="tooltiptext">Archive</span>
                    </div>

                    <div class="highlightArea">
                      <font-awesome-icon style="color:grey;" class="Icon" icon="exclamation-circle" /> 
                      <span class="tooltiptext">Report Spam</span>
                    </div>

                    <div class="highlightArea" v-on:click="toggleUnread(thread)" v-if="thread.unread">
                      <font-awesome-icon style="color:grey;" class="Icon" icon="envelope-open" />
                      <span class="tooltiptext">Mark as Unread</span>
                    </div>
                    <!-- it isn't making it to my function -->
                    <div class="highlightArea" v-on:click="toggleUnread(thread)" v-else>
                      <font-awesome-icon style="color:grey;" class="Icon" icon="envelope" />
                      <span class="tooltiptext">Mark as Read</span>
                    </div>

                    <div class="highlightArea">
                      <font-awesome-icon style="color:grey;" class="Icon" icon="clock" /> 
                      <span class="tooltiptext">Snooze</span>
                    </div>

                  </div>
                </div>
                <div class="highlightArea">              
                  <div class="highlightArea">
                    <input v-on:click="starredLabelToggle(thread)" class="star" type="checkbox" :checked="thread.starred" title="bookmark page">
                  </div>
                </div>
            </div>

          </div>
        </div>
        </div>
    </template>
    <template v-else>
      <h1>Not yet initialized</h1>
    </template>
  </div>
</template>


<style scoped>
.background {
  background: rgba(255, 255, 255, 0.6);
}
#center-align {
  text-align: center;
  padding:15px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
}
#barrier {
  border-top: 4px solid transparent;
  margin: 0;
}
.blue {
  color: #297be6;
  cursor: pointer;
  }
.red {
  color: red;
  font-weight: 90;
}
.threadLength {
  color: gray;
  font-size: .9em;
}
.everything {
  width: 100%;
  border-top: none;
}
.readClass {
  color: none;
  background: rgba(255, 255, 255, 0.6); 
  width: 100%;
  position: relative;
  /* z-index: 1; */
}
.readClass:hover {
  box-shadow: 2px 0px 5px grey;
}
.unreadClass {
  width: 100%;
  font-weight: 90;
  position: relative;
  /* z-index: 1; */
}
.unreadClass:hover {
  box-shadow: 2px 0px 5px grey;
}
.FlexTable {
  position: relative;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  padding-right: 3px;
  padding-left: 3px;
  height: 40px;
  /* z-index: 3; */
}
.first {
  width: 30px;
}
.checkboxes {
  display: flex;
  flex-direction: row;
  width: 60px;
  margin: 5px 4px 5px 0px
}

/* The Checkbox  */
/* The container */
.container {
  display: block;
  position: relative;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  top: 7px;
  left: 6px;
  opacity: 0;
  cursor: pointer;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 7px;
  left: 6px;
  height: 17px;
  width: 17px;
  background-color: rgba(255, 255, 255, 0.0); 
  border-color: black;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: rgba(255, 255, 255, 0.0); 
}
/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: black;
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}
/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.largeOnly {
  width: 30px;
  height: 30px;
}

/*  The Star Checkbox   */
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

.item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.emailLink {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  flex-grow: 1;
  flex-basis: 0;
  overflow: hidden;
  position: relative;
  /* z-index: 4; */
}
.from {
  width: 200px;
  overflow: hidden;
  white-space:nowrap; 
  padding: 10px 0px 5px 0px;
}
.dateTime {
  width: 100px;
  overflow: hidden;
  white-space:nowrap; 
  justify-content: flex-end;
  padding-left: auto;
  padding-top: 10px;
  
}
.snippit {
  overflow: hidden;
  white-space:nowrap; 
  flex-grow: 1;
  flex-basis: 0;
  padding-top: 10px;
}
.rwd-break {
  display: none;
}
a {
  color: black;
  display: inline-block;
  margin-top: 0px;
}
.leftAlign {
  float: left;
  text-align: left;
}
.leftAlign1 {
  float: left;
}
.rightAlign {
  float: right;
  display: block;
  visibility: visible;
  padding-right: 5px;
}
.smallOnly {
  display: none;
  visibility: hidden;
  float: right;
  margin-top: 4px;
}
.smallHover {
  display: none;
  visibility: hidden;
}
.highlightArea {
  width: 30px;
  height: 30px;
  border-radius: 35px;
  cursor: pointer; 
}
.highlightArea:hover {
  background-color: rgba(255, 255, 255, 0.7) !important;
}
.highlightAreaCheck {
  width: 30px;
  height: 30px;
  border-radius: 35px;
  cursor: pointer; 
  position: absolute;
  left: 6px;
}
.highlightAreaCheck:hover {
  background-color: rgba(255, 255, 255, 0.7) !important;
}
svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}

.FlexTable:hover .dateTime {
  visibility: hidden;
  display: none;
}

.hoverView {
  visibility: hidden;
  position: relative;
  display: none;
  width: 200px;
  overflow: hidden;
  white-space:nowrap; 
  justify-content: flex-end;
  margin-left: auto;
  flex-direction: row;
  padding-left: 18px;
  margin-top: 5px;
}

.FlexTable:hover .hoverView {
  visibility: visible;
  display: block;
}
/* 
.FlexTable:hover .emailLink {
  font-weight: bold;
} */

.FlexTable:hover .checkmark {
  border-width: 2px;
}

.highlightArea .tooltiptext {
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 1px;
  border-radius: 6px;
  
  /* Position the tooltip text */
  position: relative;
  z-index: 1;
  bottom: 7px;
  left: -23px;
  margin-left: -30px;
  font-size:x-small;
  white-space: nowrap;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
/* Show the tooltip text when you mouse over the tooltip container */
.highlightArea:hover .tooltiptext {
  visibility: visible;
  /* z-index: 999999999999999999999999999999999; */
  opacity: 1;
}

.Icon {
  margin-left: 7px;
}

@media screen and (max-width : 830px) {
  .FlexTable {
    height: 110px;
  }
  .emailLink {
    display: flex;
    flex-direction: column;
    padding-bottom: 4px;
  }
  .from {
    width: 100%;
  }
  .FlexTable:hover .smallOnly span {
    display: none;
  }
  .FlexTable:hover .smallHover {
    display: block;
    visibility: visible;
  }
  .FlexTable:hover .smallOnly {
    width: 110px;
  }
  svg:not(:root).svg-inline--fa {
    margin-top: 7px;
    margin-right: 5px;
  }
  .rwd-break {
    display: block;
  }
  .smallOnly {
    display: block;
    visibility: visible;
    margin-right: 3px;
    margin-left: 6px;
    width: 65px;
  }
  .smallOnly > div {
    float: right;
  }
  .largeOnly {
    display: none;
    visibility: hidden;
  }
  .checkboxes {
    width: 30px;
    margin-right: 8px;
  }
  .rightAlign {
    visibility: hidden;
    display: none;
  }
  .leftAlign1 {
    float: left;
    text-align: left;
  } 
  tbody {
    line-height: unset;
  }
  a {
    width: 100%;
    display: block;
    margin-top: 0px;
  }
  .FlexTable:hover .hoverView {
    visibility: hidden;
    display: none;
  }
  .highlightArea .tooltiptext {
    visibility: hidden;
    background-color: #555;
    color: #fff;
    text-align: center;
    padding: 1px;
    border-radius: 6px;
    
    /* Position the tooltip text */
    position: relative;
    z-index: 1;
    bottom: 0px;
    left: 0px;
    margin-left: 0px;
    font-size: x-small;
    white-space: nowrap;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;
  }
/* Show the tooltip text when you mouse over the tooltip container */
  .highlightArea:hover .tooltiptext {
    visibility: visible;
    /* z-index: 999999999999999999999999999999999; */
    opacity: 1;
  }
}

@-moz-document url-prefix() {
  .star[data-v-9b75054c] {
    visibility: visible;
    left: 0px;
    top: 0px;
  }
}

</style>


<script>
import eventBus from '../event_bus';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { archiveMessage, markAsRead, markAsUnread, markAsStarred, unMarkAsStarred, getNumberOfMessages } from './../store-utility-files/gmail-api-calls';
import { getTimeFormat } from './../store-utility-files/email';
import { sortBy } from 'lodash'

export default {
  name: 'EmailList',
  props: ['labelId'],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      checked: false,
      starCheck: false,
      checkedEmails: [],
      userEmail: '',
    }
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
    this.$store.state.labelMessages.STARRED = [];
    this.$store.dispatch("getFolderListOfMessages", "STARRED");
    },
    toggleUnread(thread) {
      if (thread.unread === true) {
        markAsUnread(thread.threadId);
      }
      else if (thread.unread === false) {
        markAsRead(thread.threadId);
      }
    },
    archiveThread(thread) {
      console.log("archiving");
      archiveMessage(thread.threadId);
    },
    readClassChanger(message){
      var theClass = 'readClass';
      //console.log(message.unread);
      if(message.unread == true){
          theClass = 'unreadClass';
      }
      return theClass;
    },
    enterMessage(thread) {
      // Trying to have an email show as read after you've clicked on it
      //  without having to reload all of the emails
      // thread.unread = false;
      // this.readClassChanger(thread);
      eventBus.$emit('ENTER_MESSAGE');
      this.$router.push({ name: 'EmailBody', params: { id: thread.threadId} });
      markAsRead(thread.threadId);
    },
    check() {
      this.checked = !this.checked;
    },
    checkStar() {
      this.starCheck = !this.starCheck;
    },
    openCompose() {
      eventBus.$emit('COMPOSE_OPEN');
    },
    readAll() {
      let labelId = this.labelId;
      let labelThreads = this.$store.getters.getLabelMessages;
      let labelIdThreads = labelThreads[labelId];
      var unread;
      if (labelIdThreads !== undefined) {
        let messages = this.$store.getters.getThreadMessages;

        let fullThreadData = labelIdThreads.map((threadId) => {
          let threadMessages = messages[threadId];
          let numberOfMessages = threadMessages.length;

          if (numberOfMessages > 0) {
            unread = threadMessages[0];
            return {threadId, unread};
          }
        });

        if (labelId === this.$store.state.currentFolder) {  //It's working so far
          for (var i = 0; i < fullThreadData.length; i++) {
            if (fullThreadData[i].unread.unread == false) {
              markAsRead(fullThreadData[i].threadId);
            }
          }
        }
      }

    },
  },
  computed: {
    checkedThings: function() {
      if(this.checkedEmails === []) {
        return "hey there are checked things";
      }
      else { return "nah" };
    },

    threads() {
      const labelId = this.labelId;
      const labelThreads = this.$store.getters.getLabelMessages;
      
      const labelIdThreads = labelThreads[labelId];
      if (labelIdThreads !== undefined) {
        const messages = this.$store.getters.getThreadMessages;

        const fullThreadData = labelIdThreads.map((threadId) => {
          const threadMessages = messages[threadId];
          const numberOfMessages = threadMessages.length;

          if (numberOfMessages > 0) {
            const { from, starred, conciseTo, subject, snippet, unread } = threadMessages[0];
            const unixTime = this.$store.getters.getLatestThreadMessageTime[threadId];
            const time = getTimeFormat(unixTime * 1000).time;
          
            return {threadId, from, starred, conciseTo, labelId, subject, snippet, time, unread, numberOfMessages};
          } else {
            console.log("Not yet Ready. The Label is", labelId)
            return {};
          }
        });
        return fullThreadData;
      }
    },
  },
  created() {
    eventBus.$emit('MESSAGE_LIST');
    eventBus.$on('CHECK_ALL', source => {
      for(var i = 0; i < document.getElementsByName('checks').length; i++) {
        if (source === true) {
          document.getElementsByName('checks')[i].checked = true;
        }
        else {
          document.getElementsByName('checks')[i].checked = false;
        }
      }
    });
    eventBus.$on('MARK_ALL_AS_READ', this.readAll);
    this.userEmail = this.$store.state.currentUserProfile.U3;
  },
}
</script>