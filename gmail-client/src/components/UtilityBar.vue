<template>
  <div class="body">
    <div id="spacing">
      <span v-if=!messageBody>
        <div class="flexIcons">
          <div class="item">
            <div class="highlightArea">
            <div v-if=!checked v-on:click="check()" >
              <font-awesome-icon class="Icon" icon="square" />
            </div>
            <div v-if=checked v-on:click="check()" >
              <font-awesome-icon class="Icon" icon="check-square"/>
            </div>
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
            <div>
              <font-awesome-icon class="Icon" icon="retweet"/>
            </div>
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
            <div>
              <font-awesome-icon class="Icon" icon="ellipsis-v"/>
            </div>
            </div>
          </div>
        </div>
      </span>
      
      <span v-if=messageBody>
        <div class="CenterIt">
          <span class="highlightArea">
            <font-awesome-icon v-on:click.stop="back()" class="Icon"  icon="arrow-left"/>
          </span>
          <span class="highlightArea">
            <font-awesome-icon class="Icon" icon="archive"/> 
          </span>
          <span class="highlightArea">
            <font-awesome-icon class="Icon" icon="exclamation-circle" /> 
          </span>
          <span class="highlightArea">
            <font-awesome-icon class="Icon" icon="trash" /> 
          </span>
          <span class="highlightArea">
            <font-awesome-icon class="Icon" icon="envelope-open" /> 
          </span>
          <span class="highlightArea">
            <font-awesome-icon class="Icon" icon="clock" /> 
          </span>
          |
          <span class="highlightArea">
            <font-awesome-icon class="Icon" icon="arrow-circle-right" /> 
          </span>
          <span class="highlightArea">
            <font-awesome-icon class="Icon" icon="ellipsis-v"/>
          </span>
          <!-- <font-aweomse-icon class="Icon" icon="tag"/> -->
        </div>
      </span>
    </div>
    <!-- <button v-on:click="utilityToggle">Toggle</button> -->
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
.flexIcons {
  display: flex;
  flex-direction: row;
}
.item {
  width: 30px;
  height: 30px;
}
#spacing {
  float:left;
  padding: 4px;
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
  cursor: pointer;
}
.Icon:hover {
  /* background-color: darkgray;   */
}
.highlightArea {
  width: 30px;
  height: 30px;
  border-radius: 35px;
}
.highlightArea:hover {
  background-color: lightgray;
}
</style>

<script>
import eventBus from '../event_bus'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'UtilityBar',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      messageBody: false,
      checked: false,
    }
  },
  methods: {
    true() {
      this.messageBody = true;
    },
    false() {
      this.messageBody = false;
    },
    check() {
      this.checked = !this.checked;
    },
    back() {
      //Need to route it back to EmailList
      eventBus.$emit('MESSAGE_LIST');
    }
  },
  created() {
    eventBus.$on('ENTER_MESSAGE', this.true);
    eventBus.$on('MESSAGE_LIST', this.false)
  }
}
</script>
