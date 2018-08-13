<template>
  <div class="displayFlex">
    <div class="sideBar">
      <button class="button" v-on:click.stop="composeShow()">
        <img src="./../assets/plus.png" class="d-inline-block align-top" alt="BV">
        &nbsp; &nbsp; Compose &nbsp;
        </button>
      <!-- <b-modal v-model="composeShow">
        Test compose block
      </b-modal> -->

      <div class="optionsA">

        <div v-bind:class="activeFolderClass('Inbox')" v-on:click="activateFolder('Inbox')">
          <div id="sidebarFlex" v-on:click="loadInbox()">
            <div>
              <font-awesome-icon style="color:black;" icon="inbox" />&emsp;  {{labels[0].folder}}
            </div>
            <div>
              <!-- trying to figure out how to determine the object that has the right label from up here in the html -->
              <p class="notificationPill" v-if="labels[0].unreadCount > 0">{{labels[0].unreadCount}}</p>
            </div>
          </div>
        </div>

        <div class="EMline">
          <div class="photo">
            <img src="./../assets/icons8-lock-26.png">
          </div>

          <div class="EM">
            Private Messages
          </div>

        </div>





        <div v-bind:class="activeFolderClass('Starred')" v-on:click="generalHandle('Starred')">
          <div id="sidebarFlex">
            <div>
              <font-awesome-icon style="color:black;" icon="star" />&emsp; {{labels[1].folder}}
            </div>
            <div>
              <p class="notificationPill" v-if="labels[1].unreadCount > 0">{{labels[1].unreadCount}}</p>
            </div>
          </div>
        </div>
        <div v-bind:class="activeFolderClass('Snoozed')">
          <div class="notInbox">
            <font-awesome-icon style="color:black;" icon="clock"/>&emsp;  Snoozed
          </div>
        </div>
        <div v-bind:class="activeFolderClass('Sent')" v-on:click="generalHandle('Sent')">
          <div id="sidebarFlex">
            <div>
              <font-awesome-icon style="color:black;" icon="paper-plane" />&emsp;  Sent
            </div>
            <div>
              <p class="notificationPill" v-if="labels[3].unreadCount > 0">{{labels[3].unreadCount}}</p>
            </div>
          </div>
        </div>
        <div v-bind:class="activeFolderClass('Drafts')" v-on:click="generalHandle('Drafts')">
          <div id="sidebarFlex">
            <div>
              <font-awesome-icon style="color:black;" icon="file"/>&emsp;  Drafts
            </div>
            <div>
              <p class="notificationPill" v-if="draftNum > 0">{{draftNum}}</p>
            </div>
          </div>
        </div>
        <div v-bind:class="activeFolderClass('Important')">
          <div id="sidebarFlex">
            <div>
              <font-awesome-icon style="color:black;" icon="arrow-right" />&emsp;  Important
            </div>
            <div>
              <p class="notificationPill" v-if="labels[5].unreadCount > 0">{{labels[5].unreadCount}}</p>
            </div>
          </div>
        </div>
        <div v-bind:class="activeFolderClass('All mail')">
          <div class="notInbox">
            <font-awesome-icon style="color:black;" icon="envelope" />&emsp;  All Mail
          </div>
        </div>
        <div v-bind:class="activeFolderClass('Spam')" v-on:click="generalHandle('Spam')">
          <div id="sidebarFlex">
            <div>
              <font-awesome-icon style="color:black;" icon="exclamation-circle"/>&emsp;  Spam
            </div>
            <div>
              <p class="notificationPill" v-if="labels[7].unreadCount > 0">{{labels[7].unreadCount}}</p>
            </div>
          </div>
        </div>
        <div v-bind:class="activeFolderClass('Trash')" v-on:click="generalHandle('Trash')">
          <div class="notInbox">
            <font-awesome-icon style="color:black;" icon="trash" />&emsp;  Trash
          </div>
        </div>
        <div v-for="label in labels.slice(9)" :key="label.folder">
          <div v-bind:class="activeFolderClass(label.id)" v-on:click="generalHandle(label.id)">
            <div id="sidebarFlex">
              <div>
                <font-awesome-icon style="color:black;" icon="folder" />&emsp;  {{label.folder}}
              </div>
              <div>
                <p class="notificationPill" v-if="label.unreadCount > 0">{{label.unreadCount}}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="notInbox">
            <font-awesome-icon style="color:black;" icon="cog" />&emsp;  Manage Labels
          </div>
        </div>


      </div>

    </div>

    <div class="encryptSide">
      <div class="filter">
        <font-awesome-icon icon="search" size="lg"/>
        &emsp; Filter 
      </div>
      <div class="Starred">
        <div class="lines">
          <div>Starred</div>
          <div class="entry">
            <div>Mabel West</div>
            <div>51 mins</div>
          </div>
          <div class="entry">
            <div>Forrest Evans</div>
            <div>4 days</div>
          </div>
        </div>
      </div>
      <div class="Recent">
        <div class="lines">
          <div>Recent</div>
          <div class="entry">
            <div><b>Jessica Davis</b></div>
            <div><b>5 mins</b></div>
          </div>
          <div class="entry">
            <div>Tim Carlson</div>
            <div>6 hours</div>
          </div>
          
          <div class="entry">
            <div>Everett Powers</div>
            <div>1 day</div>
          </div>
        </div>
      </div>
      <div class="Older">
        <div class="lines">
          <div>Older</div>
          <div class="entry">
            <div>Natalie Martin</div>
            <div>2 days</div>
          </div>
          <div class="entry">
            <div>Gina Mason</div>
            <div>2 days</div>
          </div>
          <div class="entry">
            <div>Carl Shelton</div>
            <div>5 days</div>
          </div>
          <div class="entry">
            <div>Rosalie Fox</div>
            <div>1 week</div>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<style scoped>

.filter {
  height: 35px;
  border-bottom: 1px solid lightgrey;
  margin: 4px 4px 25px 4px;
  float: left;
  text-align: left;
  line-height: 35px;
}

.lines {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgrey;
  margin: 2px 4px 25px 4px;
  text-align: left;
}

.lines div {
  height: 30px;
  margin: 0px 4px 2px 4px;
}
.entry {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}




.displayFlex {
  display: flex;
  flex-direction: row;
}


.encryptSide {
  width: 280px;
  /* display: none; */
  display: flex;
  flex-direction: column;
  margin-top: 116px;
  background-color: white;
}


.EM {
  text-align: left;
  margin-left: 18px;
  line-height: 35px;
}
.EMline {
  display: flex;
  flex-direction: row;
}
.EMline .photo {
  width: 20px;
  height: 20px;
  margin: 5px 0px 0px 1px;
}
.optionsA img {
  width: 20px;
  height: 20px;
}
.snippet {
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
}


.sideBar {
  float: left;
  /* display: none; */
  /* padding-right: -100px; */
}
img {
  width: 30px;
}
button {
  margin: 20px 90px 20px 5px;
  cursor: pointer;
  outline: none;
  background-color: white;
}
.button {
  padding: 13px 15px;
  border-radius: 40px;
  outline: none;
}
.optionsA {
  color: black;
  margin-right: 22px;
  font-size: .9em;
  width: 248px;
  height: 300px;
  overflow: hidden;
  border-bottom: solid;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.4);
}
.optionsA:hover {
  overflow-y: scroll;
  margin-right: 10px;
}
.optionsA > div {
  width: 100%;
  height: 35px;
  padding-left: 25px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}
.optionsA > div:hover {
  background: rgba(153, 153, 153, 0.4);
  /* background: rgba(255, 255, 255, 0.4); */
}
.activeFolder {
  background: rgba(153, 153, 153, 0.4);
}
/* .inactiveFolder {
  not sure
} */
#sidebarFlex {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5px;
  padding-right: 10px;
  text-shadow: none;
  height: 100%;
  padding-top: 7px;
}
.notInbox {
  float: left;
  padding-left: 5px;
  padding-right: 10px;
  text-shadow: none;
  height: 100%;
  padding-top: 8px;
}
#bootstrap-overrides {
  text-align: left;
}
.notificationPill {
  text-align: right;
}
</style>

<script>
import { getLabelsForUnread, getLabels } from "./../store-utility-files/gmail-api-calls";
import FontAwesomeIcon from "@fortawesome/vue-fontawesome";
import eventBus from "../event_bus";
import index from "../router/index.js"

export default {
  name: "MessageSidebar",
  components: {
    FontAwesomeIcon,
    eventBus
  },
  data() {
    return {
      draftNum: 0,
      unreadCounts: [],
      i: 0,
      labels: [
        {folder: "Inbox", unreadCount: 0},
        {folder: "Starred", unreadCount: -1},
        {folder: "Snoozed", unreadCount: -1},
        {folder: "Sent", unreadCount: 0},
        {folder: "Drafts", unreadCount: -1},
        {folder: "Important", unreadCount: -1     },
        {folder: "All Mail", unreadCount: -1},
        {folder: "Spam", unreadCount: 0},
        {folder: "Trash", unreadCount: 0},
        //all custom folders will push to the end of here
      ],
    };
  },
  methods: {
    unreadCount() {
      gapi.client.load('gmail', 'v1').then(() => {
        for (let j = 0; j < this.labels.length; j++) {
          var theFolder = this.labels[j].folder;
          if (theFolder == "Inbox") {
            theFolder = "CATEGORY_PERSONAL";
          }
          if(j <= 8) {
            theFolder = theFolder.toUpperCase();

            if (this.labels[j].unreadCount === 0) {
              gapi.client.gmail.users.labels.get({
              'userId': 'me',
              'id': theFolder,
              // 'q': 'category:primary',
              }).then((response) => {
                // console.log(response);
                let unreadCount = response.result.threadsUnread;
                this.labels[j].unreadCount = unreadCount;
              });
            }
          }
          else {
            gapi.client.gmail.users.labels.get({
              'userId': 'me',
              'id': this.labels[j].id,
              // 'q': 'category:primary',
              }).then((response) => {
                // console.log(response);
                let unreadCount = response.result.threadsUnread;
                this.labels[j].unreadCount = unreadCount;
              });
          }
        }
      });
    },
    // getLabels() {
    //   gapi.client.load('gmail', 'v1').then(() => {
    //     gapi.client.gmail.users.labels.list({
    //       'userId': 'me',
    //     }).then((response) => {
    //       console.log("Listing the labels");
    //       console.log(response);
    //     });
    //   });
    // },
    activateFolder(folder) {
      this.$store.state.viewFolder = folder;
      this.$store.state.currentPage = 1;
    },
    activeFolderClass(folder) {
      if (folder == this.$store.state.viewFolder) {
        return "activeFolder";
      }
      else {return "inactiveFolder"}
    },
    composeShow() {
      eventBus.$emit("COMPOSE_OPEN");
    },
    loadInbox() {
      this.$router.push({ path: "/" });

      // if we want to be reloading it to update it.
      // this.$store.state.labelMessages.PRIMARY = [];
      // this.$store.state.labelMessages.SOCIAL = [];
      // this.$store.state.labelMessages.PROMOTIONS = [];
      // this.$store.dispatch("getListOfMessages", "PRIMARY");
      // this.$store.dispatch("getListOfMessages", "SOCIAL");
      // this.$store.dispatch("getListOfMessages", "PROMOTIONS");
    },

    generalHandle(folder) {
      if (folder == "Spam") {
        let spamMessages = this.$store.getters.getLabelMessages["SPAM"];
        if(spamMessages === undefined) {
          this.$store.dispatch("getFolderListOfMessages", "SPAM");
        }
      }

      this.loadFolder(folder);
      this.activateFolder(folder);
    },
    loadFolder(folder) {
      this.$router.push({ path: "/Folder/" + folder.toUpperCase() + "/" });
      if (folder == "Drafts") {
        folder = "Draft";
      }
      console.log(folder);
      console.log("99999999");
      if(folder.includes("Label_")) {
        this.$store.state.currentFolder  = folder;
      }
      else {
        this.$store.state.currentFolder = folder.toUpperCase();
      }

    },
  },
  computed: {

  },
  created() {
    this.draftNum = this.$store.getters.getLabelMessages["DRAFT"].length;

    getLabels();
    //Probably a much better way to do this
    eventBus.$on("CUSTOM_FOLDERS", customs => {
      for (let i = 0; i < customs.length; i+=1) {
        this.labels.push({folder: customs[i].name, unreadCount: 0, id: customs[i].id});
        //maybe something can be added to include a parent folder
      }
      this.unreadCount();
      for (let j = 9; j < this.labels.length; j++) {
        let messages = this.$store.getters.getLabelMessages[this.labels[j].id];
        console.log(messages);
        if(messages === undefined){
          this.$store.dispatch("getFolderListOfMessages", this.labels[j].id);
        }
      }
    })
  },

};
</script>