
/* eslint-disable */
<template>
  <div id="setWidth">
    <b-tabs>
      
      <b-tab v-on:click="updateCurrentFolder('PRIMARY')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:red;" icon="inbox" />&emsp; Primary 
            </div>
          </div>
        </template>
        <email-list labelId="PRIMARY"/>
      </b-tab>

      <b-tab v-on:click="updateCurrentFolder('SOCIAL')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:#297be6;" icon="users" />&emsp; Social 
            </div>
          </div>
        </template>
        <email-list labelId="SOCIAL"/>
      </b-tab>

      <b-tab v-on:click="updateCurrentFolder('PROMOTIONS')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <font-awesome-icon style="color:green;" icon="tag" />&emsp; Promotions
            </div>
          </div>
        </template>
        <email-list labelId="PROMOTIONS"/>
      </b-tab>

      <b-tab v-on:click="updateCurrentFolder('Private')">
        <template slot="title">
          <div class="backdrop">
            <div class="tabSize">
              <img src="./../assets/goldLock.png">
              &emsp; Private
            </div>
          </div>
        </template>
        <div class="allPrivate">
          <div class="privateInbox">
            <div class="line">
              <div class="img">
                <img src="./../assets/UserNitaEllis.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>Also, for each non-standard executable and testcase that clearly documents how it differs from the Program (independent of having been made by such Participant to </b>
                </div>
                <div class="timeName">
                  <div>Nita Ellis</div>
                  <div>Aug 13</div>
                </div>
              </div>
            </div>
            <div class="line">
              <div class="img">
                <img src="./../assets/UserAndrewGarrard.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>You should also announce your new status</b>
                </div>
                <div class="timeName">
                  <div>Andrew Garrard</div>
                  <div>Aug 12</div>
                </div>
              </div>
            </div>
            <div class="line">
              <div class="img">
                <img src="./../assets/UserTylerAmjed.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>We are a non-profit organization what you've given us is texty, we want sexy I think we need to start from scratch thanks for taking the time to make the website</b>
                </div>
                <div class="timeName">
                  <div>Ty Amjed</div>
                  <div>Aug 10</div>
                </div>
              </div>
            </div>     
            <div class="line">
              <div class="img">
                <img src="./../assets/UserKennethWoods.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>Can you lower the price for the website? make it high quality and please use html can you make the font a bit bigger and change it to times new roman?</b>
                </div>
                <div class="timeName">
                  <div>Ken Woods</div>
                  <div>Aug 10</div>
                </div>
              </div>
            </div>   
            <div class="line">
              <div class="img">
                <img src="./../assets/UserLaurenShay.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>If that Commercial Contributor in the hope that it becomes identical to those performance claims and warranties are such Commercial Contributor's responsibility alone. </b>
                </div>
                <div class="timeName">
                  <div>Lauren Shay</div>
                  <div>Aug 10</div>
                </div>
              </div>
            </div>     
            <div class="line">
              <div class="img">
                <img src="./../assets/UserAliceWalker.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>Even if your work under the terms of this section is intended to, or may choose any version of the standards mode test cases </b>
                </div>
                <div class="timeName">
                  <div>Alice</div>
                  <div>Aug 8</div>
                </div>
              </div>
            </div>   
            <div class="line">
              <div class="img">
                <img src="./../assets/UserRichardTillman.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>Remember, everything is the same or better you are lucky to even be doing this for us </b>
                </div>
                <div class="timeName">
                  <div>Rich Tillman</div>
                  <div>Aug 7</div>
                </div>
              </div>
            </div>  
            <div class="line">
              <div class="img">
                <img src="./../assets/UserJessicaDavis.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>We need to have a Come to Jesus meeting with Phil about his attitude put your feelers out. </b>
                </div>
                <div class="timeName">
                  <div>Jessie Davis</div>
                  <div>Aug 5</div>
                </div>
              </div>
            </div>  
            <div class="line">
              <div class="img">
                <img src="./../assets/UserMarkShaine.jpg">
              </div>
              <div class="snipTimeName">
                <div class="snip">
                  <b>You may charge a reasonable royalty and payment arrangement are not compelled to copy the source form of the Work</b>
                </div>
                <div class="timeName">
                  <div>Mark S</div>
                  <div>Aug 5</div>
                </div>
              </div>
            </div>  
          </div>
          <div class="selcted email">

          </div>
        </div>
      </b-tab>

    </b-tabs>
  </div>
</template>

<style scoped>
.img img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.img {
  margin: 4px;
}
.timeName {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.snip {
  overflow: hidden;
  white-space: nowrap;
  width: 633px;
  text-align: left;
}
.snipTimeName {
  display: flex;
  flex-direction: column;
}
.line {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.6); 
  margin: 4px 4px 0px 4px;
  padding: 5px;
}
.privateInbox {
  display: flex;
  flex-direction: column;
  width: 700px;
  margin-bottom: 4px;
}
.allPrivate {
  border: 10px solid white;
  /* border-radius: 3px 3px 0px 0px; */
  display: flex;
  flex-direction: row;
  
}




#setWidth {
  /* background: rgba(255, 255, 255, 0.6); */
  /* min-width: 600px; */
}
.backdrop {
  background-color: rgba(255, 255, 255, 0.8);

  margin-left: -1rem;
  margin-right: -1rem;
  margin-bottom: -0.55rem;
  /* margin-top: -0.55rem; */
  border-radius: 3px 3px 0px 0px;
}
.tabSize {
  width: 172px;
  height: 41px;
  line-height: 41px;
  text-align: center;
}
img {
  width: 25px;
  height: 20px;
  margin-bottom: 5px;
}
</style>

<script>
import EmailList from './EmailList';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { setTimeout } from 'timers';
import eventBus from '../event_bus';


export default {
  name: 'InboxList',
  components: {
    EmailList,
    FontAwesomeIcon
  },
  data() {
    return {
      labelId: '',
    }
  },
  methods: {
    updateCurrentFolder(tabFolder) {
      let previousFolder = this.$store.state.currentFolder;
      this.$store.state.currentFolder = tabFolder;
      console.log("IT has been set to: " + this.$store.state.currentFolder);
      //need to reset the previous folder back to its first page
      if(this.$store.state.currentPage !== 1) {
        this.$store.state.labelMessages[previousFolder] = [];
        if (previousFolder === "PRIMARY" || (previousFolder === "SOCIAL" || previousFolder === "PROMOTIONS")) {
          this.$store.dispatch("getListOfMessages", previousFolder);
        }
        else {
          this.$store.dispatch("getFolderListOfMessages", previousFolder);
        }
        this.$store.state.currentPage = 1;
      }
      // we have to reset the last page tokens because they no longer apply to the new label
      this.$store.state.labelLastPageTokens = [];
      if(tabFolder === "SOCIAL") {
        tabFolder = "CATEGORY_SOCIAL";
      }
      else if (tabFolder === "PROMOTIONS") {
        tabFolder = "CATEGORY_PROMOTIONS";
      }
      else if (tabFolder === "PRIMARY") {
        tabFolder = "INBOX";
      }
      eventBus.$emit("TOTAL_EMAIL_COUNT", tabFolder);
      // maybe trigger an update here for total emails in the utilityBar
    },
  },
  beforeCreate(){
    //MOVED TO LoadingScreen.vue Created
  },
  created(){
    console.log("INBOX LIST MOUNTED")
    setTimeout(() => {
      console.log("GetAttachments DISPATCHED")
      this.$store.dispatch("getAttachments");
    }, 1000);
    
  },
}
</script>