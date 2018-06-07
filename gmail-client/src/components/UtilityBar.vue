<template>
  <div class="body">
    <div id="spacing">
      <span v-if=!messageBody>
        <font-awesome-icon icon="square" size="md"/>
        |
        <font-awesome-icon icon="check-square" size="md"/>
      </span>
      
      <span v-if=messageBody>
        <font-awesome-icon icon="retweet" size="md"/>
        <font-awesome-icon icon="archive" size="md"/> 
        <font-awesome-icon icon="exclamation-circle" size="md"/> 
        <font-awesome-icon icon="trash" size="md"/> 
        <font-awesome-icon icon="envelope-open" size="md"/> 
        <font-awesome-icon icon="clock" size="md"/> | 
        <font-awesome-icon icon="arrow-circle-right" size="md"/> 
        <font-aweomse-icon icon="tag" size="md"/>
      </span>
    </div>
    <button v-on:click="utilityToggle">Toggle</button>
    <!-- <font-awesome-icon icon="angle-down" size="lg"/> -->
  
  </div>
</template>

<style scoped>
.body {
  background-color:white;
  height: 40px;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d3d3d3;
} 
#spacing {
  float:left;
}
input {
  float: left;
}
button {
  float: right;
  margin-right: 20%;
}
</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'UtilityBar',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      messageBody: false,
    }
  },
  methods: {
    utilityToggle: function() {
      this.messageBody = !this.messageBody;
    }
  }
}
</script>
