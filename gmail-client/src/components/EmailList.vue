/* eslint-disable */
<template>
  <div class="everything">
    <!-- <table class="table table-striped table-inbox hidden" id="example-1">
        <tbody v-for="message in messages" :key="message.id" v-bind:class="classChanger(message)">
            <template v-if="message.labelIds.includes(labelId)" >
              v-bind:class="{tableRow: noHover, tableRowHover: tableRowClass}" v-on:hover="hovering()"
                <td class="One">
          
                    <div id="flexfix">
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
                      <div class="item">
                        <div class="highlightArea">
                          <div>
                            <font-awesome-icon class="Icon" icon="star" />
                          </div>
                          <div>
                            <font-awesome-icon class="Icon" icon="star" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <router-link v-on:click.native="enterMessage(message.id)" class="left" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                        <b><span class="leftAlign">{{ message.from }}</span></b>
                        </router-link>
                      </div>
                      <div class="emptySpace">
                        <router-link v-on:click.native="enterMessage(message.id)" class="left" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                        </router-link>
                      </div>
                      <div class="smallOnly">
                        <router-link v-on:click.native="enterMessage(message.id)" class="left" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                        <span>{{ message.time }}</span>
                        </router-link>
                      </div>
                    </div>
                  
                </td>
                <td class="Two">
                  <router-link v-on:click.native="enterMessage(message.id)" class="left" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                    <div class="leftAlign1">
                    <b>{{ message.subject }} </b>- 
                    <br class="rwd-break">
                    <i><span v-html="message.snippet">...</span></i></div>
                  </router-link>
                </td>
                <td class="Three">
                  <router-link v-on:click.native="enterMessage()" class="right" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                  <div class="rightAlign">{{ message.time }}</div>
                  </router-link>
                </td>  
            </template>                      
        </tbody>
    </table>         -->
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
                  <div class="smallOnly">
                    <span>{{ message.time }}</span>
                  </div>
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
#flexfix {
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  padding-right: 2px;
}
#flexfix div:last-child {
  margin-left: auto;
}
#flexfix svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}
.FlexTable {
  cursor: pointer;
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
  overflow: hidden
}
.from {
  width: 200px;
  overflow: hidden;
  white-space:nowrap; 
  flex: initial;
}
.dateTime {
  width: 100px;
  overflow: hidden;
  white-space:nowrap; 
  justify-content: flex-end;
  flex: initial;
  margin-left: auto;
}
.snippit {
  /* width: auto; */
  overflow: hidden;
  white-space:nowrap; 
  /* width: 400px; */
}

.tableColumn {
  display: table-cell;
}
/* .tableRow:hover {
   not done yet
} */
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
/* table {
  width: 100%;
  overflow: hidden;
  table-layout: fixed;
  border-top: none;
} */
.item {
  width: 30px;
  height: 30px;
}
/* .table tbody + tbody {
  border-top: 0px
} */

/* td { 
  overflow:hidden;
  white-space:nowrap;  
}  */

.One {
  width: 200px;
  padding: 0px;
  /* overflow-x: hidden; */
}

.Two {
  max-width: 1200px;
  overflow-x: hidden;
  white-space: nowrap ;
  padding: 0px;
}

.Three {
  width: 100px;
  padding: 0px;  overflow: hidden;

  white-space: nowrap;
}
.emptySpace {
  width: 100%;
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
tbody {
  /* line-height: 5px; */
}
.rwd-break {
  display: none;
}

a {
  color: black;
  display: inline-block;
  margin-top: 0px;
}

.left {
  float: left;
}

.right {
  float: right;
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
.Icon {
  /* border: 1px solid black; */
}

@media screen and (max-width : 950px) {
  table, thead, tbody, th, td, tr {
    display: block;
    min-width: 480px;
    overflow: hidden;
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  .One {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    /* height: 15px; */
  }

  .Two {
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    overflow: hidden; 
    padding: 3px;
  }

  .Three {
    width: 100%;
    min-width: 100%;
    max-width: 100%;  
    display: none;
    visibility: hidden;    
  }
  .rwd-break {
    display: block;
  }
  .smallOnly {
    display: block;
    visibility: visible;
    margin-right: 3px;
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
  .Two a {
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