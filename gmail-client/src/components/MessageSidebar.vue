<template>
  <div class="sideBar">
    <button class="button" v-on:click.stop="composeShow()">
      <img src="./../assets/plus.png" class="d-inline-block align-top" alt="BV">
      &nbsp; &nbsp; Compose &nbsp; 
    </button>


    <div class="optionsA">

      <div class="normalRow" v-bind:class="activeFolderClass('Inbox')" v-on:click="activateFolder('Inbox')">
        <div id="sidebarFlex" v-on:click="loadInbox()">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="inbox" />
          </div>
          <div>
            {{labels[0].folder}}
          </div>
          <!-- <div class="unreadCount">
            <p class="notificationPill" v-if="labels[0].unreadCount > 0">{{labels[0].unreadCount}}</p>
          </div> -->
        </div>
      </div>

      <div class="normalRow" v-bind:class="activeFolderClass('Starred')" v-on:click="generalHandle('Starred')">
        <div id="sidebarFlex">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="star" />
          </div>  
          <div>
            {{labels[1].folder}}
          </div>
          <div class="unreadCount">
            <p class="notificationPill" v-if="labels[1].unreadCount > 0">{{labels[1].unreadCount}}</p>
          </div>
        </div>
      </div>

<!-- I think we should just get rid of this Snoozed tab altogether -->
      <!-- <div v-bind:class="activeFolderClass('Snoozed')">
      <div class="normalRow" v-bind:class="activeFolderClass('Snoozed')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="clock"/>&emsp;  Snoozed
        </div>
      </div> -->

      <div class="normalRow" v-bind:class="activeFolderClass('Sent')" v-on:click="generalHandle('Sent')">
        <div id="sidebarFlex">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="paper-plane" />
          </div>
          <div>
            Sent
          </div>
          <div class="unreadCount">
            <p class="notificationPill" v-if="labels[3].unreadCount > 0">{{labels[3].unreadCount}}</p>
          </div>
        </div>
      </div>
      

      <div class="normalRow" v-bind:class="activeFolderClass('Drafts')" v-on:click="generalHandle('Drafts')">
        <div id="sidebarFlex">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="file"/>
          </div>
          <div>
            Drafts
          </div>
          <div class="unreadCount">
            <p class="notificationPill" v-if="draftNum > 0">{{draftNum}}</p>
          </div>
        </div>
      </div>

      <div class="normalRow" v-bind:class="activeFolderClass('Important')" v-on:click="generalHandle('Important')">
        <div id="sidebarFlex">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="arrow-right" />
          </div>
          <div>
            Important
          </div>
          <div class="unreadCount">
            <p class="notificationPill" v-if="labels[5].unreadCount > 0">{{labels[5].unreadCount}}</p>
          </div>  
        </div>
      </div>

      <div class="fullLength" v-for="label in customLabels" :key="label.folder">
        <div v-bind:class="activeFolderClass(label.id)" v-on:click="generalHandle(label.id)">
          <div id="sidebarFlexfull">
            <div class="Icon">
              <font-awesome-icon style="color:white;" icon="folder" />
            </div>
            <div>
              {{label.shortName}}
            </div>
            <div class="unreadCount">
              <p class="notificationPill" v-if="label.unreadCount > 0">{{label.unreadCount}}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="normalRow" v-bind:class="activeFolderClass('Spam')" v-on:click="generalHandle('Spam')">
        <div id="sidebarFlex">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="exclamation-circle"/>
          </div>
          <div>
            Spam
          </div>
          <div class="unreadCount">
            <p class="notificationPill" v-if="labels[7].unreadCount > 0">{{labels[7].unreadCount}}</p>
          </div>
        </div>
      </div>

      <div class="normalRow" v-bind:class="activeFolderClass('Trash')" v-on:click="generalHandle('Trash')">
        <div id="sidebarFlex">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="trash" />
          </div>
          <div>
            Trash
          </div>
        </div>
      </div>
      
      <div class="altRow">
        <div id="sidebarFlex">
          <div class="Icon">
            <font-awesome-icon style="color:white;" icon="cog" />
          </div>
          <div>
            Manage Labels
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<style scoped>
.sideBar {
  float: left;
  /* padding-right: -100px; */
}
img {
  width: 30px;
}
button {
  margin: 20px 90px 20px 5px;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: white;
}
.button {
  padding: 13px 15px;
  border-radius: 40px;
  outline: none;
  border: none;
  line-height: 28px;
}
.optionsA {
  color: white;
  text-shadow: .5px -1px 2px #333;
  /* margin-right: 22px; */
  font-size: .9em;
  width: 260px;
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
.normalRow {
  width: 253px;
  height: 35px;
  padding-left: 25px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}
.altRow {
  width: 253px;
  height: 35px;
  padding-left: 25px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}
.fullLength {
  padding-left: 0;
  border-radius: 0px 20px 20px 0px;
  height: 35px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
}
.normalRow:hover {
  /* background: rgba(153, 153, 153, 0.4); */
  background: rgba(255, 255, 255, 0.4);
}
.fullLength:hover {
  /* background: rgba(153, 153, 153, 0.4); */
  background: rgba(255, 255, 255, 0.4);
}
.activeFolder {
  background: rgba(255, 255, 255, 0.5);
}
.activeFolder:hover {
  background: rgba(255, 255, 255, 0.5);
}



#sidebarFlex {
  display: flex;
  flex-direction: row;
  padding-left: 5px;
  padding-right: 10px;
  text-shadow: none;
  height: 100%;
  padding-top: 7px;
}
.unreadCount {
  margin-left: auto;
}
#sidebarFlexfull {
  display: flex;
  flex-direction: row;
  padding-left: 31px;
  padding-right: 10px;
  text-shadow: none;
  padding-top: 7px;
}
.Icon {
  padding-right: 10px;
  width: 30px;
}
#bootstrap-overrides {
  text-align: left;
}
.notificationPill {
  text-align: right;
}
.activeFolder {
  height: 35px;
}
</style>

<script>
import { getLabelsForUnread, getLabels } from "./../store-utility-files/gmail-api-calls";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { mapGetters, mapActions } from 'vuex';
import { sortBy } from 'lodash';
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
        // a -1 value prevents it from displaying 
        {folder: "Inbox", unreadCount: 0},
        {folder: "Starred", unreadCount: -1},
        {folder: "Snoozed", unreadCount: -1},
        {folder: "Sent", unreadCount: 0},
        {folder: "Drafts", unreadCount: -1},
        {folder: "Important", unreadCount: -1},
        {folder: "All Mail", unreadCount: -1},
        {folder: "Spam", unreadCount: 0},
        {folder: "Trash", unreadCount: 0},
      ],
      customLabels: []
    };
  },
  methods: {
    ...mapGetters([
      'getLabelMessages'
    ]),
     ...mapActions([
      'getFolderListOfMessages',
      'getListOfDraftIds',
    ]),
    getFolderLabels(label){
      if(this.getLabelMessages[label] === undefined){
        this.getFolderListOfMessages(label);  
      }
    },
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
      this.$store.state.viewFolder = "Inbox";
      eventBus.$emit("TOTAL_EMAIL_COUNT", "Inbox");
      
      // if we want to be reloading it to update it.
      // this.$store.state.labelMessages.PRIMARY = [];
      // this.$store.state.labelMessages.SOCIAL = [];
      // this.$store.state.labelMessages.PROMOTIONS = [];
      // this.$store.dispatch("getListOfMessages", "PRIMARY");
      // this.$store.dispatch("getListOfMessages", "SOCIAL");
      // this.$store.dispatch("getListOfMessages", "PROMOTIONS");
    },

    generalHandle(folder) {
      const labelsToBeUpperCased = ["Starred", "Important", "Sent", "Spam", "Trash"];

      if(labelsToBeUpperCased.includes(folder)){
        this.getFolderLabels(folder.toUpperCase());
      } else if (folder === "Drafts"){
        this.getFolderLabels("DRAFT");
        this.getListOfDraftIds();
      } else if (folder !== "Inbox"){
        this.getFolderLabels(folder);
      }
      
      this.loadFolder(folder);
      this.activateFolder(folder);
    },
    loadFolder(folder) {
      this.$router.push({ path: "/Folder/" + folder.toUpperCase() + "/" });
      let previousFolder = this.$store.state.currentFolder;
      if (folder == "Drafts") {
        folder = "Draft";
      }
      if(folder.includes("Label_")) {
        this.$store.state.currentFolder  = folder;
      }
      else {
        this.$store.state.currentFolder = folder.toUpperCase();
      }
      console.log("IT has been set to: " + this.$store.state.currentFolder);
      console.log("THE PAGE: " + this.$store.state.currentPage);
      if(this.$store.state.currentPage != 1) {
        this.$store.state.labelMessages[previousFolder] = [];
        if (previousFolder === "PRIMARY" || (previousFolder === "SOCIAL" || previousFolder === "PROMOTIONS")) {
          this.$store.dispatch("getListOfMessages", previousFolder);
        }
        else {
          this.$store.dispatch("getFolderListOfMessages", previousFolder);
        }
        this.$store.state.currentPage = 1;
      }
      console.log(this.$store.state.currentPage);
      // we have to reset the last page tokens because they no longer apply to the new label
      this.$store.state.labelLastPageTokens = [];
      eventBus.$emit("TOTAL_EMAIL_COUNT", this.$store.state.currentFolder);
    },
  },
  computed: {

  },
  created() {
    if(this.$store.getters.getLabelMessages["DRAFT"] !== undefined){
      this.draftNum = this.$store.getters.getLabelMessages["DRAFT"].length;
    }

    getLabels();
    //Probably a much better way to do this
    eventBus.$on("CUSTOM_FOLDERS", customs => { //FIXME: sort alphabetically
      for (let i = 0; i < customs.length; i+=1) {
        let shortName = customs[i].name;
        if (shortName.includes("/")) {
          shortName = shortName.substring(shortName.indexOf("/") + 1);
        }
        let shortLength = 23;
        if (shortName.length > shortLength) {
          shortName = shortName.substring(0, shortLength-1);
          shortName += "..";
        }
        this.customLabels.push({folder: customs[i].name, unreadCount: 0, id: customs[i].id, shortName: shortName});
        //maybe something can be added to include a parent folder
      }
      this.unreadCount();
      this.customLabels = sortBy(this.customLabels, m => m.shortName);
    })
  },

};
</script>