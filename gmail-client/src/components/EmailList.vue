/* eslint-disable */
<template>
  <div class="everything">
      <div v-for="message in messages" :key="message.id" v-bind:class="classChanger(message)">
        <template v-if="message.labelIds.includes(labelId)">
          <!-- v-bind:class="{tableRow: noHover, tableRowHover: tableRowClass}" v-on:hover="hovering()" -->
          <div class="FlexTable">
            <div class="checkboxes">
              <div class="item">
                <div class="highlightArea">
                  <div v-if=!checked v-on:click="check()">
                    <font-awesome-icon class="Icon" icon="square" />
                  </div>
                  <div v-if=checked v-on:click="check()">
                    <font-awesome-icon class="Icon" icon="check-square"/>
                  </div>
                </div>
              </div>
              <div class="star">
                <div class="highlightArea">
                  <font-awesome-icon class="Icon" icon="star" />
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
                <font-awesome-icon class="Icon" icon="star" />
              </div>
            </div>

          </div>
          
        </template>
      </div>
  </div>
</template>


<style scoped>
.everything {
  /* overflow-y: scroll; */
  /* height: auto; */
  /* table-layout: fixed; */
  width: 100%;
  border-top: none;
}
.FlexTable {
  display: flex;
  flex-direction: row;
  align-content: stretch;
}
.checkboxes {
  display: flex;
  flex-direction: row;
  width: 60px;
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
  /* width: auto; */
  overflow: hidden;
  white-space:nowrap; 
  flex-grow: 1;
  flex-basis: 0;
  /* width: 400px; */
}
.readClass {
  color: none;
  background-color: none;
  width: 100%;
}
.unreadClass {
  /* color: #F5F7F7; */
  background-color: #F5F7F7;
  width: 100%;
}
.item {
  width: 30px;
  height: 30px;
}
.leftAlign {
  float: left;
  text-align: left;
}
.leftAlign1 {
  float: left;
  /* padding-left: 25px; */
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
}
.rwd-break {
  display: none;
}
a {
  color: black;
  display: inline-block;
  margin-top: 0px;
}
.highlightArea {
  width: 30px;
  height: 30px;
  border-radius: 35px;
  cursor: pointer; 
}
.highlightArea:hover {
  background-color: lightgray !important;
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
    width: 50px;
  }
  .smallOnly > div {
    float: right;
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
      //this.$store.markAsRead(message.id);
    },
    check() {
      this.checked = !this.checked;
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