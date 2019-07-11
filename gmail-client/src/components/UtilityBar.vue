<template>
  <div class="body">
    <div class="iconDiv">
      <div class="spacing">
        <div>

          <!-- just for sitting in an unchecked email list -->
          <span v-if="!messageBody">

            <div class="flexIcons">  <!-- this guy is having problems-->
              <div class="item">
                <label class="container">
                  <div class="highlightAreaCheck">
                    <input type="checkbox" @click="checkAllToggle()">
                    <span class="tooltiptext">Select</span>
                    <span class="checkmark"></span>
                  </div>
                </label>
              </div>
              <div class="firefoxOnlyCaret">
                <div class="highlightArea2" v-on:click="caretDropdownFunction()">
                  <div class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="caret-down"/></div>
                  <span class="tooltiptext">Select</span>
                  <div id="caretDropdown" class="dropdown-content">
                    <p>  All </p>
                    <hr>
                    <p> None </p>
                    <hr>
                    <p> Read </p>
                    <hr>
                    <p> Unread </p>
                    <hr>
                    <p> Starred </p>
                    <hr>
                    <p> Unstarred </p>
                  </div>
                </div>
              </div>

            
              <!-- with checkeditems -->
              <span v-if="checkedEmails">
                <div class="wrapper large">
                  <!-- <div class="item">
                    <div class="highlightArea">
                      <font-awesome-icon style="color:white;" class="Icon" icon="archive"/> 
                      <span class="tooltiptext">Archive</span>
                    </div>
                  </div> -->
                  <!-- <div class="item" v-on:click="areYouSure()"> -->
                  <!-- <div class="item" v-on:click="spammingSet()">
                    <div class="highlightArea">
                      <font-awesome-icon style="color:white;" class="Icon" icon="exclamation-circle" /> 
                      <span class="tooltiptext">Report Spam</span>
                    </div>
                  </div> -->

                  <div class="item" v-on:click="trashingSet()">
                    <div class="highlightArea">
                      <font-awesome-icon style="color:white;" class="Icon" icon="trash" />
                      <span class="tooltiptext">Delete</span> 
                    </div>
                  </div>

                  <div class="break">
                    |
                  </div>

                  <div class="item" v-on:click="unreadSet()">
                    <div class="highlightArea">
                      <font-awesome-icon style="color:white;" class="Icon" icon="envelope" /> 
                      <span class="tooltiptext">Mark as Unread</span>
                    </div>
                  </div>
                  
                  <div class="item" v-on:click="readSet()">
                    <div class="highlightArea">
                      <font-awesome-icon style="color:white;" class="Icon" icon="envelope-open" />
                      <span class="tooltiptext">Mark as Read</span>
                    </div>
                  </div>

                  <div class="break">
                    |
                  </div>

                  <!-- <div class="item">
                    <div class="highlightArea">
                      <font-awesome-icon style="color:white;" class="Icon" icon="arrow-circle-right" /> 
                      <span class="tooltiptext">Move to</span>
                    </div>
                  </div> -->

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

              <!-- this is for unchecked status after checkbox -->
              <span v-else>
                <div class="wrapper">
                  <div class="item1">
                    <div class="highlightArea" v-on:click="refreshing()">
                      <div>
                        <font-awesome-icon style="color:white;" class="Icon" icon="retweet"/>
                        <span class="tooltiptext">Refresh</span>
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
            </div>
          </span>


  
          <!-- inside a message body -->
          <span v-if=messageBody>
            <div class="CenterIt">
              <div v-on:click.stop="back()" class="item">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="arrow-left"/>
                  <span class="tooltiptext">Back to Inbox</span>
                </div>
              </div>

              <!-- <div class="item">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="archive"/> 
                  <span class="tooltiptext">Archive</span>
                </div>
              </div>

              <div class="item" v-on:click="spamming()">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="exclamation-circle" /> 
                  <span class="tooltiptext">Move to Spam</span>
                </div>
              </div> -->

              <div class="item" v-on:click="trashing()">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="trash" />
                  <span class="tooltiptext">Delete</span> 
                </div>
              </div>

              <div class="break">
                |
              </div>

              <div class="item" v-on:click="threadUnreadSet()">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="envelope" /> 
                  <span class="tooltiptext">Mark as Unread</span>
                </div>
              </div>              

              <div class="break">
                |
              </div>

              <!-- <div class="item">
                <div class="highlightArea">
                  <font-awesome-icon style="color:white;" class="Icon" icon="arrow-circle-right" /> 
                  <span class="tooltiptext">Move to</span>
                </div>
              </div> -->

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

            <!-- <div class="rightTopPad" v-if="(parseFloat(totalMessages.replace(/,/g, ''))) - 50 > (pageNum()) * 50">
              {{((pageNum()-1)*50)+1}}-{{pageNum() * 50}} of {{totalMessages}}
            </div>
            <div class="rightTopPad" v-else-if="totalMessages == 'many'">
              {{((pageNum()-1)*50)+1}}-{{pageNum() * 50}} of {{totalMessages}}
            </div>
            <div class="rightTopPad" v-else-if="totalMessages == 'unknown'">
              search results
            </div>
            <div class="rightTopPad" v-else>{{pageNum()}}-{{totalMessages}} of {{totalMessages}}</div> -->

            <div class="paddingNeeded" v-if="this.$store.state.currentPage > 1" v-on:click="lastPageLoad">
              <font-awesome-icon style="color:white;" class="Icon" icon="chevron-left"/>
              <span class="tooltiptext">Newer</span>
            </div>

            <div class="paddingNeeded" v-else>
              <font-awesome-icon style="color:white;" class="Icon" icon="chevron-left"/>
              <span class="tooltiptext">No Newer</span>
            </div>
            
            <div class="lessPadding" v-if="(parseFloat(totalMessages.replace(/,/g, ''))) - 50 > (pageNum()) * 50" v-on:click="nextPageLoad">
              <font-awesome-icon style="color:white;" class="Icon" icon="chevron-right"/>
              <span class="tooltiptext">Older</span>
            </div>
            <div class="lessPadding" v-else>
              <font-awesome-icon style="color:white;" class="Icon" icon="chevron-right"/>
              <span class="tooltiptext"> No Older</span>
            </div>

            <div class="firefoxonlyCog">
              <div class="item">
                <div class="highlightArea">
                  <div v-on:click="cogDropdownFunction()" class="dropbtn"><font-awesome-icon style="color:white;" class="Icon" icon="cog"/></div>
                  <span class="tooltiptext">Settings</span>
                  <div id="cogDropdown" class="cog dropdown-content">
                    <div class="dropdownEntry" @click="openSecurityModal">See Security Tutorial</div>
                    <hr>
                    <div class="dropdownEntry">Setting 2</div>
                    <hr>
                    <div class="dropdownEntry">Setting 3</div>
                    <hr>
                    <div class="dropdownEntry">Setting 4</div>
                    <hr>
                    <div class="dropdownEntry">Setting 5</div>
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



<script>
import eventBus from '../event_bus'
import { getNumberOfMessages } from "./../store-utility-files/gmail-api-calls";

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

export default {
  name: 'UtilityBar',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      messageBody: false,
      checkedEmails: false,
      checked: false,
      totalMessages: "50",
      check: false,
      refreshingFolder: "",
    }
  },
  methods: {
    refreshing() {
      let folder = this.$store.state.currentFolder;
      this.refreshingFolder = folder;
      console.log("refreshing", folder);
      
      this.$store.state.currentPage = 1;
      // this.$store.state.labelMessages[folder] = []; //shouldn't need this anymore
      console.log(folder);
      var refresh = false;
      if (folder === "PRIMARY" || folder === "SOCIAL" || folder === "PROMOTIONS") {
        let refresh = true;
        let label = folder;
        // this.$store.dispatch("getListOfMessages", label);// bool value is for refresh
      }
      else {
        // this.$store.dispatch("getFolderListOfMessages", folder);
      }
    },
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
      console.log("ViewFolder:");
      console.log(this.$store.state.currentFolder);
      let folder = this.$store.state.currentFolder;
      this.$store.state.labelMessages[folder] = [];
      this.$store.dispatch("getPageListOfMessages", folder);
      // not sure what the best strategy is here*
    },
    lastPageLoad() {
      eventBus.$emit("LAST_PAGE_LOAD");
      // *...or here
      let folder = this.$store.state.currentFolder;
      this.$store.state.labelMessages[folder] = [];
      this.$store.dispatch("getLastPageListOfMessages", folder);
    },
    spamming() {
      if (confirm("Are you sure you want to mark this as spam?")) {
        eventBus.$emit("SPAMMING_THREAD");
      }
    },
    spammingSet() {
      if (confirm("Are you sure you want to mark all these as spam?")) {
        eventBus.$emit("SPAMMING_CHECKED_THREADS");
      }
    },
    trashing() {
      if (confirm("Are you sure you want to trash this message?")) {
        eventBus.$emit("TRASHING_THREAD");
        console.log("Clicked the trash button");
        this.back();
      }
    },
    trashingSet() {
      if (confirm("Are you sure you want to trash this set of messages?")) {
      eventBus.$emit("TRASHING_CHECKED_THREADS");
      console.log("----------trashingSet--------------");
      }
    },
    unreadSet() {
      console.log("Marking set as unread");
      eventBus.$emit("UNREAD_SET");
      this.notChecked();
      //this.refreshing(); //if wanted
    },
    readSet() {
      console.log("Marking set as read");
      eventBus.$emit("READ_SET");
      this.notChecked();
      //this.refreshing(); //if wanted
    },
    threadUnreadSet(){
      // console.log("Marking email as read");
      // this emit almost works. for some reason it marks as unread 
      // every thread that has been opened in the current session.
      eventBus.$emit("MARK_THREAD_AS_UNREAD");
      this.back();
    },
    checking() {
      this.checkedEmails = true;
    },
    notChecked() {
      this.checkedEmails = false;
    },
    true() {
      this.messageBody = true;
    },
    false() {
      this.messageBody = false;
    },
    draft() {
      this.messageBody = true;
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
      // console.log("routing?");
    },
    markAllAsRead() {
      //route to EmailList probably and loop through all and if they are marked as unread, send to 
        // the markeAsRead method.  //That's my best guess anywayg
      eventBus.$emit("MARK_ALL_AS_READ");
    },
    /* When the user clicks on the button, 
    toggle between hiding and showing the dropdown content */
    ellipsesDropdownFunction() {
      // console.log("ellipses");
      document.getElementById("ellipsesDropdown").classList.toggle("show");
    },
    caretDropdownFunction() {
      // console.log("caret");
      document.getElementById("caretDropdown").classList.toggle("show");
    },
    cogDropdownFunction() { 
      // console.log("cog");
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
    },
    getNumberTotal(folder) {
      gapi.client.load('gmail', 'v1').then(() => {
        if (!folder.includes("Label_")) {
          folder = folder.toUpperCase();
        }
        var totalInboxEmailCount = 0;
        if (folder == "INBOX") {
          gapi.client.gmail.users.labels.get({
            userId: 'me',
            'id': "INBOX"
          }).then((response) => {
            totalInboxEmailCount = response.result.threadsTotal;

            gapi.client.gmail.users.labels.get({
              userId: 'me',
              'id': "CATEGORY_SOCIAL"
            }).then((response) => {
              totalInboxEmailCount = totalInboxEmailCount - response.result.threadsTotal;

              gapi.client.gmail.users.labels.get({
                userId: 'me',
                'id': "CATEGORY_PROMOTIONS"
              }).then((response) => {
                totalInboxEmailCount = totalInboxEmailCount - response.result.threadsTotal;
                totalInboxEmailCount = totalInboxEmailCount.toLocaleString('en', {useGrouping:true});
                this.$store.state.totalMessages = totalInboxEmailCount;
                this.totalMessages = totalInboxEmailCount;
              });    
            });  
          });          
        }
        else if (folder == "ALL_MAIL") {
          // gapi.client.gmail.users.labels.get({
          //   'userId': 'me',
          //   'q': '',
          // }).then((response) => {
          //   totalInboxEmailCount = response.result.threadsTotal;
          //   totalInboxEmailCount = totalInboxEmailCount.toLocaleString('en', {useGrouping:true});
          //   this.$store.state.totalMessages = totalInboxEmailCount;
          //   this.totalMessages = totalInboxEmailCount;
          // })
          this.$store.state.totalMessages = "many";
          this.totalMessages = "many";
        }
        else if (folder == "SEARCH"){
          // console.log("searching folder total update -------------------------");
          this.$store.state.totalMessages = "unknown";
          this.totalMessages = "unknown";
        }
        else {
          gapi.client.gmail.users.labels.get({
            'userId': 'me',
            'id': folder,
          }).then((response) => {
            totalInboxEmailCount = response.result.threadsTotal;
            totalInboxEmailCount = totalInboxEmailCount.toLocaleString('en', {useGrouping:true});
            this.$store.state.totalMessages = totalInboxEmailCount;
            this.totalMessages = totalInboxEmailCount;
          });
        }

      });
    },
    openSecurityModal() {
      eventBus.$emit("SHOW_INTRO_MODAL");
    }

  },
  created() {
    eventBus.$on("REFRESH", this.refreshing);
    eventBus.$on('CHECKED_MESSAGES', this.checking);
    eventBus.$on('UNCHECKED', this.notChecked);
    eventBus.$on('ENTER_DRAFT', this.draft);
    eventBus.$on('ENTER_MESSAGE', this.true);
    eventBus.$on('MESSAGE_LIST', this.false);
    eventBus.$on('TOTAL_EMAIL_COUNT', folder => {
      // this.getNumberTotal(folder);
    });
    // this.getNumberTotal(this.$store.state.viewFolder);
  },
}


</script>

<style scoped>
/* ----------------------BASIC STYLES---------------------- */
.body {
  position: relative;
  height: 40px;
  z-index: 1;
  border-bottom: 0px;
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
.item1 {
  position: relative;
  z-index: 5;
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 20px;
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
  position: fixed;
  opacity: 0.999;
  z-index: 999999999999999;
  width: 15px;
  height: 30px;
  border-radius: 5px;
  margin-right: 15px;
  cursor: pointer;
  left: 303px;
}
.highlightArea2:hover {
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
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
.paddingNeeded {
  margin-right: 30px;
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
  color: white;
}
input {
  margin-top: 7px;
}
button {
  float: right;
  margin-right: 20%;
}
.wrapper {
  display: flex;
  flex-direction: row;
}
.large {
  margin-left: 20px;
}



/* ----------------------STYLIZED CHECKBOX---------------------- */
.container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  /* top: 7px;
  left: 6px; */
  opacity: 0;
  cursor: pointer;
}
.highlightAreaCheck {
  width: 30px;
  height: 30px;
  border-radius: 35px;
  cursor: pointer; 
  position: absolute;
  left: 1px;
}
.highlightAreaCheck:hover {
  background-color: rgba(255, 255, 255, 0.7) !important;
}
.highlightAreaCheck .tooltiptext {
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: -25px;
  left: 27px;
  margin-left: -30px;
  font-size:x-small;
  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
/* Show the tooltip text when you mouse over the tooltip container */
.highlightAreaCheck:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 7px;
  left: 6px;
  height: 17px;
  width: 17px;
  background-color: rgba(255, 255, 255, 0.0); 
  border-color: white;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: rgba(255, 255, 255, 0.0); 
}
/* When the checkbox is checked, add a black background */
.container input:checked ~ .checkmark {
  background-color: white;
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}
/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid black;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

/* ----------------------DROP DOWN STYLE---------------------- */
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

/* ----------------------Tooltip text---------------------- */
.highlightArea .tooltiptext {
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: -25px;
  left: 25px;
  margin-left: -30px;
  font-size:x-small;
  white-space: nowrap;
  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
/* Show the tooltip text when you mouse over the tooltip container */
.highlightArea:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.highlightArea2 .tooltiptext {
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: -25px;
  left: 25px;
  margin-left: -30px;
  font-size:x-small;
  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
/* Show the tooltip text when you mouse over the tooltip container */
.highlightArea2:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.lessPadding .tooltiptext {
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: -25px;
  left: 150px;
  margin-left: -30px;
  font-size:x-small;
  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
/* Show the tooltip text when you mouse over the tooltip container */
.lessPadding:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}

.paddingNeeded .tooltiptext {
  visibility: hidden;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px;
  border-radius: 6px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: -25px;
  left: 110px;
  margin-left: -30px;
  font-size:x-small;
  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
/* Show the tooltip text when you mouse over the tooltip container */
.paddingNeeded:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}


@-moz-document url-prefix() { 
  .firefoxOnlyCaret {
    position: relative;
    z-index: 5;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  .firefoxonlyCog {
    position: relative;
    z-index: 5;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}




/* lets see end */
@media screen and (max-width : 950px) { 
  .rightTopPad {
    display: none;
  }
}
</style>
