/* eslint-disable */

<template>
  <div class="compose composeWindow" v-if="active" @click.stop>
    <div class="headerSection">
      <div class="head">
        <h2>New Message</h2>
      </div>
      
      <span class="dropDownArea">
        <custom-drop-down/>
      </span>
      <div @click="expiryHelp">
        <font-awesome-icon class="Icon help" icon="question-circle"/>
      </div>
      
      <div class="alterCompose">
        <a class="close" @click="close">×</a>
      </div>
    </div>

    <div class="sectionTop">
      <span class="unselected">
        <input class="full" type="email" v-model="composeTo" placeholder="Recipients" @focus="focusOnSection('to')" @click="recipientDomain()">
      </span>
    </div>

    <div class="section">
      <span class="securityDropDown full3">
        <security-level-drop-down/>
      </span>
      <font-awesome-icon style="color:black" class="Icon" icon="question-circle" @click="encryptionHelp"/>
      
      &emsp;|&emsp;
      <input class="full2 subjectLeft" v-model="composeSubject" placeholder="Subject" id="composeSubject" @focus="focusOnSection('subject')">
    </div>
    <div class="section" v-if="hasPassword">
      <input class="full2" type="password" v-model="password" placeholder="Password" id="password" @focus="focusOnSection('password')">
      |&emsp;
      <input class="full2" type="password" v-model="confirmPassword" placeholder="Confirm Password" id="confirmPassword" @focus="focusOnSection('confirmPassword')">
    </div>

    <div @focus="focusOnSection('body')">
      <quill-editor v-model="composeMessage"/>
    </div>
    
    <!-- Start of Upload -->
    <!-- <div v-if="!uploading">
      <p>
        <a href="javascript:void(0)" @click="toggleUploading()">Uploads</a>
      </p>
    </div>
    <div v-else>
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
        <h1>Upload Files</h1>
        <div class="dropbox">
          <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*, application/pdf" class="input-file">
            <p v-if="isInitial">
              Drag your file(s) here to begin<br> or click to browse
            </p>
            <p v-if="isSaving">
              Uploading {{ fileCount }} files...
            </p>
        </div>
      </form>
      
      <div v-if="isSuccess">
        <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Clear uploads</a>
        </p>
        <ul class="list-unstyled">
          <li v-for="item in uploadedFiles" :key="item.originalName">
            <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
          </li>
        </ul>
      </div>
      
      <div v-if="isFailed">
        <h2>Uploaded failed.</h2>
        <p>
          <a href="javascript:void(0)" @click="reset()">Try again</a>
        </p>
        <pre>{{ uploadError }}</pre>
      </div>
    </div> -->
    <!--End Upload -->
    <input id="inputPDF" type="file" @change="convertToBase64();" multiple />
    <!-- <div>
      <file-pond
        name="test"
        ref="pond"
        label-idle="Drop files here..."
        allow-multiple="true"
        accepted-file-types="image/jpeg, image/png, application/pdf"
        server="/api"
        v-bind:files="uploadedFiles"
        v-on:init="handleFilePondInit"></file-pond>
    </div> -->

    <div class="footerSection">
      <div class="sendButton" >
        <input type="submit" class="SendButton1" value="Send" @click="fireSendCompose">
      </div>

      
      <div v-if="!existingDraft">
        <input class="SaveButton" type="button" value="Save New Draft" @click="makeFireDraft"> <!-- FIXME styling needs to be adjusted -->
      </div>
      <div v-else>
        <input class="SaveButton" type="button" value="Save Changes" @click="draftUpdate">
      </div>
    </div>  
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
      isEncrypted: false,

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

      messageExpiryUnixTime: null
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
    fireSendCompose(){
      let finalPassword = null;
      
      if (this.hasPassword) {
        if (!this.password || this.password !== this.confirmPassword) {
          alert("The password does not match or is invalid");
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
        isEncrypted: this.isEncrypted,
        attachObj: {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles},
      });
      if(message === undefined){return;}
      fireSendMessage(message);
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
    },
    recipientDomain() {
      this.changingRecipientInterval = setInterval(()=>{
        var containsDomain = this.composeTo.includes("@2040mail.com");
        if (containsDomain !== this.registeredRecipient) {
          console.log("swap permissions");
          this.registeredRecipient = containsDomain;
          eventBus.$emit("SWAP_SECURITY", {rightDomain: this.registeredRecipient})
        }
      }, 1000);
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
      
      if (this.hasPassword) {
        if (!this.password || this.password !== this.confirmPassword) {
          alert("The password does not match or is invalid");
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
        isEncrypted: this.isEncrypted,
        attachObj: {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles},
      });
      if(message === undefined){return;}
      fireSaveDraft(message);
      this.close();
    },
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
    eventBus.$on("SET_EXPIRY_TIME", unixTime => {
      this.messageExpiryUnixTime = unixTime;
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
h2 {
  color: white;
  font-size: 15px;
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
  margin-right: auto;
  font: 16px/27px sans-serif;
  height: 100%;
  margin-left: 5px;
  margin-right: 4px;
}
.sectionTop {
  width: 100%;
  border-bottom: 1px solid #CFCFCF;
  padding: 4px;
  height: 35px;
}
.section {
  width: 100%;
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
.footerSection {
  /* overflow: hidden; */
  width: 510px;
  margin: 4px;
  height: 55px;
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
  background-color: coral;
  color: white;
  border: none;
  outline: none;
  height: 2.2em;
  float: left;
  padding: 3px;
  margin: 4px;
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

</style>