/* eslint-disable */
<template>
  <div>
    <table class="table table-striped table-inbox hidden" id="example-1">
        <tbody v-for="message in messages" :key="message.id">
            <template v-if="message.labelIds.includes(labelId)">            
                <td class="One">
                  <router-link :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                  <b><span class="leftAlign">{{ message.conciseFrom }}</span></b>
                  </router-link>  
                  <router-link :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                  <span class="smallOnly">{{ message.time }}</span>
                  </router-link>
                </td>
                <td class="Two">
                  <router-link :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                    <div class="leftAlign1">
                    <b>{{ message.subject }} </b>- 
                    <br class="rwd-break">
                    <i><span v-html="message.snippet">...</span></i></div>
                  </router-link>
                </td>
                <td class="Three">
                  <router-link :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">
                  <span class="rightAlign">{{ message.time }}</span>
                  </router-link>
                </td>  
            </template>                      
        </tbody>
    </table>        
  </div>
</template>

<style scoped>
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
  width: 15%;
  min-width: 15%;
  max-width: 15%;
}

.Two {
  width: 78%;
  min-width: 78%;
  max-width: 78%;
  overflow: hidden;
}

.Three {
  width: 12%;
  min-width: 12%;
  max-width: 12%;
}

.leftAlign {
  float: left;
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
export default {
  name: 'EmailList',
  props: ['labelId'],
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  }
}
</script>