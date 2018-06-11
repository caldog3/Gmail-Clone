/* eslint-disable */
<template>
  <div>
    <table class="table table-striped table-inbox hidden" id="example-1">
        <tbody v-for="message in messages" :key="message.id" v-bind:class="classChanger(message)">
            <template v-if="message.labelIds.includes(labelId)" >            
                <td class="One">
                  <router-link v-on:click.native="enterMessage()" class="left" :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                  <b><span class="leftAlign">{{ message.from }}</span></b>
                  <span class="smallOnly">{{ message.time }}</span>
                  </router-link>
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
.readClass {
  color: none;
  background-color: none;
}
.unreadClass {
  color: #F5F7F7;
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
}

.left {
  float: left;
}

.right {
  float: right;
}

@media screen and (max-width : 950px) {

  table, thead, tbody, th, td, tr {
    display: block;
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
  } 
  tbody {
    line-height: unset;
  }
  a {
    width: 100%;
    display: block;
  }
}
</style>

<script>
import eventBus from '../event_bus'

export default {
  name: 'EmailList',
  props: ['labelId'],
  // components: {
  //   eventBus
  // },
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
    }
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    },
  },
  created() {
    eventBus.$emit('MESSAGE_LIST');
  }
}
</script>