/* eslint-disable */
<template>
  <div id="body" v-if="messages[0] !== undefined">
    <div class="flexboxSubject">
      <h5 class="leftAlign">{{messages[0].subject}}</h5>
      <h5 class="rightAlign"><font-awesome-icon style="text-align=right;" class="Icon" icon="print" /></h5>
    </div>

    <div v-for="(message, index) in messages" :key="message.messageId">
      <template v-if="index === messages.length - 1">
        <message-body :message="message" :isLastMessage="true"/>
      </template>
      <template v-else>
        <message-body :message="message" :isLastMessage="false"/>
      </template>
    </div>
    <!-- Quill for replies -->
    <div class="quill" @focus="focusOnSection('body')" v-if="replying || replyingAll">
      <div>&emsp;</div>

<!-- ////////////////////////////////////////// -->

        <div class="unsafeHeader headerBorder" v-if="!isPrivate">
      <div class="head">
        
        <h2 class="headerMessage">
          <font-awesome-icon style="color:white;" class="Icon" icon="exclamation-triangle"/>
          Your email provider and the recipient's email provider can read this message
         </h2>
      </div>
    </div>
    <div class="safeHeader headerBorder" v-else>
      <div class="head">
        <h2 class="headerMessage">Only you and the recipient will be able to read this message</h2>
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
        <input class="full" type="email" v-model="recipient" placeholder="Recipients"  v-if="replying">
        <input class="full" type="email" v-model="allReplyRecipients" placeholder="Recipients"  v-if="replyingAll">
      </span>
    </div>
    <div class="section" v-if="isPrivate">
      <input class="full2" type="password" v-model="password" placeholder="Password" id="password">
    </div>
    <div class="section" v-if="isPrivate">
      <input class="full2" type="text" v-model="passwordHint" placeholder="Hint (opt)" id="passwordHint">
    </div>
    <div class="comboBoxShell">
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
    </div>
    <div class="toggleButtons">
      
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
    </div>
    
        <!-- ////////////////////////////////////////// -->

      <!-- <span class="topBar">
        
        <textarea rows="1" v-model="recipient" class="recipients" v-if="replying"></textarea>
        <textarea rows="1" v-model="allReplyRecipients" class="recipients" v-if="replyingAll"></textarea>
      </span>
      
      <div class="section" v-if="hasPassword">
        Password
        <input class="full2" type="password" v-model="password" placeholder="Password" id="password">
        |&emsp;
        <input class="full2" type="password" v-model="confirmPassword" placeholder="Confirm Password" id="confirmPassword">
      </div> -->
      

      <quill-editor v-model="responseHTML"/>
      
      <div class="quill-spacing">
        Attachments: <input id="inputPDF" type="file" @change="convertToBase64();" multiple />
        <br><br>
        <button class="sendBar" type="button" v-on:click="replySort">
          <font-awesome-icon class="Icon" icon="reply" /> Send
        </button>
        <button class="sendBar" type="button" v-on:click="resetMessage">
          <font-awesome-icon class="Icon" icon="trash" /> Trash
        </button>
        <button class="sendBar" type="button" v-on:click="draftUpdate" v-if="isDraft">
          Save Draft
        </button>
        <button class="sendBar" type="button" v-on:click="draftCreate" v-else>
          Create New Draft
        </button>
      </div>
    </div>

    <div class="quill" @focus="focusOnSection('body')" v-if="forwarding">
      <div>&emsp;</div>
      <textarea rows="1" v-model="forwardingRecipient" class="recipients"></textarea>
      <quill-editor v-model="forwardHTML"/>
      <div class="quill-spacing">
        <button class="sendBar" type="button" v-on:click="forwardSend">
          <font-awesome-icon class="Icon" icon="reply" /> Send
        </button>
        <button class="sendBar" type="button" v-on:click="forwardToggle">
          <font-awesome-icon class="Icon" icon="trash" /> Trash
        </button>
        <button class="sendBar" type="button" v-on:click="draftUpdate" v-if="isDraft">
          Save Draft
        </button>
        <button class="sendBar" type="button" v-on:click="draftCreate" v-else>
          Create New Draft
        </button>
      </div>
    </div>
     <!-- <div v-html="forwardHTML"></div>  this doesn't work either?? so it's not quills problem....it's the body of the original email somehow.... -->
    <!-- <div> {{forwardHTML}} </div> -->
    <!-- End of the quill FORWARDING-->



    <div class="response-buttons" v-if="!replying && !forwarding && !replyingAll"> 
      <button type="button" v-on:click="toggleReply"><font-awesome-icon class="Icon" icon="reply" /> Reply</button>
      &emsp;
      <span v-bind:class="ifGroupMessage()">
        <button type="button" v-on:click="toggleReplyAll"><font-awesome-icon class="Icon" icon="reply-all" /> ReplyAll</button>
      &emsp;
      </span>
      <button type="button" v-on:click="forwardToggle"><font-awesome-icon class="Icon" icon="long-arrow-alt-right" /> Forward</button>
    </div>
  </div>
</template>

<script>
import { trashMessage, sendReply, forwardMessage, sendForward, sendDraft, updateDraft, addDraftToThread } from './../store-utility-files/gmail-api-calls';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import MessageBody from "./MessageBody";
import QuillEditor from './QuillEditor';
import eventBus from '../event_bus';
import { sortBy } from 'lodash';
import CustomDropDown from './CustomDropDown';
import SecurityLevelDropDown from './SecurityLevelDropDown';
import { setupEmailBody, markEmailAsRead, markEmailAsUnread, trashEmailThread } from '../store-utility-files/email';
import { fireSetupEmailMessage } from '../firebase/fireEmail';
import { fireSendMessage } from '../firebase/firebase';
import moment from 'moment';
import { upload } from '../file-upload.service';
import { setTimeout } from 'timers';
import { resolve } from 'url';



export default {
  name: 'ThreadBody',
  components: {
    FontAwesomeIcon,
    MessageBody,
    QuillEditor,
    CustomDropDown,
    SecurityLevelDropDown,
  },
  data() {
    return {
      threadId: "",

      forwardHTML: "",
      responseHTML: "",
      forwardingBody: "",
      subject: '',
      sender: '',
      recipient: '',
      forwardingRecipient: '',
      multipartBoundary: '',
      allReplyRecipients: '',
      finalMessageBody: '',
      replying: false,
      replyingAll: false,
      forwarding: false,
      forwardRecipient: '',
      isDraft: false, //for determining api route for sending emails

      uploading: false,
      hasAttachments: false,
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "photos",
      messageExpiryUnixTime: null,
      baseTime: null,

      registeredRecipient: true,
      hasPassword: false,
      password: '',
      confirmPassword: '',
      isEncrypted: false,

      isPrivate: false,
      isSelfDestruct: false, 
      setTime: "12 hours",
      passwordHint: null,
      
    };
  },
  filters: {
    formatTimeUnit(timeValue, timeUnit) {
      if (timeValue > 1) {
        timeUnit = timeUnit.concat("s");
      }
      return `${timeValue} ${timeUnit}`;
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
    // recipientDomain() {
    //   this.changingRecipientInterval = setInterval(()=>{
    //     this.recipient = "Calvin";
    //     var containsDomain = this.recipient.includes("@gmail.com");
    //     if (containsDomain !== this.registeredRecipient) {
    //       console.log("swap permissions");
    //       this.registeredRecipient = containsDomain;
    //       eventBus.$emit("SWAP_SECURITY", {rightDomain: this.registeredRecipient})
    //     }
    //   }, 1000);
    // },
    returnToInbox(){
      this.$router.push({ path: "/" });
      this.$store.state.viewFolder = "Inbox";
      eventBus.$emit('MESSAGE_LIST');
      //eventBus.$emit("TOTAL_EMAIL_COUNT", "Inbox");
    },
    resetMessage() {
      this.replying = false;
      this.replyingAll = false;
      
    },
    toggleReply() {
      this.replying = !this.replying;
      this.changingRecipientInterval = setInterval(()=>{
        var containsDomain = (this.recipient.includes("@2040mail.com") || this.recipient.includes("@2040Mail.com"));
        if (containsDomain !== this.registeredRecipient) {
          console.log("swap permissions");
          this.registeredRecipient = containsDomain;

          eventBus.$emit("SWAP_SECURITY", {rightDomain: this.registeredRecipient})
        }
      }, 1000);
    },
    toggleReplyAll() {
      this.replyingAll = !this.replyingAll;
    },
    forwardToggle() {
      this.forwarding = !this.forwarding;
      console.log("This set of messages:", this.messages);
      if (this.forwarding) {
        
        let latestMessage = this.messages[this.messages.length-1];
        console.log("this message: ", latestMessage);
        console.log("BODY HTML:", latestMessage.body);
        let someUnix = latestMessage.unixTime * 1000;
        let tempHTML = "\n\n---------- Forwarded message ---------\n";
        //we want detailed From...
       // tempHTML += "From: " + latestMessage.detailedFrom + "\n"; //the <> in detailedFrom create quill errors, need to fix html rendering in quill
       tempHTML += "From: " + latestMessage.from + "\n";
        tempHTML += "Date: " + moment(someUnix).format("ddd, MMM D, YYYY  h:mm a") + "\n";
        tempHTML += "Subject: " + latestMessage.subject + "\n";
        // console.log("To: ", latestMessage.to);
        tempHTML += "To: " + latestMessage.to + "\n\n\n"; //FIXME might want latestMessage.conciseTo here the <> tags throw off quill
        //tempHTML += latestMessage.body;
        this.forwardHTML = tempHTML;
      }
      else {
        this.forwardHTML = "";
      }
    },
    draftUpdate() { // HOpe this works
      let draftId;
      var draftsList = this.$store.state.draftIdsArray;
      for (var draft of draftsList) {
        if (draft.message.threadId == threadID) { // might also need to compare the messageId but our data shows them as the same id...;
          console.log("WE FOUND SOME THAT ARE EQUAL");
          draftId = draft.id;
          break;
        }
      }
      updateDraft(headers, body, draftId, threadId);
    },
    draftCreate() {
      var sender = this.$store.state.userEmail; //do I handle reply all and reply one?
      if (this.replying && !this.replyingAll) {
        const {headers, body} = setupEmailBody(this.subject, this.recipient, this.responseHTML, sender);
        addDraftToThread(headers, body, this.threadId);
      }
      else if (!this.replying && this.replyingAll) {
        const {headers, body} = setupEmailBody(this.subject, this.allReplyRecipients, this.responseHTML, sender);
        addDraftToThread(headers, body, this.threadId);
      }
      else if (this.forwarding) {
        const {headers, body} = setupEmailBody(this.subject, this.recipient, this.forwardHTML, sender);
        addDraftToThread(headers, body, this.threadId);
      }
      //values aren't defined in scope outside of the ifs and else-ifs.....
      // createDraft(headers, body);
    },
    adjustExpiryTime() {
      let difference = moment().unix() - this.baseTime;
      this.messageExpiryUnixTime = this.messageExpiryUnixTime + difference;
    },
    firebaseReplySend(subject, composeTo){
      let finalPassword = null;
      
      if (this.hasPassword) {
        if (!this.password || this.password !== this.confirmPassword) {
          alert("The password does not match or is invalid");
          return;
        }
        else {finalPassword = this.password;}
      }
      if (this.messageExpiryUnixTime != null) {
        this.adjustExpiryTime();
      }
      let message = fireSetupEmailMessage({
        composeSubject: subject,
        composeTo, 
        composeMessage: this.responseHTML,
        messageExpiryUnixTime: this.messageExpiryUnixTime,
        password: finalPassword,
        hint: this.passwordHint,
        isEncrypted: this.isEncrypted,
        isPrivate: this.isPrivate,
        attachObj: {hasAttachments: this.hasAttachments, uploadData: this.uploadedFiles},
      }, this.messages[0].threadId);
      if (message === undefined){return;}
      fireSendMessage(message);
      this.messageExpiryUnixTime = null;
      // console.log("About to emit reset_security");
      // eventBus.$emit("RESET_SECURITY");
      this.postSendTidy();
      this.returnToInbox();
    },
    postSendTidy() {
      // console.log("in post send tidy");
      this.registeredRecipient = true;
      this.hasPassword = false;
      this.isEncrypted = false;
      this.hasAttachments = false;
      clearInterval(this.changingRecipientInterval);
      // eventBus.$emit("TOGGLE_LOCK_ACTIVE");
    },
    replySort() {
      if (this.replying && !this.replyingAll) {
        this.replySend();
      }
      else if (!this.replying && this.replyingAll) {
        this.replyAllSend();
      }
    },
    replySend() {
      //we'll link these two up soon
      console.log("You clicked the send button");
      let reSubj = this.subject;
      if (!this.subject.startsWith("Re:")) {
        reSubj = "Re: " + this.subject;
      }
      let composeTo = this.recipient;
      if (this.replyingAll){
        composeTo = this.allReplyRecipients
      }
      if(this.messages[0].isFireMessage){
        this.firebaseReplySend(reSubj, composeTo);
        return;
      }
      const {headers, body} = setupEmailBody(reSubj, composeTo, this.responseHTML, this.sender);
      // console.log("Headers: ", headers);
      // console.log("Body: ", body);
      let threadID = this.messages[0].threadId;
      this.threadId = threadID;
      //FIXME: add condition for drafts
      if (!this.isDraft) {
        sendReply(headers, body, threadID);
      }
      else { // this handles cases where we are sending a draft
        let draftId;
        var draftsList = this.$store.state.draftIdsArray;
        for (var draft of draftsList) {
          if (draft.message.threadId == threadID) { // might also need to compare the messageId but our data shows them as the same id...;
            console.log("WE FOUND SOME THAT ARE EQUAL");
            draftId = draft.id;
            break;
          }
        }
        sendDraft(headers, body, draftId, threadID);
      }
      this.returnToInbox();
    },
    // replyAllSend() {
    //   console.log("You clicked the replyAll send button");
    //   let reSubj = this.subject;
    //   if (!this.subject.startsWith("Re:")) {
    //     reSubj = "Re: " + this.subject;
    //   }
    //   let repAll = this.replyingAll;
    //   let repOne = this.replying;
    //   let recips = this.recipient;
    //   let recipsAll = this.allReplyRecipients;
    //   let me = 0;
    //   const {headers, body} = setupEmailBody(reSubj, this.allReplyRecipients, this.responseHTML, this.sender);
    //   console.log("HEaders: ", headers);
    //   let threadID = this.messages[0].threadId;
    //   //FIXME: add condition for drafts
    //   if (!this.isDraft) {
    //     sendReply(headers, body, threadID);
    //   }
    //   else {
    //     let draftId;
    //     var draftsList = this.$store.state.draftIdsArray;
    //     for (var draft of draftsList) {
    //       if (draft.message.threadId == threadID) { // might also need to compare the messageId but our data shows them as the same id...;
    //         console.log("WE FOUND SOME THAT ARE EQUAL");
    //         draftId = draft.id;
    //         break;
    //       }
    //     }
    //     sendDraft(headers, body, draftId);
    //   }
    // },
    forwardSend() {
// code will probably look very similar to replySend
      console.log("You clicked the forward send button");
      let forSubj = this.subject;
      if (!this.subject.startsWith("Fwd:")) {
        forSubj = "Fwd: " + this.subject;
      }
      const {headers, body} = setupEmailBody(forSubj, this.forwardingRecipient, this.forwardHTML, this.sender);
      console.log("headers: ", headers);
      let threadID = this.messages[0].threadId;
      //FIXME: add condition for drafts
      if (!this.isDraft) {
        sendReply(headers, body, threadID);
      }
      else {
        let draftId;
        var draftsList = this.$store.state.draftIdsArray;
        for (var draft of draftsList) {
          if (draft.message.threadId == threadID) { // might also need to compare the messageId but our data shows them as the same id...;
            console.log("WE FOUND SOME THAT ARE EQUAL");
            draftId = draft.id;
            break;
          }
        }
        sendDraft(headers, body, draftId);
      }
      //this.returnToInbox();
    },
    generateBoundary() {
      //12 0's and then 16 digit random...
      var boundChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var boundLength = 16;
      var randBoundary = "000000000000";
      randBoundary += Array(boundLength).fill(boundChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');

      // console.log("gererated boundary:", randBoundary);
      this.multipartBoundary = randBoundary;
      return randBoundary;
    },
    forward() { //sets up formatting for a forward and then calls the actual sending method
      console.log("forwarding...");
      let forwardRecipient = "caldogwoods@gmail.com";
      this.multipartBoundary = this.generateBoundary();
      let headerSection = {
        'MIME-Version': '1.0',
        'Subject': 'Fwd: ' + this.subject,
        'From': this.sender,
        'To': this.forwardRecipient,
        'Content-Type': 'multipart/alternative;' + 'boundary=' + this.multipartBoundary,
      }
      this.setForwardingBody();
      let id = this.messages[0];
      sendForward(headerSection, this.forwardingBody, id);

    },
    setForwardingBody() { //sets up body formatting for forward
      var body = "";
      body += '--' + this.multipartBoundary + '\n';
      body += 'Content-Type: text/html; charset="UTF-8"\n';
      body += 'Content-Transfer-Encoding: quoted-printable\n\n';
      body += this.finalMessageBody + '\n\n';
      body += '--' + this.multipartBoundary + '--';
      this.forwardingBody = body;
      console.log("forwardingBody:\n", this.forwardingBody);
    },
    getMessages() {
      let messages = this.$store.state.threadMessages;
      console.log(messages);
      const threadMessages = messages[this.$route.params.id];
      this.messages = sortBy(threadMessages, m => m.unixTime);
      //remove
      //FIXME includes vs ===
      if (this.messages[this.messages.length -1].labelId.includes("DRAFT")) { //sets up drafts to have default draft features (pop the draft and get data to plug into Quill)
        console.log("Handling it as a draft");
        // FIXME: need to account for drafts not being the last message of a thread.  Probably a complicated handler
        const draftMessage = this.messages.pop();

        this.toggleReply();
        this.responseHTML = draftMessage.body;
        
        this.isDraft = true;
      }

      this.subject = this.messages[this.messages.length -1].subject;
      this.sender = this.messages[this.messages.length -1].to;
      // console.log("this final message of set:", this.messages[this.messages.length -1]);
      let lastRecipient = this.messages[this.messages.length -1].detailedFrom;
      // this allows repeated replies
      let i = 1;
      while (lastRecipient.includes(this.sender)) { //is this called before the "DRAFT" if resolves itself?
        lastRecipient = this.messages[this.messages.length - i].detailedFrom;
        i++;
        if (i >= this.messages.length) {break;}
      }

      // console.log("Last recipient", lastRecipient);
      
      //this to doesn't work with group messages, includes other people
      //we need to create more parts of the object for these values ^^ vv
      this.recipient = lastRecipient;
      let allPeopleArray = this.messages[0].allParticipants;
      let userInstance = false;
      var replyAllPeople = "";
      // console.log("allPeopleArray: ", allPeopleArray);
      for (let i = 0; i < allPeopleArray.length; i++) { // loops through all involved email aliases and excludes the current user
        if (allPeopleArray[i].includes(this.$store.state.userEmail) && !userInstance) {
          userInstance = true;
          continue;
        }
        replyAllPeople += allPeopleArray[i];
        
        if (allPeopleArray.length-1 != i) {
          replyAllPeople += ", ";
        }
      }
      this.allReplyRecipients = replyAllPeople;
      // console.log("lastMessageInThread", this.messages[this.messages.length -1]);
      this.finalMessageBody = this.messages[this.messages.length -1].body;
    },
    trash() {
      trashEmailThread(this.messages[0].threadId);
    },
    markThreadAsUnread() {
      markEmailAsUnread(this.messages[0].threadId);
    },
    ifGroupMessage() {
      let to = this.messages[0].to;
      //console.log(to);
      var theClass = 'not-group-message';
      //console.log(message.unread);
      if(to.includes(",")){
          theClass = 'group-message';
      }
      return theClass;
    }, 
    draftSetup() { //This is not reached anymore
      console.log("Is this still reached?");
    },
    expiryHelp() {
      eventBus.$emit("SELF_DESTRUCT_HELP");
    },
    encryptionHelp() {
      eventBus.$emit("ENCRYPTION_HELP");
    },



    // uploader start
    reset() {
      // reset form to initial stater
      this.currentStatus = 'STATUS_INITIAL';
      this.uploadedFiles = [];
      this.uploadError = null;
      this.hasAttachments = false;
    },
    save(formData) { //might be out of the scope of our client
      //upload data
      this.currentStatus = 'STATUS_SAVING';
      upload(formData)
        .then(this.waitForUpload(2500)) //wait for uploads to reslove
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
    toggleUploading() {
      this.uploading = !this.uploading;
    },
    waitForUpload(miliseconds) {
      return (x) => {
        return new Promise(resolve => setTimeout(() => resolve(x), miliseconds));
      };
    },
    //uploader finish
    domainChecking() {
      var registeredRecipient = (this.recipient.includes("@2040mail.com") || this.recipient.includes("@2040Mail.com"));
      if (!registeredRecipient) {
        console.log("registeredRecipient: ", registeredRecipient);
        eventBus.$emit("SWAP_SECURITY", {rightDomain: registeredRecipient});
      }
    },
    setExpiryTime(timeValue, timeUnit) {
      const time = this.$options.filters.formatTimeUnit(timeValue, timeUnit);
      // this.$refs.dropdown.isHidden = true;
      this.text = `This message will self-destruct in ${time}`;
      this.getExpiryUnixTime(timeValue, timeUnit);
    },
    getExpiryUnixTime(timeValue, timeUnit) {
      const date = new Date();

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
      var currentTime = moment().unix();
      console.log("CurrentTime: ", currentTime);
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
    },
  },
  mounted() {
    this.reset();
  },
  created() {
    this.getMessages();
    eventBus.$on('TRASHING_THREAD', this.trash);
    eventBus.$on('ENTER_DRAFT', this.draftSetup);
    eventBus.$on('MARK_THREAD_AS_UNREAD', this.markThreadAsUnread);
    eventBus.$on("COMPOSE_SECURITY", payload => {
      this.hasPassword = payload.hasPassword;
      this.isEncrypted = payload.isEncrypted;
    });
    eventBus.$on("SET_EXPIRY_TIME", payload => {
      this.messageExpiryUnixTime = payload.unixTime;
      this.baseTime = payload.currentTime;
    });
    this.domainChecking();
    
  },
  beforeDestroy() {
    eventBus.$off('TRASHING_THREAD', this.trash);
    eventBus.$off('MARK_THREAD_AS_UNREAD', this.markThreadAsUnread)
  },
}
</script>

<style scoped>
.dropDownArea{
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
  z-index: 999;
  background:  dimgray;
}
.quill {
  align-content: center;
  padding-left: -10px;
}
.quill-spacing {
  padding-bottom: 20px;
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
}
.sendBar {
  text-align: left;
  align-content: left;
  cursor: pointer;
}
.recipients {
  font-size: .75em;
  text-align: left;
  align-content: left;
  width: 100%;
  overflow:hidden;
  /* padding-left: 100px; */
  margin-left: 10px;
  
}
/* styling for the image uploader */
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; 
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 40; /* invisible but it's there! */
  width: 100%;
  min-height: 200px;
  /* margin-left: -495px; 
  margin-top: -10px; */
  /* position: absolute; */
  text-align: left;
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

.topBar {
  display: flex;
  flex-wrap: nowrap;
  height: 25px;
  border: 1px black;
}
.securityDropDown {
  position:relative;
  text-align: left;
  width: 250px;
  border: 1px black;
}
.help {
  cursor: pointer;
  /* margin-left: 5px; */
}
.icon {
  cursor: pointer;
  margin-right: 35px;
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
.full {
  width: 100%;
  border: none;
  outline: none;
  overflow: hidden;
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
.full2 {
  width: 100%;
  border: none;
  outline: none;
  overflow: hidden;
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
.comboBoxShell {
  margin-left: auto;
  /* width: 100%; */
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
}
.comboBox {
  float: none;
  margin-left: auto;  
  margin-top: -30px;
  position: absolute;
  left: 600px;
  /* bottom: 30px; */
  width: 98px;
  height: 30px;
  /* margin-right: 4px; */
}
.toggleButtons {
  text-align: right;
  /* margin-top: -30px; */
  margin-left: auto !important;
}

</style>