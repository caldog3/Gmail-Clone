/* eslint-disable */
<template>
  <div class="everything">
    <!-- This is for testing the checkboxes array
    <span>
      <p> works.... {{ checkedEmails }} </p>
    </span> -->
    <template v-if="threads">

      <div v-for="thread in threads" :key="thread.threadId" v-bind:class="readClassChanger(thread)">
          <div class="FlexTable">
            <div class="checkboxes">
              <div class="first">
                
                <label class="container">
                  <div class="highlightAreaCheck">
                    <input type="checkbox" checked="checked" :value="thread.threadId" v-model="checkedEmails">
                    <span class="checkmark"></span>
                  </div>
      
                </label>
              </div>
              
                  <!-- <div v-if=!checked v-on:click="check()">
                    <font-awesome-icon class="Icon" icon="square" />
                  </div>
                  <div v-if=checked v-on:click="check()">
                    <font-awesome-icon class="Icon" icon="check-square"/>
                  </div> -->
                  
              <div class="largeOnly">
                <div class="highlightArea">
                  <input class="star" type="checkbox" title="bookmark page">
                </div>
              </div>

            </div>


            <div class="emailLink" v-on:click="enterMessage(thread)">

              <div class="from"> 
                  <b><span class="leftAlign">{{ thread.from }}</span></b>
              </div>

              <div class="snippit">
                <div class="leftAlign1">
                    <b>{{ thread.subject }} </b>- 
                    <br class="rwd-break">
                    <i><span v-html="thread.snippet">...</span></i>
                </div>
              </div>

              <div class="dateTime"> 
                <div class="rightAlign">{{ thread.time }}</div>
              </div>

            </div>

            <div class="smallOnly">
              <span>{{ thread.time }}</span>
              <div class="highlightArea">              
                <div v-if=!starCheck v-on:click="checkStar()">
                    <font-awesome-icon class="Icon" icon="star" />
                </div>
                <div v-if=starCheck v-on:click="checkStar()">
                  <font-awesome-icon style="color:gold;" class="Icon" icon="star" />
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
.everything {
  width: 100%;
  border-top: none;
}
.readClass {
  color: none;
  background: rgba(255, 255, 255, 0.6); 
  width: 100%;
}
.unreadClass {
  width: 100%;
}
.FlexTable {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-right: 3px;
  padding-left: 3px;
}
.first {
  width: 30px;
}
.checkboxes {
  display: flex;
  flex-direction: row;
  width: 60px;
  margin-right: 4px;
}
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
}
.item {
  width: 30px;
  height: 30px;
}
.emailLink {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  height: 30px;
  flex-grow: 1;
  flex-basis: 0;
  overflow: hidden;
  padding-top: 4px;
}
.from {
  width: 200px;
  overflow: hidden;
  white-space:nowrap; 
}
.dateTime {
  width: 100px;
  overflow: hidden;
  white-space:nowrap; 
  justify-content: flex-end;
  margin-left: auto;
}
.snippit {
  overflow: hidden;
  white-space:nowrap; 
  flex-grow: 1;
  flex-basis: 0;
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

@media screen and (max-width : 690px) {
  .emailLink {
    display: flex;
    flex-direction: column;
    height: 75px;
    padding-bottom: 4px;
  }
  .from {
    width: 100%;
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
}

@-moz-document url-prefix() {
  .star[data-v-9b75054c] {
    visibility: visible;
    left: 0px;
    top: 0px;
  }
  /* input.star:checked + label::after, input.star + label::after {
    display: inline-block;
    position: relative;
    visibility: visible;
    font-family: FontAwesome;
    font-size: 60px;
    background-color: transparent;
  }
  input.star:checked +label::after {
    content: '\f058';
    color: #16A085;
  }

  input.star + label::after {
    content: '\f057';
    color: #C0392B;
    position: relative;
    bottom: 5px;
  } */
}


</style>


<script>
import eventBus from '../event_bus';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { markAsRead } from './../store-utility-files/gmail-api-calls';
import _ from 'lodash';

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
    }
  },
  methods: {
    readClassChanger(message){
      var theClass = 'readClass';
      //console.log(message.unread);
      if(message.unread == true){
          theClass = 'unreadClass';
      }
      return theClass;
    },
    enterMessage(message) {
      eventBus.$emit('ENTER_MESSAGE');
      this.$router.push({ name: 'EmailBody', params: { 
        id: message.id,
        message: message,
        labelId: this.labelId
      }, hash: '#body'});
      markAsRead(message.id);
    },
    check() {
      this.checked = !this.checked;
    },
    checkStar() {
      this.starCheck = !this.starCheck;
    },
    
  },
  computed: {
    threads() {
      const labelId = this.labelId;
      let labelThreads = this.$store.state.labelMessages;
      
      const labelIdThreads = labelThreads[labelId];
      if (labelIdThreads !== undefined) {
        let message = this.$store.state.threadMessages;
        console.log("threadMessages length", message);
        const fullThreadData = labelIdThreads.map((threadId) => {
          const threadMessages = message[threadId];
          if (threadMessages !== undefined) {
            if (threadMessages.length >= 1) {
              // console.log("Getting threadMessages")
              // console.log("Array: ", threadMessages);
              // console.log("Length: ", threadMessages.length);
              let { from, subject, snippet, time, unixTime } = threadMessages[threadMessages.length - 1];
              // console.log({threadId, from, subject, snippet, time, unixTime });
              return {threadId, from, subject, snippet, time, unixTime };
            }
          }
        });
        if (fullThreadData !== undefined) {
          return fullThreadData;
        } else {
          return [];
        }
        
        // let threadsFinal = _.sortBy(labelThreads[labelId], [function(threads){
        //   return threads.unixTime;
        // }]).reverse();

        // return threadsFinal;
      }
    },
  },
  created() {
    eventBus.$emit('MESSAGE_LIST');
    eventBus.$on('CHECK_ALL', this.check);
  },
}
</script>