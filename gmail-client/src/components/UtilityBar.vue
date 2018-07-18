<template>
  <div class="body">
      <div class="iconDiv">
        <div class="spacing">
          <div>
            <span v-if=!messageBody>
              <div class="flexIcons">
                <!-- <div v-on:click="checkAll(this)" class="item"> -->
                <div class="item">
                  <div class="highlightArea">
                    <input type="checkbox" @click="checkAllToggle()">
                  </div>
                </div>
                <div class="highlightArea2" v-on:click="caretDropdownFunction()">
                  <div class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="caret-down"/></div>
                  <div id="caretDropdown" class="dropdown-content">
                    <p>  Mark all as read </p>
                    <hr>
                    <div class="noHighlightDiv" disabled>Select messages to see more actions</div>
                  </div>
                </div>
                <div class="item">
                  <div class="highlightArea">
                    <div>
                      <font-awesome-icon style="color:white;" class="Icon" icon="retweet"/>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="highlightArea" v-on:click="ellipsesDropdownFunction()">
                    <div class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="ellipsis-v"/></div>
                      <div id="ellipsesDropdown" class="dropdown-content">
                        <p v-on:click="markAllAsRead()">  Mark all as read </p>
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
                <div class="highlightArea" v-on:click="ellipsesDropdownFunction()" >
                  <div  class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="ellipsis-v"/></div>
                  <div id="ellipsesDropdown" class="dropdown-content">
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
            
            <div class="rightTopPad" v-if="(parseFloat(totalMessages.replace(/,/g, ''))) - 50 > (pageNum()) * 50">
              {{((pageNum()-1)*50)+1}}-{{pageNum() * 50}} of {{totalMessages}}
            </div>
            <div class="rightTopPad" v-else>{{pageNum()}}-{{totalMessages}} of {{totalMessages}}</div>

            <div class="paddingNeeded" v-on:click="lastPageLoad">
              <font-awesome-icon style="color:white;" class="Icon" icon="chevron-left"/>
            </div>
            
            <div class="lessPadding" v-on:click="nextPageLoad">
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
              <div class="item">
                <div class="highlightArea">
                  <div v-on:click="cogDropdownFunction()" class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="cog"/></div>
                  <div id="cogDropdown" class="cog dropdown-content">
                    <div class="dropdownEntry">
                      <b-btn v-b-modal.modal1>Change Theme</b-btn>
                      <!-- Modal Component -->
                      <b-modal id="modal1" title="Change Theme">
                        <!-- <div v-for="background in backgrounds"> -->
                        <!-- </div> -->
                      </b-modal>
                    </div>
                    <hr>
                    <div class="dropdownEntry">Some kind of setting</div>
                    <hr>
                    <div class="dropdownEntry">Some kind of setting</div>
                    <hr>
                    <div class="dropdownEntry">Some kind of setting</div>
                    <hr>
                    <div class="dropdownEntry">Some kind of setting</div>
                    <hr>
                    <div class="dropdownEntry">Some kind of setting</div>
                </div> 
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>

  </div>
</template>

<style scoped>
.body {
  position: relative;
  height: 40px;
  z-index: 1;
  border-bottom: 0px;
  color: white;
  background-color: rgba(255, 255, 255, 0.0);
  width: 100%;
} 
.iconDiv {
  position: relative;
  z-index: 2;
  width: auto;
  height: 40px;
  margin-left: 270px;
}
.spacing {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  margin-bottom: 5px;
}
.flexIcons {
  position: relative;
  z-index: 4;
  display: flex;
  flex-direction: row;
  margin-left: 8px;
}
.flexIcons svg:not(:root).svg-inline--fa {
  margin-top: 7px;
}
.item {
  position: relative;
  z-index: 5;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.Icon {
  display:inline-block;
  cursor: pointer;
  z-index: -1;
  position: relative;
}
.break {
  width: 30px;
  padding-top: 4px;
  cursor: default;
}
.highlightArea {
  position: fixed;
  opacity: 0.999;
  z-index: 999999999999999;
  width: 30px;
  height: 30px;
  border-radius: 35px;
}
.highlightArea:hover {
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 999999999999999;
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
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}

.paddingNeeded {
  padding-right: 30px;
  cursor: pointer;
}
.lessPadding {
  padding-right: 20px;
  cursor: pointer;
}
.rightTopPad {
  padding-right: 30px;
  padding-top: 5px;
  font-size: .9em;
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
  cursor: pointer;
}
.highlightArea1:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
.highlightArea2 {
  width: 15px;
  height: 30px;
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;
}
.highlightArea2:hover {
  background-color: rgba(255, 255, 255, 0.5);
}
/* lets see */
.dropbtn {
  position: relative;
  z-index: -345;
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
  width: 260px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  cursor: default;
}
.cog {
  right: 1px;
  top: 30px;
}
#ellipsesDropdown {
  color: black;
}
#cogDropdown {
  color: black;
}
#caretDropdown {
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
p {
  padding: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-right: 40px;
  padding-left: 40px;
  text-align: left;
}
p:hover {background-color: #ddd;}
.dropdownEntry {
  padding: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  padding-right: 40px;
  padding-left: 40px;
  text-align: left;
  height: 32px;
}
.dropdownEntry:hover {background-color: #ddd;}
.btn:not(:disabled):not(.disabled) {
  background-color: rgba(0,0,0,0.0);
  color: black;
  border: none;
  padding: 0px;
  margin: auto;
}
.noHighlightDiv {
  padding: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
  cursor: default;
  width: 250px;
  height: 50px;
  padding-right: 40px;
  padding-left: 40px;
  text-align: left;
}
hr {
  margin: 0px;
}
/* lets see end */
@media screen and (max-width : 950px) { 
  .rightTopPad {
    display: none;
  }
}
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
      totalMessages: '50',
      check: false,
    }
  },
  methods: {
    pageNum() {
      return this.$store.state.currentPage;
    },
    checkAllToggle() {
      this.check = !this.check;
      this.checkAll(this.check);
    },
    nextPageLoad() {
      eventBus.$emit("NEXT_PAGE_LOAD");
      console.log(this.$store.state.labelMessages);
      //We'll have to switch it to be more universal 
      // and store which page of 50 we're currently on (it resets if you switch tabs though in real gmail)
      this.$store.state.labelMessages.PRIMARY = [];
      this.$store.dispatch("getPageListOfMessages", "PRIMARY");
      // not sure what the best strategy is here*
    },
    lastPageLoad() {
      eventBus.$emit("LAST_PAGE_LOAD");
      // *...or here
      this.$store.state.labelMessages.PRIMARY = [];
      this.$store.dispatch("getLastPageListOfMessages", "PRIMARY");
    },
    true() {
      this.messageBody = true;
    },
    false() {
      this.messageBody = false;
    },
    checkAll(source) {
      this.checked = !this.checked;
      eventBus.$emit('CHECK_ALL', source);
    },
    back() {
      //Need to route it back to EmailList
      eventBus.$emit('MESSAGE_LIST');
      this.$router.go(-1);
    },
    ellipsisList() {
      console.log("routing?");
    },
    markAllAsRead() {
      //route to EmailList probably and loop through all and if they are marked as unread, send to 
        // the markeAsRead method.  //That's my best guess anywayg
      eventBus.$emit("MARK_ALL_AS_READ");
    },
    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    ellipsesDropdownFunction() {
      document.getElementById("ellipsesDropdown").classList.toggle("show");
    },
    caretDropdownFunction() {
      document.getElementById("caretDropdown").classList.toggle("show");
    },
    cogDropdownFunction() { 
      document.getElementById("cogDropdown").classList.toggle("show");
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
      messageTotal = messageTotal.toLocaleString('en', {useGrouping:true})
      this.totalMessages = messageTotal;
    });
    getNumberOfMessages();
  },
}


</script>
