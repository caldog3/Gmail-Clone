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
          <div>
            <div class="highlightArea item">
              <div v-on:click="myFunction()" class="dropbtn"><font-awesome-icon class="Icon" icon="ellipsis-v"/></div>
              <div id="myDropdown" class="dropdown-content">
                <p>Mark all as read</p>
                <hr>
                <p disabled>Select messages to see more actions</p>
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
              <div v-on:click="myFunction()" class="dropbtn"><font-awesome-icon class="Icon" icon="ellipsis-v"/></div>
              <div id="myDropdown" class="dropdown-content">
                <p>Mark as read</p>
                <hr>
                <p>Mark as important</p>
                <hr>
                <p>Add to tasks</p>
                <hr>
                <p>Add star</p>
                <hr>
                <p>Create Event</p>
                <hr>
                <p>Filter messages like these</p>
                <hr>
                <p>Mute</p>
              </div>  
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

/* lets see */
.dropbtn {
    /* background-color: #3498DB; */
    color: black;
    padding: 0px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    background-color: rgba(255, 0, 0, 0.0);
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown a:hover {background-color: #ddd;}

.show {display: block;}
/* lets see end */


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
    },
    ellipsisList() {
      console.log("routing?");
    },
    markAllAsRead() {
      console.log("marking once we figure out axios.post stuff");
    },
    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    myFunction() {
      console.log("entered the function");
      document.getElementById("myDropdown").classList.toggle("show");
    },

    // Close the dropdown if the user clicks outside of it
    window:onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

  },
  created() {
    eventBus.$on('ENTER_MESSAGE', this.true);
    eventBus.$on('MESSAGE_LIST', this.false)
  }
}
</script>
