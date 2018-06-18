<template>
  <div class="body">
    <div id="spacing">
      <span v-if=!messageBody>
        <div class="flexIcons">
          <div v-on:click="checkAll()" class="item">
            <div class="highlightArea">
            <div v-if=!checked>
              <font-awesome-icon class="Icon" icon="square" />
            </div>
            <div v-if=checked>
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
          <div v-on:click.stop="back()" class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon"  icon="arrow-left"/>
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon" icon="archive"/> 
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon" icon="exclamation-circle" /> 
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon" icon="trash" /> 
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon" icon="envelope-open" /> 
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon" icon="clock" /> 
            </div>
          </div>
          <div class="item">
            |
          </div>
          <div class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon" icon="arrow-circle-right" /> 
            </div>
          </div>
          <div class="item">
            <div class="highlightArea">
              <font-awesome-icon class="Icon" icon="ellipsis-v"/>
            </div>
          </div>
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

.flexIcons svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}

.CenterIt {
  display: flex;
  flex-direction: row;
}
.CenterIt svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}

.item {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
#spacing {
  float:left;
  padding: 4px;
  padding-left: 0px;
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
    checkAll() {
      this.checked = !this.checked;
      eventBus.$emit('CHECK_ALL');
    },
    back() {
      //Need to route it back to EmailList
      eventBus.$emit('MESSAGE_LIST');
      this.$router.push({ path: '/' });
    }
  },
  created() {
    eventBus.$on('ENTER_MESSAGE', this.true);
    eventBus.$on('MESSAGE_LIST', this.false)
  }
}
</script>
