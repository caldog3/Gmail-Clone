/* eslint-disable */
<template>
  <div>
    <table class="table table-striped table-inbox hidden" id="example-1">
        <tbody v-for="message in messages" :key="message.id">
            <template v-if="message.labelIds.includes(labelId)">
                <td class="One"><b><span class="leftAlign">{{ message.conciseFrom }}</span></b></td>
                <td class="Two"><span class="leftAlign">
                    <b>{{ message.subject }} </b>- <i><span v-html="message.snippet"></span></i></span>...
                </td>
                <td class="Three"><span class="rightAlign">{{ message.time }}</span></td>
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
.rightAlign {
  float: right;
}

tbody {
  line-height: 5px;
}

@media screen and (max-width : 858px) {

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
  }
}
</style>

<script>
export default {
  name: 'EmailList',
  props: {
      labelId: {
          type: String, 
          required: false
      }
  },
  computed: {
    messages() {
      return this.$store.getters.messages;
    }
  }
}
</script>