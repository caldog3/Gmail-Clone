/* eslint-disable */
<template>
  <div class="body">
    <div class="leftAlign">
      <h4 >{{subject}}</h4>
      <hr>
      <p><b>{{from}}</b></p>
      <p>to {{to}}</p>
    </div>
    <div v-html="body" class="leftAlign"></div>
    <div class="response-buttons"> 
      <button type="button"><font-awesome-icon class="Icon" icon="reply" /> Reply</button>
      &emsp;
      <span v-bind:class="ifGroupMessage()">
        <button type="button"><font-awesome-icon class="Icon" icon="reply-all" /> ReplyAll</button>
        &emsp;
      </span>
      <button type="button"><font-awesome-icon class="Icon" icon="long-arrow-alt-right" /> Forward</button>
    </div>
  </div>
</template>

<style scoped>
/* .body {
  background-color: white;
  opacity: 0.6;
} */
.leftAlign {
  text-align: left;
  margin-left: 2%;
}
.response-buttons {
  padding: 40px;
  text-align: left;
  margin-left: 2%;
  /* padding-bottom: 40px; */
}
h4 {
  padding-top: 15px;
}
.group-message {
  display: inline;
}
.not-group-message {
  display: none;
}
.body {
  background-color: white;
  padding-top: 2%;
  padding-left: 5%;
}
</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'EmailBody',
  components: {
    FontAwesomeIcon
  },
  computed: {
    message(){
      let messageId =this.$route.params.id;
      let messages = this.$store.getters.messages;
      
      let counter = 0;
      while(messages[counter].id !== messageId){
        counter++;
      }

      return messages[counter];
    },
    subject(){
      return this.message.subject;
    },
    body(){
      return this.message.body;
    },
    from(){
      return this.message.detailedFrom;
    },
    to(){
      return this.message.to;
    },
  },
  methods: {
    ifGroupMessage() {
      let to = this.message.to;
      //console.log(to);
      var theClass = 'not-group-message';
      //console.log(message.unread);
      if(to.includes(",")){
          theClass = 'group-message';
      }
      return theClass;
    },
  },
}
</script>