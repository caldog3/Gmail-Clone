<template>
  <div class="sideBar">
    <button class="button" v-on:click.stop="composeShow()">
      <img src="./../assets/plus.png" class="d-inline-block align-top" alt="BV">
      &nbsp; &nbsp; Compose &nbsp; 
      </button>
    <!-- <b-modal v-model="composeShow">
      Test compose block
    </b-modal> -->

    <div class="options">
      <div v-bind:class="activeFolderClass('Inbox')" v-on:click="activateFolder('Inbox')">
        <div id="sidebarFlex" v-on:click="loadInbox()">
          <div>
            <font-awesome-icon style="color:white;" icon="inbox" />&emsp;  {{labels[0].folder}}
          </div>
          <div>
            <!-- trying to figure out how to determine the object that has the right label from up here in the html -->
            <p class="notificationPill" v-if="labels[0].unreadCount > 0">{{labels[0].unreadCount}}</p>
          </div>
        </div>
      </div>
      <div class="myFolder">
        <div id="sidebarFlex1">
          <div>
            <img src="./../assets/whiteLock.png">  
          </div>
          <div class="title">
            Private Messages
          </div>
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Starred')" v-on:click="starredHandle()">
        <div id="sidebarFlex">
          <div> 
             <font-awesome-icon style="color:white;" icon="star" />&emsp; {{labels[1].folder}}
          </div>
          <div>
            <p class="notificationPill" v-if="labels[1].unreadCount > 0">{{labels[1].unreadCount}}</p>
          </div>
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Snoozed')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="clock"/>&emsp;  Snoozed
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Sent')" v-on:click="sentHandle()">
        <div id="sidebarFlex">
          <div>
            <font-awesome-icon style="color:white;" icon="paper-plane" />&emsp;  Sent
          </div>
          <div>
            <p class="notificationPill" v-if="labels[3].unreadCount > 0">{{labels[3].unreadCount}}</p>
          </div>
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Drafts')" v-on:click="draftsHandle()">
        <div id="sidebarFlex">
          <div>
            <font-awesome-icon style="color:white;" icon="file"/>&emsp;  Drafts
          </div>
          <div>
            <p class="notificationPill" v-if="labels[4].unreadCount > 0">{{labels[4].unreadCount}}</p>
          </div>
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Important')">
        <div id="sidebarFlex">
          <div>
            <font-awesome-icon style="color:white;" icon="arrow-right" />&emsp;  Important
          </div>
          <div>
            <p class="notificationPill" v-if="labels[5].unreadCount > 0">{{labels[5].unreadCount}}</p>
          </div>  
        </div>
      </div>
      <div v-bind:class="activeFolderClass('All mail')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="envelope" />&emsp;  All Mail
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Spam')">
        <div id="sidebarFlex">
          <div>
            <font-awesome-icon style="color:white;" icon="exclamation-circle"/>&emsp;  Spam
          </div>
          <div>
            <p class="notificationPill" v-if="labels[7].unreadCount > 0">{{labels[7].unreadCount}}</p>
          </div>
        </div>
      </div>
      <div v-bind:class="activeFolderClass('Trash')">
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="trash" />&emsp;  Trash
        </div>
      </div>
      <div>
        <div class="notInbox">
          <font-awesome-icon style="color:white;" icon="cog" />&emsp;  Manage Labels
        </div>
      </div>


    </div>

  </div>

</template>

<style scoped>
.sideBar {
  float: left;
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
.options {
  color: white;
  text-shadow: .5px -1px 2px #333;
  margin-right: 10px;
  font-size: .9em;

}
.options > div {
  width: 100%;
  height: 35px;
  padding-left: 25px;
  border-radius: 0px 20px 20px 0px;
  cursor: pointer;
}
.options > div:hover {
  /* background: rgba(153, 153, 153, 0.4); */
  background: rgba(255, 255, 255, 0.4);
}
.activeFolder {
  background: rgba(255, 255, 255, 0.5);
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
#sidebarFlex1 {
  display: flex;
  flex-direction: row;
  padding-left: 0px;
  padding-right: 10px;
  text-shadow: none;
  height: 100%;
  padding-top: 7px;
}
#sidebarFlex1 img {
  width: 27px;
  height: 22px;
}
.title {
  padding-left: 12px;
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
      unreadCounts: [],
      viewFolder: "Inbox",
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
      console.log("IM MAKING IT HERE RIGHT");
      
      gapi.client.load('gmail', 'v1').then(() => {
        for (let j = 0; j < this.labels.length; j++) {
          var theFolder = this.labels[j].folder;
          // if (theFolder == "Inbox") {
          //   theFolder = "CATEGORY_PERSONAL";
          // }
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
      this.viewFolder = folder;
    },
    activeFolderClass(folder) {
      if (folder == this.viewFolder) {
        return "activeFolder";
      }
      else {return "inactiveFolder"}
    },
    composeShow() {
      eventBus.$emit("COMPOSE_OPEN");
    },
    loadInbox() {
      this.$router.push({ path: "/" });
    },
    loadDrafts() {
      //not sure how to route this properly yet
      this.$store.state.currentFolder = "DRAFT";
      this.$router.push({ path: "/Folder/DRAFTS/" });
    },
    loadSent() {
      this.$store.state.currentFolder = "SENT";
      this.$router.push({ path: "/Folder/SENT/" });
    },
    loadStarred() {
      this.$store.state.currentFolder = "STARRED";
      this.$router.push({ path: "/Folder/STARRED/" });
    },
    sentHandle() {
      this.loadSent();
      this.activateFolder("Sent");
    },
    draftsHandle() {
      this.loadDrafts();
      this.activateFolder("Drafts");
    },
    starredHandle() {
      this.loadStarred();
      this.activateFolder("Starred");
    },
  },
  computed: {

  },
  created() {
    eventBus.$on("UNREAD_COUNT", unreads => {
      // this.unreadCounts = unreads;
    })
    // getLabelsForUnread();
    getLabels();
    //Probably a much better way to do this
    eventBus.$on("CUSTOM_FOLDERS", customs => {
      for (let i = 0; i < customs.length; i+=1) {
        this.labels.push({folder: customs[i].name, unreadCount: 0, id: customs[i].id});
        console.log("Pushed" + customs[i]);
      }
      // time to call something to check all the unreadCounts
      this.unreadCount();
    })
    // this.unreadCount("CATEGORY_PERSONAL");
    // this.unreadCount("STARRED");
    // this.unreadCount("SENT");
    // this.unreadCount("DRAFT");
    // this.unreadCount("IMPORTANT");
    // this.unreadCount("SPAM");
  },

};
</script>