/* eslint-disable */
<template>
  <div class="everything">
    <!-- This is for testing the checkboxes array
    <span>
      <p> works.... {{ checkedEmails }} </p>
    </span> -->
      <div v-for="message in messages" :key="message.id" v-bind:class="classChanger(message)">
        <template v-if="message.labelIds.includes(labelId)">
          <div class="FlexTable">

            <div class="checkboxes">

              <div class="highlightArea">
                <div class="item">
                  <!-- <div v-if=!checked v-on:click="check()">
                    <font-awesome-icon class="Icon" icon="square" />
                  </div>
                  <div v-if=checked v-on:click="check()">
                    <font-awesome-icon class="Icon" icon="check-square"/>
                  </div> -->
                  <label class="container">
                    <input type="checkbox" checked="checked" :value="message.id" v-model="checkedEmails">
                    <span class="checkmark"></span>
                  </label>
                </div>
              </div>

              <div class="star">
                <div class="largeOnly">
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


            <div class="emailLink" v-on:click="enterMessage(message)">

              <div class="from"> 
                  <b><span class="leftAlign">{{ message.from }}</span></b>
              </div>

              <div class="snippit">
                <div class="leftAlign1">
                    <b>{{ message.subject }} </b>- 
                    <br class="rwd-break">
                    <i><span v-html="message.snippet">...</span></i>
                </div>
              </div>

              <div class="dateTime"> 
                <div class="rightAlign">{{ message.time }}</div>
              </div>

            </div>


            <div class="smallOnly">
              <span>{{ message.time }}</span>
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
        </template>
      </div>
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
  top: -2px;
  left: 6px;
  opacity: 0;
  cursor: pointer;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: -2px;
  left: 6px;
  height: 17px;
  width: 17px;
  background-color: #eee;
  border-color: black;
  border-style: solid;
  border-width: 2px;
  border-radius: 4px;
}
/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
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
  left: 4px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
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
svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}

@media screen and (max-width : 950px) {
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
    classChanger(message){
      var theClass = 'readClass';
      //console.log(message.unread);
      if(message.unread == true){
          theClass = 'unreadClass';
      }
      return theClass;
    },
    enterMessage(message) {
      eventBus.$emit('ENTER_MESSAGE');
      this.$router.push({ name: 'EmailBody', params: { id: message.id, message: message }});
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
    messages() {
      let messagesFinal = _.sortBy(this.$store.getters.messages, [function(messages){
        return messages.unixTime;
      }]).reverse();
      
      return messagesFinal;
    },
  },
  created() {
    eventBus.$emit('MESSAGE_LIST');
    eventBus.$on('CHECK_ALL', this.check);
  }
}
</script>