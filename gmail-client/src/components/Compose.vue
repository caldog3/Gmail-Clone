/* eslint-disable */

<template>
  <div class="compose composeWindow" v-if="active" @click.stop>
    <!-- <div class="headerSection"> -->
    <div class="unsafeHeader headerBorder" v-if="!isPrivate">
      <div class="head">
        
        <h2 class="headerMessage">
          <font-awesome-icon style="color:white;" class="Icon" icon="exclamation-triangle"/>
          Your email provider and the recipient's email provider can read this message
         </h2>
        <!-- insert warning icon here -->
      </div>
      
      <!-- <span class="dropDownArea">
        <custom-drop-down/>
      </span> -->  
      <div class="alterCompose">
        <a class="close" @click="close">×</a>
      </div>
    </div>
    <div class="safeHeader headerBorder" v-else>
      <div class="head">
        <h2 class="headerMessage">Only you and the recipient will be able to read this message</h2>
      </div>
      
      <!-- <span class="dropDownArea">
        <custom-drop-down/>
      </span> -->  
      <div class="alterCompose">
        <a class="close" @click="close">×</a>
      </div>
    </div>

    <div class="safeHeader headerBorder" v-if="isSelfDestruct"> <!-- safeHeader controls alert color -->
      <div class="head"> 
        <h2 class="headerMessage">This message will automatically delete from your inbox and theirs in {{setTime}}</h2>
      </div>
    </div>
    <div class="blankHeader headerBorder" v-else> <!-- safeHeader controls alert color -->
      <div class="head"> 
        <!-- <h2 class="headerMessage"> This message will not automatically delete</h2> -->
        <!-- <h2 class="headerMessage">This message will automatically delete from your inbox and theirs</h2> -->
      </div>
    </div>

    <div class="sectionTop">
      <span class="unselected">
        <!-- <input class="full" type="email" v-model="composeTo" placeholder="Recipients" @focus="focusOnSection('to')" @click="recipientDomain()"> -->
        <input class="full" type="email" v-model="composeTo" placeholder="Recipients" @focus="focusOnSection('to')">
      </span>
    </div>
    <div class="section" v-if="isPrivate">
      <input class="full2" type="password" v-model="password" placeholder="Password" id="password" @focus="focusOnSection('password')">
    </div>
    <div class="section" v-if="isPrivate">
      <input class="full2" type="text" v-model="passwordHint" placeholder="Hint (opt)" id="passwordHint" @focus="focusOnSection('passwordHint')">
    </div>
    <div class="section">
      <!--  THIS IS THE DROPDOWN, NEED TO STEAL SOME OF ITS IMPLEMENTATION 
      <span class="securityDropDown full3">
        <security-level-drop-down/>
      </span> -->
      
      <input class="full2 subjectLeft" v-model="composeSubject" placeholder="Subject" id="composeSubject" @focus="focusOnSection('subject')">
      
    </div>
    <select class="comboBox" v-model="setTime" @change="parseExpiryTimeString()" v-if="isSelfDestruct">
      <option value="30 minutes">30 minutes</option>
      <option value="1 hour">1 hour</option>
      <option value="2 hours">2 hours</option>
      <option value="4 hours">4 hours</option>
      <option value="6 hours">6 hours</option>
      <option value="8 hours">8 hours</option>
      <option value="10 hours">10 hours</option>
      <option value="12 hours" selected>12 hours</option> <!-- default could be anything, 12 just seemed like a comfortable default -->
      <option value="18 hours">18 hours</option>
      <option value="24 hours">24 hours</option>
      <option value="32 hours">32 hours</option>
      <option value="2 days">2 days</option>
      <option value="3 days">3 days</option>
      <option value="7 days">7 days</option>
    </select>
    <span class="toggleButtons">
      <!-- <input type="button" value="Privacy" @click="togglePrivacy"> -->
      <button v-bind:class="privacyButtonCheck()" @click="togglePrivacy">
        <div style="text-align:center">
          <font-awesome-icon style="color:black;" class="Icon" icon="lock" v-if="isPrivate"/>
          <font-awesome-icon style="color:black;" class="Icon" icon="unlock" v-else/>
          <br>
          <span class="head-mini-text">Privacy</span>
        </div>
      </button>
      &emsp;
      <!-- <input type="button" value="Self-Destruct" @click="toggleSelfDestruct"> -->
      <button v-bind:class="selfDestructButtonCheck()" @click="toggleSelfDestruct">
        <div style="text-align:center">
          <font-awesome-icon style="color:black;" class="Icon" icon="hourglass"/>
          <!-- <font-awesome-icon style="color:black;" class="Icon" icon="hourglassStart" v-else/> -->
          <br>
          <span class="head-mini-text">Self Destruct</span>
        </div>
      </button>
    </span>
    <!-- <div class="section" v-if="isPrivate">
      <input class="full2" type="password" v-model="password" placeholder="Password" id="password" @focus="focusOnSection('password')">
      |&emsp;
      <input class="full2" type="text" v-model="passwordHint" placeholder="Hint (opt)" id="passwordHint" @focus="focusOnSection('passwordHint')">
    </div> -->

    <div @focus="focusOnSection('body')">
      <quill-editor v-model="composeMessage"/>
    </div>

    <span class="footerSection">
      <span v-if="!existingDraft">
        <input class="SaveButton" type="button" value="Save New Draft" @click="makeFireDraft"> <!-- FIXME styling needs to be adjusted -->
      </span>
      <span v-else>
        <input class="SaveButton" type="button" value="Save Changes" @click="draftUpdate">
      </span>

      <div class="sendButton" >
        <input type="submit" class="SendButton1" value="Send" @click="fireSendCompose">
      </div>
    </span>  
  </div>
</template>

<script>
import { sendMessage, createDraft, updateDraft } from './../store-utility-files/gmail-api-calls';
import QuillEditor from './QuillEditor';
import eventBus from '../event_bus.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Icon from './icon';
import { fireSendMessage, fireSaveDraft } from '../firebase/firebase';
import { fireSetupEmailMessage } from '../firebase/fireEmail';
import CustomDropDown from './CustomDropDown';
import SecurityLevelDropDown from './SecurityLevelDropDown';
import { setupEmailBody, setupEmailBodyAttach } from '../store-utility-files/email';
import { upload } from '../file-upload.service';
import moment from 'moment';
import { setTimeout, setInterval, clearInterval } from 'timers';
import { resolve } from 'url';
// import vueFilePond from 'vue-filepond';
// import 'filepond/dist/filepond.css';
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
// import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

export default {
  name: 'Compose',
  components: {
    Icon,
    QuillEditor,
    CustomDropDown,
    SecurityLevelDropDown,
    FontAwesomeIcon,
    // FilePond,
  },
  data() {
    return {
      registeredRecipient: true,
      hasPassword: false,
      password: '',
      confirmPassword: '',
      passwordHint: null,
      isEncrypted: false,

      isPrivate: false,
      isSelfDestruct: false, 
      setTime: "12 hours",

      composeTo: '',
      composeSubject: '',
      composeMessage: '',
        
      currentUser: window.currentUser,
      active: false,
      activeSection: 'to',
      ccActive: false,
      bccActive: false,

      existingDraft: false,
      draftId: "",
      threadId: "",

      uploading: false,
      hasAttachments: false,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos",

      messageExpiryUnixTime: null,
      baseTime: null,


    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === 'STATUS_INITIAL';
    },
    isSaving() {
      return this.currentStatus === 'STATUS_SAVING';
    },
    isSuccess() {
      return this.currentStatus === 'STATUS_SUCCESS';
    },
    isFailed() {
      return this.currentStatus === 'STATUS_FAILED';
    }
  },
  filters: {
    formatTimeUnit(timeValue, timeUnit) {
      if (timeValue > 1) {
        timeUnit = timeUnit.concat("s");
      }
      return `${timeValue} ${timeUnit}`;
    }
  },
  methods: {
    convertToBase64() {
      var selectedFiles = document.getElementById("inputPDF").files;
      var array = [];
      if(selectedFiles.length > 0) {
        for(var i = 0; i < selectedFiles.length; i++) {
          var fileToLoad = selectedFiles[i];
          var fileReader = new FileReader();
          var base64;
          fileReader.onload = function(fileLoadedEvent) {
            base64 = fileLoadedEvent.target.result;
            array.push({url: base64, filename: fileToLoad.name});
          };
          fileReader.readAsDataURL(fileToLoad);
        }
        this.uploadedFiles = array;
        this.hasAttachments = true;
      }
    },
    // uploader start
    reset() {
      // reset form to initial state
      this.currentStatus = 'STATUS_INITIAL';
      this.uploadedFiles = [];
      this.uploadError = null;
      this.hasAttachments = false;
    },
    save(formData) { //might be out of the scope of our client
      //upload data
      this.currentStatus = 'STATUS_SAVING';
      upload(formData)
        .then(this.waitForUpload(5000)) //wait for uploads to resolve
        .then(x => {
          this.uploadedFiles = [].concat(x);
          this.currentStatus = 'STATUS_SUCCESS';
          // console.log("COMPARE: ", this.uploadedFiles[0].id === this.uploadedFiles[1].id);
          console.log("UPLOADED FILES: ", this.uploadedFiles);
          this.hasAttachments = true;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = 'STATUS_FAILED';
          console.log("UPLOAD FAILED");
        });
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();
      console.log(new FormData());
      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });
      // save it
      this.save(formData);
    },
    //uploader finish
    open() {
      this.active = true
      //need to clear values if this is a basic compose...
    },
    close() {
      this.active = false
      setTimeout(() => {      
        this.composeTidy();
      }, 250);
      clearInterval(this.changingRecipientInterval);
    },
    expiryHelp() {
      eventBus.$emit("SELF_DESTRUCT_HELP");
    },
    encryptionHelp() {
      eventBus.$emit("ENCRYPTION_HELP");
    },
    adjustExpiryTime() {
      let difference = moment().unix() - this.baseTime;
      this.messageExpiryUnixTime = this.messageExpiryUnixTime + difference;
      
    },
    fireSendCompose(){
      let finalPassword = null;
      
      if (this.isPrivate) { //FIXME, don't have confirmPassword anymore
        if (!this.password) {
          alert("The password is invalid");
          return;
        }
        else {finalPassword = this.password;}
      }
      if (this.messageExpiryUnixTime != null) {
        this.adjustExpiryTime();
      }
      let message = fireSetupEmailMessage({
        composeSubject: this.composeSubject, 
        composeTo: this.composeTo, 
        composeMessage: this.composeMessage,
        messageExpiryUnixTime: this.messageExpiryUnixTime,
        password: finalPassword,
        hint: this.passwordHint,
        isEncrypted: this.isEncrypted,
        isPrivate: this.isPrivate,
        attachObj: {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles},
      });
      if(message === undefined){return;}
      fireSendMessage(message);
      this.messageExpiryUnixTime = null;
      this.close();
    },
    sendCompose() {
      // var sender = this.$store.state.currentUser.w3.U3;
      // if (this.hasAttachments) { //if there are attachments
      //   var attachObj = {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles};
      //   const {headers, body} = setupEmailBodyAttach(this.composeSubject, this.composeTo, this.composeMessage, sender, attachObj);
      //   // console.log("SEND COMPOSE: hope this works ", headers);
      //   // console.log("BODY before Base64: ", body); //long string if attachments are included
      //   sendMessage(headers, body);
      // }
      // else {
      //   const {headers, body} = setupEmailBody(this.composeSubject, this.composeTo, this.composeMessage, sender);
      //   sendMessage(headers, body);
      // }
      this.close();
      //Tidy needs to wait for this to finish
    },
    composeTidy() {
      this.composeTo = '';
      this.composeSubject = '';
      this.composeMessage = '';
      this.reset();
      this.uploading = false;
      //FIXME emit a reset of the security level Dropdown
      this.registeredRecipient = true;
      this.hasPassword = false;
      this.isEncrypted = false;
      this.hasAttachments = false;
      this.password = '';
      this.confirmPassword = '';
      this.passwordHint = '';
      this.isSelfDestruct = false;
      this.isPrivate = false;
      // console.log("About to emit reset_security");
      // eventBus.$emit("RESET_SECURITY");
    },
    recipientDomain() {
      this.changingRecipientInterval = setInterval(()=>{
        var containsDomain = (this.composeTo.includes("@2040mail.com") || this.composeTo.includes("@2040Mail.com"));
        console.log("contains the domain: ", containsDomain);
        if (containsDomain !== this.registeredRecipient) {
          console.log("swap permissions");
          this.registeredRecipient = containsDomain;

          eventBus.$emit("SWAP_SECURITY", {rightDomain: this.registeredRecipient})
        }
      }, 1000);
      // if (this.registeredRecipient !== containsDomain && !containsDomain) {
      //   console.log("my catcher");
      //   this.registeredRecipient = containsDomain;
      //   eventBus.$emit("SWAP_SECURITY", {rightDomain: this.registeredRecipient});
      // }
    },

    focusOnSection(section) {
      this.activeSection = section;
      // this.ccActive = this.message.cc !== '';
      // this.bccActive = this.message.bcc !== '';
    },
    draftSetup() {  // do we need to pass in the recipient and message data or set it in the store or what?
      // this.composeMessage = "THIS IS A TEST";
    },
    createDraft() {
      // var sender = this.$store.state.currentUser.w3.U3;
      // if (this.hasAttachments) { //if there are attachments
      //   var attachObj = {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles};
      //   const {headers, body} = setupEmailBodyAttach(this.composeSubject, this.composeTo, this.composeMessage, sender, attachObj);
      //   // console.log("SEND COMPOSE: hope this works ", headers);
      //   // console.log("BODY before Base64: ", body); //long string if attachments are included
      //   createDraft(headers, body);
      // }
      // else {
      //   const {headers, body} = setupEmailBody(this.composeSubject, this.composeTo, this.composeMessage, sender);
      //   createDraft(headers, body);      
      // }
      this.close();
    },
    draftUpdate() {
      // var sender = this.$store.state.currentUser.w3.U3;
      // if (this.hasAttachments) { //if there are attachments
      //   var attachObj = {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles};
      //   const {headers, body} = setupEmailBodyAttach(this.composeSubject, this.composeTo, this.composeMessage, sender, attachObj);
      //   // console.log("SEND COMPOSE: hope this works ", headers);
      //   // console.log("BODY before Base64: ", body); //long string if attachments are included
      //   updateDraft(headers, body, this.draftId, this.threadId);
      // }
      // else {
      //   const {headers, body} = setupEmailBody(this.composeSubject, this.composeTo, this.composeMessage, sender);
      //   updateDraft(headers, body, this.draftId, this.threadId);
      // }
      this.close();
    },
    // toggleUploading() {
    //   this.uploading = !this.uploading;
    // },
    // waitForUpload(miliseconds) {
    //   return (x) => {
    //     return new Promise(resolve => setTimeout(() => resolve(x), miliseconds));
    //   };
    // },
    makeFireDraft() {
      let finalPassword = null;
      
      if (this.isPrivate) {
        if (!this.password) {
          alert("The password is invalid");
          return;
        }
        else {finalPassword = this.password;}
      }
      let message = fireSetupEmailMessage({
        composeSubject: this.composeSubject, 
        composeTo: this.composeTo, 
        composeMessage: this.composeMessage,
        messageExpiryUnixTime: this.messageExpiryUnixTime,
        password: finalPassword,
        hint: passwordHint,
        isEncrypted: this.isEncrypted,
        isPrivate: this.isPrivate,
        attachObj: {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles},
      });
      if(message === undefined){return;}
      fireSaveDraft(message);
      this.close();
    },
    setExpiryTime(timeValue, timeUnit) {
      const time = this.$options.filters.formatTimeUnit(timeValue, timeUnit);
      // this.$refs.dropdown.isHidden = true;
      this.text = `This message will self-destruct in ${time}`;
      this.getExpiryUnixTime(timeValue, timeUnit);
    },
    getExpiryUnixTime(timeValue, timeUnit) {
      console.log("TimeValue", timeValue);
      console.log("TimeUnit", timeUnit);
      const date = new Date();
      console.log("new date", date);

      switch (timeUnit) {
        case "minutes":
          const minute = date.getMinutes();
          date.setMinutes(minute + timeValue);
          break;
        case "hours":
          const hour = date.getHours();
          date.setHours(hour + timeValue);
          break;
        case "days":
          const day = date.getDate();
          date.setDate(day + timeValue);
          break;
      }
      var unixTime = moment(date).unix();
      var currentTime = moment().unix();   // FIXME - I think the unix time is getting too far ahead here...need to test some mores
      console.log("CurrentTime: ", currentTime);
      console.log("ExpiryTime", unixTime);
      this.messageExpiryUnixTime = unixTime
      this.baseTime = currentTime;
    },
    parseExpiryTimeString() {
      let timeString = this.setTime;
        let timeQuantity = timeString.substring(0, timeString.search(" "));
        let timeUnit = timeString.substring(timeString.search(" ") + 1);
        console.log("TimeQuantity ", timeQuantity);
        console.log("TimeUnit ", timeUnit);
        this.setExpiryTime(timeQuantity, timeUnit);
    },
    togglePrivacy() {
      this.isPrivate = !this.isPrivate;
    },
    toggleSelfDestruct() {
      this.isSelfDestruct = !this.isSelfDestruct;
      if (this.isSelfDestruct) {
        this.parseExpiryTimeString();
      }
      else {this.messageExpiryUnixTime = null;}
    },
    privacyButtonCheck() {
      let newClass = "securityButton";
      if (this.isPrivate) {
        newClass = "securityButton2";
      }
      return newClass;
    },
    selfDestructButtonCheck() {
      let newClass = "securityButton";
      if (this.isSelfDestruct) {
        newClass = "securityButton2";
      }
      return newClass;
    }
  },
  beforeDestroy() {
    eventBus.$off("SWAP_SECURITY", {rightDomain: this.registeredRecipient})
  },
  mounted() {
    this.reset();
  },
  created() {
    eventBus.$on('BODY_CLICK', this.close);
    eventBus.$on('KEYUP_ESCAPE', this.close);
    eventBus.$on("COMPOSE_SECURITY", payload => {
      this.hasPassword = payload.hasPassword;
      this.isEncrypted = payload.isEncrypted;
    });

    eventBus.$on('COMPOSE_OPEN', this.open);
    eventBus.$on("SET_EXPIRY_TIME", payload => {
      this.messageExpiryUnixTime = payload.unixTime;
      this.baseTime = payload.currentTime;
    })
    eventBus.$on('COMPOSE_TIDY', this.composeTidy);
    eventBus.$on('COMPOSE_OPEN_DRAFT', payload => {
      this.existingDraft = true;
      if (payload.to != null) { 
        this.composeTo = payload.to;
      } else {this.composeTo = ""}
      if (payload.subject != null) {
        this.composeSubject = payload.subject;
      } else {this.composeSubject = ""}
      if (payload.body != null) { 
        this.composeMessage = payload.body;
        // console.log("payloadval:", payload);
        //common quill problem where quill resets the value we want to instantiate here. Need some kind of workaround
      } else {this.composeMessage = ""}

      this.threadId = payload.threadId;
      var draftsList = this.$store.state.draftIdsArray;
      for (var draft of draftsList) {
        if (draft.message.threadId === this.threadId) { // might also need to compare the messageId but our data shows them as the same id...;
          // console.log("WE FOUND SOME THAT ARE EQUAL");
          this.draftId = draft.id;
          break;
        }
      }
    });
    // eventBus.$on('ENTER_DRAFT', this.draftSetup);
  }
}
</script>

<style scoped>
.compose {
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 0;
  right: 10px;
  width: 510px;
  display: flex;
  /* height: 500px; */
  flex-direction: column;
  align-content: stretch;
  align-items: center;
  margin-right: 60px;
  z-index: 999;
}
.flexFrom {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
}
.head {
  width: 250px;
}
.dropDownArea{
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
  z-index: 999;
  padding-right:10px;
}
.headerSection {
  background: #404040;
  min-height: 35px;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  padding: 4px;
  width: 100%;
}
.safeHeader {
  background: #78acff;
  min-height: 35px;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  padding: 4px;
  width: 100%;
}
.unsafeHeader {
  background: #db5248;
  min-height: 35px;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  padding: 4px;
  width: 100%;
}
.blankHeader {
  background: lightgray; /* white, gray, or what looks best? */
  min-height: 35px;
  display: flex;
  flex-direction: row;
  align-content: stretch;
  align-items: center;
  padding: 4px;
  width: 100%;
}
.headerBorder {
  border-bottom: 2px solid darkgray;
}
.headerMessage {
  width: 200%;
}
h2 {
  color: white;
  font-size: 12px;
  padding: 8px;
  text-align: left;
  margin: 0px;
  font-weight: bold;
}
a:not([href]):not([tabindex]) {
  color: #b2b2b2;
  height: 100%;
}
.alterCompose {
  /* margin-right: 100em; */
  font: 16px/27px sans-serif;
  height: 100%;
  margin-left: 5px;
  margin-right: 4px;
  /* text-align: right; */
}
.close {
  margin-right: -230px;
}
.sectionTop {
  width: 60%;
  margin-right: auto;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  height: 35px;
}
.section {
  width: 60%;
  margin-right: auto;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  height: 35px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.sectionText {
  width: 100%;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  flex-grow: 1;
  flex-basis: 0;
  min-height: 290px;
}
.TO {
  width: 15px;
}
.full3 {
  width: 40%;
  height: 30px;
  border: none;
  outline: none;
  overflow: hidden;
}
.full2 {
  width: 100%;
  border: none;
  outline: none;
  overflow: hidden;
}
.full {
  width: 100%;
  border: none;
  outline: none;
  overflow: hidden;
}
textarea {
  width: 100%;
  border: none;
  outline: none;
  height: 100%;
  min-height: 285px;
  resize: none;
}
.textSpace {
  width: 100%;
  border: none;
  outline: none;
  height: 100%;
  min-height: 285px;
  resize: none;
}
.toggleButtons {
  margin-left: auto;
  margin-top: -30px;
  margin-right: 4px;
}

.footerSection {
  /* overflow: hidden; */
  /* width: 510px; */
  margin: 4px;
  height: 55px;
  margin-left: auto;
}
.sendButton {
  float: right;
  margin: 4px;
  color: white;
  padding: 3px;
}
.SendButton1 {
  background-color: #297be6;
  border-radius: 5px;
  color: white;
  border: none;
  outline: none;
  width: 4.5em;
  height: 2.2em;
}
.SaveButton {
  text-align: left;
  background-color: darkGray;
  border-radius: 5px;
  color: white;
  border: none;
  outline: none;
  height: 2.2em;
  float: left;
  /* padding: 3px; */
  margin: 7px;
}
.composeWindow {
  /* margin-right: 22px; */
  overflow: hidden;
  border-bottom: solid;
  border-color: rgba(255, 255, 255, 0.4);
  overflow-y: scroll;
  /* min-height: 500px; */
  max-height: 80vh;
  /* height: 100%; */

}
/* .composeWindow:hover {
  overflow-y: scroll;
  margin-right: 10px;
} */

/* styling for the image uploader */
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}
.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  min-height: 200px;
  margin-left: -140px; /* adjust the input location to match the visual box */
  margin-top: -10px;
  position: absolute;
  cursor: pointer;
}
.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}
.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
/* end image uploader styling */
.securityDropDown {
  position:relative;
  text-align: left;
}

.Icon {
  cursor: pointer;
  
}
.help {
  color: white;
  cursor: pointer;
  /* margin-left: -30px; */
  margin-right: 30px;
  font-size: 1em;
  z-index: 999;
}
.comboBox {
  margin-left: auto;
  /* margin-top: -30px; */
  position: relative;
  bottom: 35px;
  width: 98px;
  height: 30px;
  margin-right: 4px;
}
.securityButton:active {
  background-color:#78acff;
}
.securityButton {
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  /* padding-left: -100px; */
  -webkit-transform: scale(.85); /* scales button and all child elements */
}
.securityButton2 {
  background-color: #78acff;
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  -webkit-transform: scale(.8);

}



</style>