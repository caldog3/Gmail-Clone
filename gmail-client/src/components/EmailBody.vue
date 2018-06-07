/* eslint-disable */
<template>
  <div class="body">
    <div class="leftAlign">
      <h4 >{{subject}}</h4>
      <hr>
      <p><b>{{from}}</b></p>
      <p>to {{to}}</p>
    </div>
    <div v-html="body" ></div>
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
    subject(){
      return this.$route.params.message.subject;
    },
    body(){
      return this.$route.params.message.body;
    },
    from(){
      return this.$route.params.message.from;
    },
    to(){
      return this.$route.params.message.to;
    }
  }
}
</script>