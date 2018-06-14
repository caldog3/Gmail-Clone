/* eslint-disable */
<template>
  <div class="everything">
    <table class="table table-striped table-inbox hidden" id="example-1">
        <tbody v-for="message in messages" :key="message.id" v-bind:class="classChanger(message)">
            <template v-if="message.labelIds.includes(labelId)" >
              <!--v-bind:class="{tableRow: noHover, tableRowHover: tableRowClass}" v-on:hover="hovering()"-->
                <td class="One">
          
                    <div id="flexfix">
                      <div>
                        <span v-if=!checked v-on:click="check()" class="highlightArea left">
                          <font-awesome-icon class="Icon" icon="square" />
                        </span>
                        <span v-if=checked v-on:click="check()" class="highlightArea left">
                          <font-awesome-icon class="Icon" icon="check-square"/>
                        </span>
                      </div>
                      <div>
                        <router-link v-on:click.native="enterMessage()" class="left" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                        <b><span class="leftAlign">{{ message.from }}</span></b>
                        <span class="smallOnly">{{ message.time }}</span>
                        </router-link>
                      </div>
                    </div>
                  
                </td>
                <td class="Two">
                  <router-link v-on:click.native="enterMessage()" class="left" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                    <div class="leftAlign1">
                    <b>{{ message.subject }} </b>- 
                    <br class="rwd-break">
                    <i><span v-html="message.snippet">...</span></i></div>
                  </router-link>
                </td>
                <td class="Three">
                  <router-link v-on:click.native="enterMessage()" class="right" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                  <span class="rightAlign">{{ message.time }}</span>
                  </router-link>
                </td>  
            </template>                      
        </tbody>
    </table>        
  </div>
</template>


<style scoped>
/* .everything {
  overflow-y: scroll;
  height: auto;
} */
#flexfix {
  display: flex;
  flex-direction: row;
}
.tableRow:hover {
  /* not done yet */
}
.readClass {
  color: none;
  background-color: none;
}
.unreadClass {
  /* color: #F5F7F7; */
  background-color: #F5F7F7;
}
table {
  width: 100%;
  overflow: hidden;
  table-layout: fixed;
  border-top: none;
}

.table tbody + tbody {
    border-top: 0px
}

td { 
  overflow:hidden;
  white-space:nowrap;  
} 

.One {
  width: 200px;
}

.Two {
  width: auto;
  overflow: hidden;
}

.Three {
  width: 100px;
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
}
.smallOnly {
  display: none;
  visibility: hidden;
  float: right;
}
tbody {
  line-height: 5px;
}
.rwd-break {
  display: none;
}

a {
  color: black;
  display: inline-block;
  margin-top: 12px;
}

.left {
  float: left;
}

.right {
  float: right;
}
.highlightArea {
  padding:5px;
  width:100%;
  border-radius: 30px;
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
  }
  .rightAlign {
    visibility: hidden;
    display: none;
  }
  .leftAlign1 {
    float: left;
    text-align: left;
    width: auto;
  } 
  tbody {
    line-height: unset;
  }
  a {
    width: 100%;
    display: block;
    margin-top: 4px;
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
    enterMessage() {
      eventBus.$emit('ENTER_MESSAGE');
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
  }
}
</script>