<template>
 <div>
    <div class="notExpanded" v-if="notExpanded"  v-on:click="expand()"> <!--need a way to check if it is the second to last email in list -->
        <div class="flexboxSubject">
          <div class="leftAlign">
            <hr>
            <!-- last person that the message was from (that wasn't the user) -->
            <b>{{message.from}}</b>
          </div>
          <div class="rightAlign shift-down">
            <div class="flexRight">
              <span>{{message.time}} ({{timeAgo}})</span>
              <!-- need to fix the styling here FIXME -->
              <div v-on:click.stop>
                <div class="starBound">
                  <div class="theRestoftheTime">
                    <span class="highlightArea">
                      <input class="star" v-on:click="starredLabelToggle(message)" type="checkbox" :checked="message.starred" title="bookmark page">
                    </span> 
                  </div>
                  <div class="firefoxOnly">
                    <input id="ffstar"  type="checkbox" v-on:click="starredLabelToggle(message)" :checked="message.starred" title="bookmark page">
                    <label for="ffstar" class="notchecked">&#X2606;</label>
                    <label for="ffstar" style="color:gold" class="checked">&#X2605;</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="overflow center">
          <!-- This needs to be the last message's snippet not the first... -->
          <div v-html="message.snippet"></div>
        </div>
        <div v-if="message.messageExpiryUnixTime && !messageExpired" class="messageExpiry rightAlign">
            <small><b>{{ timeToMessageExpiry }}</b></small>
          </div>    
      </div>

    <div class="expandedBody" v-else>
      <div class="flexboxSubject cursorHover" v-on:click="unexpand()">
        <div class="leftAlign">
          <hr>
          <b>{{message.detailedFrom}}</b>
        </div>
        <div class="rightAlign shift-down">
          <div class="flexRight">
              <div>
                {{message.time}} ({{ timeAgo }})
              </div>
              <div class="starBound" v-on:click.stop>
                <div class="theRestoftheTime">
                  <span class="highlightArea">
                    <input class="star" v-on:click="starredLabelToggle(message)" type="checkbox" :checked="message.starred" title="bookmark page">
                  </span> 
                </div>
                <div class="firefoxOnly">
                  <input id="ffstar"  type="checkbox" v-on:click="starredLabelToggle(message)" :checked="message.starred" title="bookmark page">
                  <label for="ffstar" class="notchecked">&#X2606;</label>
                  <label for="ffstar" style="color:gold" class="checked">&#X2605;</label>
                </div>
              </div>
              <div v-on:click.stop>
                <font-awesome-icon class="Icon" icon="reply" />
              </div>
              <div v-on:click.stop>
                <font-awesome-icon class="Icon" icon="ellipsis-v" />
              </div>
          </div>
        </div>
      </div>
      
      <div class="leftAlign">
        <div>
          <div class="recipients">to {{message.to | getFirstNames}}</div>
          <i class="down"></i>
          <div v-if="message.messageExpiryUnixTime && !messageExpired" class="messageExpiry rightAlign">
            <small><b>{{ timeToMessageExpiry }}</b></small>
          </div>
        </div>
        <div v-if="message.messageExpiryUnixTime">
          {{ timeToMessageExpiry }}
        </div>
        <div class="passwordInfo" v-if="unlocked && realPassword!==''">
          <font-awesome-icon style="color:black;" class="Icon" icon="unlock" />
          Message Unlocked
        </div>
        <div class="passwordInfo" v-if="isEncrypted">
          <font-awesome-icon style="color:black;" class="Icon" icon="unlock" />
          Message Decrypted
        </div>
        <template v-if="!messageExpired && unlocked">
          <div v-html="$options.filters.highlightUrls(message.body)" class=""></div>

          <div v-if="images.length > 0" >
            <v-gallery :images="images" :dark="true"></v-gallery>
          </div>

          <div v-if="hasAttachment" >
            <p><b>Attachments:</b></p>
            <div v-for="(attach, index) in attachmentArray" :key="attach.url">
              <div v-if="attach.url.includes('application/pdf')">
                <template v-if="!attach.url.includes('null')">
                  <button @click="openModal(index)">{{ attach.filename }}</button>
                </template>
                <sweet-modal modal-theme="dark" overlay-theme="dark" ref="modal" width="80%">
                  <object :data="attach.url" :name="attach.filename" width="80%" height="800"></object>
                </sweet-modal>
              </div>
              <div v-else>
                <!-- <img :src="attach.url" :name="attach.fileName" /> -->
                <a :href="attach.url" @click="downloadImg(attach.url)">
                  <img class="attachmentView" :src="attach.url" :name="attach.fileName" />
                  {{ attach.filename }}
                </a>
              </div>
              <br>
            </div>
          </div>
        </template>

        <template v-else-if="messageExpired">
          <div style="color: red"> &lt;Message timed out&gt;</div>
        </template>        
        
        <template v-else-if="!unlocked">
          <!-- password stuff -->
          <span class="passwordInfo"> 
            <font-awesome-icon style="color:black;" class="Icon" icon="lock" />
            This message is password protected. To access this content,
            please request the password from the sender and enter it below.
          </span>
          <br>
          <input type="enter" class="password" v-model="checkPassword" placeholder="Password" id="checkPassword">
          <button @click="enterPassword">Unlock</button>
        </template>
      </div>
      
    </div>
 </div>
</template>

<script>
import { markAsStarred, unMarkAsStarred } from './../store-utility-files/gmail-api-calls';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { SweetModal } from 'sweet-modal-vue';
import linkifyString from 'linkifyjs/string';
import linkifyHtml from 'linkifyjs/html';
import timeago from 'epoch-timeago';
import moment from "moment";
import isHtml from 'is-html';
import { setInterval, clearInterval, setTimeout } from 'timers';
import base64url from 'base64url';


export default {
  name: 'MessageBody',
  props: ['message', 'isLastMessage'],
  components: {
    FontAwesomeIcon,
    SweetModal,
  },
  data() {
    return {
      timeAgo: "...",
      notExpanded: false,
      attachmentsFetched: false,
      currentUnixTime: this.getCurrentUnixTime(),
      messageExpired: false,
      timeToMessageExpiry: "",
      hasAttachment: false,
      attachmentArray: [],

      unlocked: true,
      checkPassword: '',
      realPassword: '',
      isEncrypted: false,
    };
  },
  filters: {
    getFirstNames(users) {
      const usersArray = users.split(",");

      return usersArray.map((person) => {
        if(person.indexOf("<") >= 0){
          if(person.charAt(0) === " " || person.charAt(0) === '\"'){
            const newPerson = person.substr(1);
            if (newPerson.charAt(0) === '"'){
              return newPerson.substr(1, newPerson.indexOf(" "));
            }
            return newPerson.substr(0, newPerson.indexOf(" "));
          }
          return person.substr(0, person.indexOf(" "));
        }

        return person.substr(0, person.indexOf("@"));
      }).toString();
    },
    highlightUrls(messageBody) {
      messageBody = this.deletePreviousMessageBodies(messageBody);
      
      if(isHtml(messageBody)){
        const hyperlinkedHTML = linkifyHtml(messageBody, {});

        //Case where the HTML couldn't be formatted by Linkify.js (HTML already has links enabled)
        if(hyperlinkedHTML.length < messageBody.length){
          return messageBody;
        }
        return hyperlinkedHTML;
      } else if(messageBody !== undefined) {
        return linkifyString(messageBody, {});
      } else {
        return messageBody;
      }
    },
    deletePreviousMessageBodies(messageBody){
      const replyRegex = /On[\s\S]+<[\s\S]+> wrote:/g  //FIXME is this correct Ammon?
      const index = messageBody.search(replyRegex); // this .search breaks sometimes
      if (index !== -1) {
        messageBody = messageBody.substring(0, index);
      }
      
      return messageBody;
    },
  },
  computed: {
    attachments(){
      const attachmentIds = this.$store.getters.getAttachments;
      return this.message.attachmentIds === undefined ? [] :
      this.message.attachmentIds.map((id) => {
        if (id !== undefined){
          const attachment = attachmentIds[id.attachmentId];
          if (attachment !== undefined){
            const mimeType = attachment.mimeType;
            if (!mimeType.includes("image") && !mimeType.includes("text")){
              return {
                url: `data:${mimeType};base64,${attachment.data}`,
                filename: id.filename
              };
            }
          }
        }
      }).filter(image => image !== undefined);
    },
    images(){
      const attachmentIds = this.$store.getters.getAttachments;
      return this.message.attachmentIds === undefined ? [] :
      this.message.attachmentIds.map((id) => {
        if (id !== undefined){
          const attachment = attachmentIds[id.attachmentId];
          if (attachment !== undefined){
            let mimeType = attachment.mimeType;
            if (mimeType.includes("image") || mimeType.includes("text")){
            // An attempt to display edge-case email. Check getMessageContent().
            
            // if (mimeType.includes("text")){
            //   mimeType = "image/png"
            // }
              return {
                url: `data:${mimeType};base64,${attachment.data}`,
                title: id.filename
              };
            }
          }  
        }
      }).filter(image => image !== undefined);
    },
  },
  methods: {
    enterPassword() {
      if (this.checkPassword === this.realPassword) {
        this.unlocked = true;
      }
    },
    expand() {
      this.notExpanded = false;

      if (!this.attachmentsFetched){
        this.$store.dispatch("getAttachments", this.message.attachmentIds);
        this.attachmentsFetched = true;
      }
    },
    unexpand() {
      this.notExpanded = true;
    },
    getCurrentUnixTime(){
      return moment(new Date()).unix();
    },
    setMessageExpiryTimeText(){
      const selfDestructText = "This message will self-destruct";
      const unixTime = this.message.messageExpiryUnixTime;
      const timeFromNow = moment(unixTime * 1000).fromNow();
      this.timeToMessageExpiry = `${selfDestructText} ${timeFromNow}`;
    },
    starredLabelToggle(thread) {
      thread.starred = !thread.starred;
      if(thread.starred === true) {
        markAsStarred(thread.threadId);
      }
      else {
        unMarkAsStarred(thread.threadId);
      }
    },
    openModal(index){
      // this.$refs.modal[index].open();
      this.$refs.modal[index].open();
    },
    setTimeAgo(){
      this.timeAgo = timeago(this.message.unixTime * 1000);
    },
    isExpired(){
      const secondAheadUnixTime = this.currentUnixTime + 1;
      if(secondAheadUnixTime > this.message.messageExpiryUnixTime){
        this.clearMessageSnippet();
        return true;
      }

      return false;
    },
    clearMessageSnippet(){
      const expiredMessageSnippet = '<span style="color: red"> &lt;Message timed out&gt;</span>';
      this.message.snippet = expiredMessageSnippet;
    },
    decryptAttachments() {
      for (let i = 0; i < this.attachmentArray.length; i++) {
        this.attachmentArray[i].id = base64url.decode(this.attachmentArray[i].url.substring('22')); // decrypt the base64 here from 22 character
      }
      console.log("Attachment Array", this.attachmentArray);
    },
    downloadImg(data) {
      var newTab = window.open();
      newTab.document.body.innerHTML = '<img src="' + data + '">';
    },
  },
  created(){
    this.setTimeAgo();
    this.unexpand();

    if (this.message.messageExpiryUnixTime){
      if (this.isExpired()){
        this.messageExpired = true;
      } else {
        this.setMessageExpiryTimeText();

        const unixTimeInterval = setInterval(()=>{
          this.currentUnixTime = this.getCurrentUnixTime();

          if (this.isExpired()){
            this.messageExpired = true;
            clearInterval(unixTimeInterval);
          } else {
            this.setMessageExpiryTimeText();
          }
        }, 1000);
      }
    }
    if (this.message.password) {
      this.unlocked = false;
      this.realPassword = this.message.password;
    }
    if (this.message.isEncrypted) {
      this.isEncrypted = true;
    }
    console.log("this.message ", this.message);
    if (this.message.attachObj.hasAttachments) {
      this.hasAttachment = true;
      this.attachmentArray = this.message.attachObj.uploadData;
      // this.decryptAttachments();
    }
  },
  mounted(){
    if (this.isLastMessage){
      this.expand();
    }
  }
}
</script>

<style scoped>
.cursorHover {
  cursor: pointer;
}
.overflow {
  margin-right: 10px;
  overflow:hidden;
  position: relative;
  white-space:nowrap;
}
.center {
  text-align: left;
}
button {
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 10px 25px 5px 25px;
  outline: none;
}
button:hover {
  background-color: #F2F2F2;
}
.starBound {
  width: 30px;
  height: 30px;
  overflow: hidden;
  position: relative;
  top: -6px;
}
.firefoxOnly label {
  margin-right: 4px;
  font-size: 22px;
}
#ffstar {
  display:none;
}
.checked {
  display:none
}
.notchecked {
  display:inline-block;
}
#ffstar:checked ~ .checked {
  display:inline-block;
}
#ffstar:checked ~ .notchecked {
  display:none;
}
.highlightArea label {
  width: 30px;
  height: 30px;
  
}

.flexRight {
  display: flex;
  flex-direction: row;
  width: 250px;
  justify-content: space-between;
  font-size: small;
}
.shift-down {
  margin-top: 31px;
}
.recipients {
  font-size: .8em;
  height: 20px;
  overflow: hidden;
  width: 90%;
}
.leftAlign {
  text-align: left;
  margin-left: 2%;
}
.rightAlign {
  text-align: right;
  margin-right: 10px;
}
.flexboxSubject {
  display:flex;
  justify-content: space-between;
}
.response-buttons {
  padding: 40px 0px;
  text-align: left;
  margin-left: 2%;
  /* padding-bottom: 40px; */
}
h4 {
  padding-top: 15px;
}
.group-message {
  display: inline;
}
.not-group-message {
  display: none;
}
#body {
  background-color: white !important;
  padding-top: 2%;
  padding-left: 5%;
  padding-right: 1%;
  background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center; 
}
.star {
  visibility: hidden;
  font-size: 20px;
  cursor: pointer;
  position: relative;
  left: 5px;
  /* top: -6px; */
  width: 30px;
  height: 30px;
}
.star:before {
  content: "\2606";
  position: absolute;
  visibility:visible;
}
.star:checked:before {
  content: "\2605";
  position: absolute;
  color:gold;
}
.attachment-container {
  height: 120px;
  width: 180px;
}
.attachment {
  overflow: hidden;
  border-style: solid;
  border-width: 5px;
  /* margin: auto; position: relative;  */
  max-width: 100%; max-height: 100%;
}
.modalDialog {
	position: fixed;
	font-family: Arial, Helvetica, sans-serif;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0,0,0,0.8);
	z-index: 99999;
	opacity:0;
	-webkit-transition: opacity 400ms ease-in;
	-moz-transition: opacity 400ms ease-in;
	transition: opacity 400ms ease-in;
	pointer-events: none;
}
.modalDialog:target {
	opacity:1;
	pointer-events: auto;
}

.modalDialog > div {
	width: 400px;
	position: relative;
	margin: 10% auto;
	padding: 5px 20px 13px 20px;
	border-radius: 10px;
	background: #fff;
	background: -moz-linear-gradient(#fff, #999);
	background: -webkit-linear-gradient(#fff, #999);
	background: -o-linear-gradient(#fff, #999);
}
.close {
	background: #606061;
	color: #FFFFFF;
	line-height: 25px;
	position: absolute;
	right: -12px;
	text-align: center;
	top: -10px;
	width: 24px;
	text-decoration: none;
	font-weight: bold;
	-webkit-border-radius: 12px;
	-moz-border-radius: 12px;
	border-radius: 12px;
	-moz-box-shadow: 1px 1px 3px #000;
	-webkit-box-shadow: 1px 1px 3px #000;
	box-shadow: 1px 1px 3px #000;
}

.close:hover { background: #00d9ff; }

.passwordInfo {
  font-weight: bold;
}

@-moz-document url-prefix() {
  .theRestoftheTime {
    display: none;
  }
}

i {
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
}

.down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
.messageExpiry {
  color: blue;
  font-weight: 350;
}
.attachmentView {
  max-width: 300px;
  max-height: 300px;
}

</style>


