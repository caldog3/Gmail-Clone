<template>
  <div class="body">
      <div class="iconDiv">
        <div class="spacing">

          <div>

            <span v-if=!messageBody>
              <div class="flexIcons">
                <div v-on:click="checkAll()" class="item">
                  <div class="highlightArea">
                    <div v-if=!checked>
                      <font-awesome-icon style="color:white;" class="Icon" icon="square" />
                    </div>
                    <div v-if=checked>
                      <font-awesome-icon style="color:white;" class="Icon" icon="check-square"/>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="highlightArea">
                    <div>
                      <font-awesome-icon style="color:white;" class="Icon" icon="retweet"/>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="highlightArea item">
                    <div v-on:click="myFunction()" class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="ellipsis-v"/></div>
                      <div id="myDropdown" class="dropdown-content">
                        <p>  Mark all as read </p>
                        <hr>
                        <div class="noHighlightDiv" disabled>Select messages to see more actions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </span>
      
              <span v-if=messageBody>
                <div class="CenterIt">
                  <div v-on:click.stop="back()" class="item">
                    <div class="highlightArea">
                      <font-awesome-icon style="color:white;" class="Icon" icon="arrow-left"/>
                    </div>
                  </div>
                <div class="item">
                  <div class="highlightArea">
                    <font-awesome-icon style="color:white;" class="Icon" icon="archive"/> 
                  </div>
                </div>
                <div class="item">
                  <div class="highlightArea">
                    <font-awesome-icon style="color:white;" class="Icon" icon="exclamation-circle" /> 
                  </div>
                </div>
                <div class="item">
                  <div class="highlightArea">
                    <font-awesome-icon style="color:white;" class="Icon" icon="trash" /> 
                  </div>
                </div>
                <div class="break">
                  |
                </div>
                <div class="item">
                  <div class="highlightArea">
                    <font-awesome-icon style="color:white;" class="Icon" icon="envelope-open" /> 
                </div>
              </div>
            
              <div class="item">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="clock" /> 
                </div>
              </div>
              <div class="break">
                |
              </div>
              <div class="item">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="arrow-circle-right" /> 
                </div>
              </div>
              <div class="item">
                <div class="highlightArea">
                  <div v-on:click="myFunction()" class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="ellipsis-v"/></div>
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
            </div>
          </span>

          
        </div>

        <div class="right-side-utility">
          <div class="flexIcons">
            
            <div class="rightTopPad">1-50 of {{totalMessages}}</div>

            <div class="paddingNeeded">
              <font-awesome-icon style="color:white;" class="Icon" icon="chevron-left"/>
            </div>

            <div class="lessPadding">
              <font-awesome-icon style="color:white;" class="Icon" icon="chevron-right"/>
            </div>

            <div>
              <div class="highlightArea1">
                <font-awesome-icon style="color:white;" class="Icon" icon="keyboard"/>
              </div>  
            </div>
            <div>
              <div class="highlightArea2">
                <font-awesome-icon style="color:white;" class="Icon" icon="caret-down"/>
              </div>
            </div>
            <div>
              <div class="highlightArea">
                <font-awesome-icon style="color:white;" class="Icon" icon="cog"/>
              </div>
            </div>
          </div>
        </div>


        </div>
      </div>

    <!-- <button v-on:click="utilityToggle">Toggle</button> -->
    <!-- <font-awesome-icon icon="angle-down" size="lg"/> -->
  
  </div>
</template>

<style scoped>

.body {
  height: 40px;
  border-bottom: 0px;
  color: white;
  width: 100%;
} 
.iconDiv {
  width: auto;
  height: 40px;
  margin-left: 270px;
}
.spacing {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
}
.flexIcons {
  display: flex;
  flex-direction: row;
  margin-left: 2px;
}
.flexIcons svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}
.item {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.Icon {
  display:inline-block;
  cursor: pointer;
}
.break {
  width: 30px;
  padding-top: 4px;
  cursor: default;
}
.highlightArea {
  width: 30px;
  height: 30px;
  border-radius: 35px;
}
.highlightArea:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.CenterIt {
  display: flex;
  flex-direction: row;
}
.CenterIt svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}
.right-side-utility {
  margin-right: 40px;
}

.paddingNeeded {
  padding-right: 30px;
}
.lessPadding {
  padding-right: 20px;
}
.rightTopPad {
  padding-right: 30px;
  padding-top: 5px;
}

input {
  float: left;
}
button {
  float: right;
  margin-right: 20%;
}
.highlightArea1 {
  width: 25px;
  height: 30px;
  border-radius: 5px;
}
.highlightArea1:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.highlightArea2 {
  width: 15px;
  height: 30px;
  border-radius: 5px;
  margin-right: 15px;
}
.highlightArea2:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
/* lets see */
.dropbtn {
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
  cursor: default;
}
#myDropdown {
  color: black;
}
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
.dropdown a:hover {background-color: #ddd;}
.show {display: block;}
myDropdown > p {
  padding: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-right: 40px;
  padding-left: 40px;
  text-align: left;
}
myDropdown > p:hover {background-color: #ddd;}

.noHighlightDiv {
  padding: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  cursor: default;
  width: 150px;
  padding-right: 40px;
  padding-left: 40px;
  text-align: left;
}
hr {
  margin: 0px;
}
/* lets see end */

</style>

<script>
import eventBus from '../event_bus'
import { getNumberOfMessages } from "./../store-utility-files/gmail-api-calls";

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
      totalMessages: '0',
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
    eventBus.$on('MESSAGE_LIST', this.false);
    eventBus.$on('TOTAL_EMAIL_COUNT', messageTotal => {
      console.log("Reached the email count receiver");
      messageTotal = messageTotal.toLocaleString('en', {useGrouping:true})
      this.totalMessages = messageTotal;
    });
    getNumberOfMessages();
  },
}
</script>
