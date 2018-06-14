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
  </div>
</template>

<style scoped>
.leftAlign {
  text-align: left;
  margin-left: 2%;
}
</style>

<script>
export default {
  name: 'EmailBody',
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
    }
  },
}
</script>