
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
          <div class="top">
            <div class="topBar">
              <div class="newMail">
                <font-awesome-icon style="color:white;" class="Icon" icon="envelope" /> <b>New private message</b>
              </div>
            </div>
            <div class="allPrivate">
              <div class="privateInbox">
                <div class="line">
                  <div class="img">
                    <img src="./../assets/UserNitaEllis.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>Non-standard executable</b>
                    </div>
                    <div class="timeName">
                      <div>Nita Ellis</div>
                      <div>expires Aug 13</div>
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
                      <div>expires Aug 12</div>
                    </div>
                  </div>
                </div>
                <div class="line">
                  <div class="img">
                    <img src="./../assets/UserTylerAmjed.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>Non-profit organization</b>
                    </div>
                    <div class="timeName">
                      <div>Ty Amjed</div>
                      <div>expires Aug 10</div>
                    </div>
                  </div>
                </div>     
                <div class="line">
                  <div class="img">
                    <img src="./../assets/UserKennethWoods.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>High Quality</b>
                    </div>
                    <div class="timeName">
                      <div>Ken Woods</div>
                      <div>expires Aug 10</div>
                    </div>
                  </div>
                </div>   
                <div class="line2">
                  <div class="img">
                    <img src="./../assets/UserLaurenShay.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>Performance Claims</b>
                    </div>
                    <div class="timeName">
                      <div>Lauren Shay</div>
                      <div>expires Aug 10</div>
                    </div>
                  </div>
                </div>     
                <div class="line">
                  <div class="img">
                    <img src="./../assets/UserAliceWalker.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>Terms of this section </b>
                    </div>
                    <div class="timeName">
                      <div>Alice</div>
                      <div>expires Aug 8</div>
                    </div>
                  </div>
                </div>   
                <div class="line">
                  <div class="img">
                    <img src="./../assets/UserRichardTillman.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>Paperword</b>
                    </div>
                    <div class="timeName">
                      <div>Rich Tillman</div>
                      <div>expires Aug 7</div>
                    </div>
                  </div>
                </div>  
                <div class="line">
                  <div class="img">
                    <img src="./../assets/UserJessicaDavis.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>Come to Jesus</b>
                    </div>
                    <div class="timeName">
                      <div>Jessie Davis</div>
                      <div>expires Aug 5</div>
                    </div>
                  </div>
                </div>  
                <div class="line">
                  <div class="img">
                    <img src="./../assets/UserMarkShaine.jpg">
                  </div>
                  <div class="snipTimeName">
                    <div class="snip">
                      <b>Royalty and payment arrangement</b>
                    </div>
                    <div class="timeName">
                      <div>Mark S</div>
                      <div>expires Aug 5</div>
                    </div>
                  </div>
                </div>  
              </div>
              <div class="selctedemail">
                <div class="unselected">
                  <div class="memo">
                    <b>No email selected </b>
                  </div>
                 
                </div>
                <div class="selected">
                  <div class="line1">
                    <div class="img">
                      <img src="./../assets/UserLaurenShay.jpg">
                    </div>
                    <div class="flexGrow">
                      <div class="snipTimeName">
                        <div class="snip1">
                          <b>Performance Claims</b>
                        </div>
                        <div class="timeName">
                          <div>Lauren Shay</div>
                          <div>expires Aug 10</div>
                        </div>
                      </div>
                    </div>
                  </div> 
                  <div class="theRest">
                    <p>Hey, Larry</p>
                    <p>
                      Ownership. Subject to the public, the best way to achieve your goal while meeting these conditions, then read the document `cfgguide.tex' and `modguide.tex' in the page itself, they should generally be preserved by re-users. Copyleft/Share Alike: If you develop a new program, and you have found elsewhere or that Derived Work can only do in order to preserve the integrity of the Work prove defective, you assume the cost of developing and maintaining multi-platform application software.
                    </p>
                    <p>
                      For suppliers: In-depth testing increases customer satisfaction and keeps development and support it yourself. Derived Works distributed in conjunction with the Derived Program is void, and will automatically terminate at the time of people involved, and so on. License are distributed by Motosoto.Com B.V.
                    </p>
                    <br>
                    <p>Lauren</p>
                  </div>
                </div>
                <div class="compose">
                  <div class="to">
                    To
                  </div>
                  <div class="subject">
                    Subject
                  </div>
                  <div class="mesBody">

                  </div>
                </div>
              </div>
            </div>
          </div>
      </b-tab>

    </b-tabs>
  </div>
</template>

<style scoped>
.to {
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  border-bottom: 2px solid grey;
  width: 100%;
}
.subject {
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  border-bottom: 2px solid grey;
  width: 100%;
}
.mesBody {
  flex-basis: 0;
  flex-grow: 1;
  width: 100%;
}
.compose {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  display: none;
  /* display: flex; */
  flex-direction: column;
  padding: 4px;
  text-align: left;
}
p {
  margin-bottom: 9px;
  text-align: left;
}
.theRest {
  height: 532px;
  margin-top: 4px;
  background-color: rgba(255, 255, 255, 0.8); 
  padding: 20px;
}
.flexGrow {
  flex-basis: 0;
  flex-grow: 1;
}
.selected {
  display: flex;
  flex-direction: column;
  display: none;
}
.snip1 {
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  width: 100%;
}
.line1 {
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.8); 
  padding: 5px;
}
.memo {
  padding-top: 100px;
}
.unselected {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  /* display: none; */
}
.selctedemail {
  height: 607px;
  width: 100%;
  padding: 4px 4px 4px 0px;
  flex-basis: 0;
  flex-grow: 1;
  /* background: rgba(255, 255, 255, 0.6);  */
}
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
.line2 {
  display: flex;
  flex-direction: row;
  /* background-color: rgba(255, 255, 255, 0.8); 
  margin: 4px 0px 0px 4px; */
  
  background-color: rgba(255, 255, 255, 0.6); 
  margin: 4px 4px 0px 4px;

  padding: 5px;
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
  height: auto;
}
.allPrivate {
  /* border-radius: 3px 3px 0px 0px; */
  display: flex;
  flex-direction: row;
  
}
.newMail {
  float: right;
  margin: 8px;
}
.topBar {
  height: 40px;
  background-color: rgba(255, 255, 255, 0.6); 
  margin: 4px 4px 0px 4px;
  float: right;
}
.top {
  display: flex;
  flex-direction: column;
  border-width: 10px;
  border-style: solid;
  border-image: linear-gradient( rgb(255, 255, 255), rgb(255, 255, 255, 0.3), rgb(255, 255, 255, 0.0)) 1 20%
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