<template>
 <div>
     <div class="notExpanded" v-if="notExpanded"  v-on:click="expand()"> <!--need a way to check if it is the second to last email in list -->
        <div class="flexboxSubject">
          <div class="leftAlign">
            <hr>
            <b>{{message.from}}</b>
          </div>
          <div class="rightAlign shift-down">
            <div class="flexRight">
              <span>{{message.time}} ({{timeAgo}} ago)</span>
              <!-- need to fix the styling here FIXME -->
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
        <div class="overflow">
          <!-- maybe doing this?... -->
          <!-- {{message.plainBody}} -->
          <!-- need some better styling to hide overflow...maybe just use the snippet-->
          <!-- <div v-html="message.body" class="leftAlign overflow"></div> -->
          <div v-html="message.snippet"></div>
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
                {{message.time}} ({{ timeAgo }} ago)
              </div>
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
              <div>
                <font-awesome-icon class="Icon" icon="reply" />
              </div>
              <div>
                <font-awesome-icon class="Icon" icon="ellipsis-v" />
              </div>
          </div>
        </div>
      </div>
      

      <div class="leftAlign recipients">
        <p>to {{message.to | getFirstNames}}</p>
      </div>
      <!-- here's the body; need to break the body into 2 pieces -->
      <div v-html="message.body" class="leftAlign"></div>

      <div v-if="attachments.length > 0" >
        <gallery :images="attachments" :index="index" @close="index = null"></gallery>
        <div
          class="image"
          v-for="(image, imageIndex) in attachments"
          :key="imageIndex"
          @click="index = imageIndex"
          :style="{ backgroundImage: 'url(' + image + ')', width: '300px', height: '210px' }"
        ></div>
      </div>
      </div>
 </div>
</template>

<script>
import { markAsStarred, unMarkAsStarred } from './../store-utility-files/gmail-api-calls';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import VueGallery from 'vue-gallery';

export default {
  name: 'ThreadBody',
  props: ['message'],
  components: {
    FontAwesomeIcon,
    'gallery': VueGallery
  },
  data() {
    return {
      timeAgo: "1 hour",
      notExpanded: false,
    //   attachments: [],
      index: null,
    };
  },
  filters: {
    getFirstNames(users) {
      if (!users) {
        return '';
      }
      const usersArray = users.split(",");
      return usersArray.map((person) => {
        if(person.charAt(0) === " " || person.charAt(0) === '\"'){
          const newPerson = person.substr(1);
          return newPerson.substr(0, newPerson.indexOf(" "));
        }
        return person.substr(0, person.indexOf(" "));
      }).toString();
    }
  },
  computed: {
    attachments(){
      const attachmentIds = this.$store.getters.getAttachments;
      return this.message.attachmentIds.map((id) => {
        return `data:${attachmentIds[id.attachmentId].mimeType};base64,${attachmentIds[id.attachmentId].data}`;
      });
    },
  },
  methods: {
    expand() {
      console.log("Expanding");
      this.notExpanded = false;
    },
    unexpand() {
      console.log("Collapsing");
      this.notExpanded = true;
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

@-moz-document url-prefix() {
  .theRestoftheTime {
    display: none;
  }
}
</style>


