<template>
  <div class="body">
    <div id="spacing">
      <span v-if=!messageBody>
        <div>
          <font-awesome-icon class="Icon" icon="square" />
          |
          <font-awesome-icon class="Icon" icon="check-square"/>
        </div>
      </span>
      
      <span v-if=messageBody>
        <div class="CenterIt">
          <font-awesome-icon class="Icon" icon="arrow-left"/>
          <font-awesome-icon class="Icon" icon="retweet"/>
          <font-awesome-icon class="Icon" icon="archive"/> 
          <font-awesome-icon class="Icon" icon="exclamation-circle" /> 
          <font-awesome-icon class="Icon" icon="trash" /> 
          <font-awesome-icon class="Icon" icon="envelope-open" /> 
          <font-awesome-icon class="Icon" icon="clock" /> | 
          <font-awesome-icon class="Icon" icon="arrow-circle-right" /> 
          <font-aweomse-icon class="Icon" icon="tag"/>
        </div>
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
.Icon {
  display:inline-block;
}
.Icon:hover {
  background-color: darkgray;  
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
