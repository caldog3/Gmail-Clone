/* eslint-disable */
<template>
  <div>
    <table class="table table-striped table-inbox hidden" id="example-1">
        <tbody v-for="message in messages" :key="message.id">
            <template v-if="message.labelIds.includes(labelId)">
              <router-link :to="{ name: 'EmailBody', params: { id: message.id, message: message }}">              
                <td class="One"><b><span class="leftAlign">{{ message.conciseFrom }}</span></b>
                  <span class="smallOnly">{{ message.time }}</span>
                </td>
                <td class="Two"><div class="leftAlign1">
                    <b>{{ message.subject }} </b>- 
                    <br class="rwd-break">
                    <i><span v-html="message.snippet">...</span></i></div>
                </td>
                <td class="Three"><span class="rightAlign">{{ message.time }}</span></td>
              </router-link>  
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
  width: 79%;
  min-width: 79%;
  max-width: 79%;
  overflow: hidden;
}

.Three {
  width: 10%;
  min-width: 10%;
  max-width: 10%;
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