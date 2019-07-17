<template>
  <div id="app">
    <!-- LOG-IN SCREEN -->
    <div class="notLoggedIn" v-if="!loading">
      <login-page/>
    </div>

    <!-- OUR ACTUAL EMAIL -->
    <div class="loggedIn" v-else-if="loading">

      <!-- start of modal -->
      <script type="text/x-template" id="modal-template">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">

                <div class="modal-header">
                  <slot name="header">
                    default header
                  </slot>
                </div>

                <div class="modal-body">
                  <slot name="body">
                    default body
                  </slot>
                </div>

                <div class="modal-footer">
                  <slot name="footer">
                    
                    <button class="modal-default-button" @click="$emit('close')">
                      All done!
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </script>

      <!-- app -->
      <div id="app">
        <!-- <button id="show-modal" @click="showModal = true">Show Modal</button> -->
        <!-- use the modal component, pass in the prop -->
        <modal v-if="showModal" @close="showModal = false">
          <h3 slot="header">Privacy Features Intro</h3>
          <onboard-carousel slot="body"/>
        </modal>
        <modal v-if="showExpiryHelpModal" @close="showExpiryHelpModal=false">
          <h3 slot="header"> Help - Self-Destructing Messages</h3>
          <!-- maybe make a component for the helps -->
          <div class="helpModal" slot="body">
            &emsp;Self-destructing messages allow you to choose how long you want an email to be accessible. 
            The timer starts counting once you **send** the message, not once it's been read. This means 
            you should either set it long enough to give your contact time to read the message, or be 
            ready to resend the message, if necessary.
          </div>
        </modal>
        <modal v-if="showEncryptionHelpModal" @close="showEncryptionHelpModal=false">
          <h3 slot="header"> Help - Encrypting Messages</h3>
          <!-- maybe make a component for the helps -->
          <div class="helpModal" slot="body">
            &emsp;When sending an email to someone using the same email service, encryption will be enabled 
            by default, but can be disabled by selecting "Non-encrypted" from the dropdown.
            <br>
            &emsp;If you would like to encrypt an email to someone who is not on the same email service, you can select 
            password-based encryption from the dropdown. If you choose this option, you will have to communicate this 
            password to your contact because they will be unable to read your message without it.
          </div>
        </modal>
      </div>
      <!-- end of modal -->

      <div id="header" ref="appHeader"><app-header/></div>

      <div class="sideBar"><message-sidebar/></div>

      <div class="mainView">
        <utility-bar/>
        <div class="emailList" :style="emailListHeight">
          <router-view/>
          <!-- <div class="termsUnderneath">
             <br><br>
            <p>
              <a href="https://policies.google.com/terms" rel="noopener noreferrer" target="_blank">Terms</a> 
              - 
              <a href="https://policies.google.com/privacy" rel="noopener noreferrer" target="_blank">Privacy</a> 
              - 
              <a href="https://www.google.com/gmail/about/policy/" rel="noopener noreferrer" target="_blank">Program Policies</a>
            </p>
            
          </div> -->
        </div>
      </div>

      <Compose/>
      

    </div>

    <!-- LOADING SCREEN - NOTE: has to be here because of v-else-if evaluation order -->
    <div class="loadingScreen" v-else-if="loggedIn && triggerLoading">
      <loading-screen/>
    </div>


  </div>
</template>

<script>
import Vue from "vue";
import eventBus from "./event_bus";
import OnboardCarousel from "./components/OnboardCarousel";
import Compose from "./components/Compose";
import AppHeader from "./components/AppHeader";
import MessageSidebar from "./components/MessageSidebar";
import UtilityBar from "./components/UtilityBar";
import LoginPage from "./components/LoginPage";
import LoadingScreen from "./components/LoadingScreen";
import { setInterval, clearInterval } from 'timers';
import { Carousel, Slide } from 'vue-carousel';

//registers the modal component
Vue.component('modal', {
  template: '#modal-template'
})

export default {
  name: "App",
  data() {
    return {
      emailListHeight: {},
      initialHeightCalculated: false,
      loading: false,
      showModal: false,
      showExpiryHelpModal: false,
      showEncryptionHelpModal: false,
      tutorialUser: false,
    };
  },
  components: {
    AppHeader,
    MessageSidebar,
    UtilityBar,
    LoginPage,
    Compose,
    LoadingScreen,
    OnboardCarousel,
    Carousel,
    Slide
  },
  computed: {
    loggedIn: function() {
      return this.$store.getters.loggedIn;
    },
    triggerLoading: function() {
      this.loaded(false);
      return true;
    }
  },
  methods: {
    setEmailListHeight() {
      let verticalPadding = 40;
      if (this.$refs.appHeader !== undefined) {
        let height =
          window.innerHeight -
          this.$refs.appHeader.clientHeight -
          verticalPadding;
        Vue.set(this.emailListHeight, "height", `${height}px`);

        if (!this.initialHeightCalculated){
          this.initialHeightCalculated = true;
        }
      }
    },
    loaded(ourBool) {
      let returnVal = ourBool;
      this.updateLoading();
      return returnVal;
    },
    updateLoading() {
      if (this.loading === false) {
        eventBus.$on('DATA_FETCHING_COMPLETE', () => {
          this.loading = true;
          this.loaded(true);
        });
      }
    },
    toggleModal() {
      if (this.tutorialUser) {
        this.showModal = true;
      }
    },
    helpExpiryToggle() {
      this.showExpiryHelpModal = true;
    },
    helpEncryptionToggle() {
      this.showEncryptionHelpModal = true;
    },
    toggleTutorialUser() {
      this.tutorialUser = !this.tutorialUser;
    }
  },
  beforeUpdate() {
    if (!this.initialHeightCalculated){
      this.setEmailListHeight();
    }

    this.$nextTick(function() {
      window.addEventListener("resize", this.setEmailListHeight);
    });
  },
  mounted() {
    this.updateLoading();
    const appHeaderTimer = setInterval(()=>{
      if (this.$refs.appHeader !== undefined){
        this.setEmailListHeight();
        clearInterval(appHeaderTimer);
      }
    }, 1000);
    eventBus.$on("RESET_APP_STATE", ()=>{
      this.loading = false
    })
  },
  created() {
    eventBus.$on("SHOW_INTRO_MODAL", this.toggleModal);
    eventBus.$on("SELF_DESTRUCT_HELP", this.helpExpiryToggle);
    eventBus.$on("ENCRYPTION_HELP", this.helpEncryptionToggle);
    eventBus.$on("TOGGLE_TUTORIAL_USER", this.toggleTutorialUser);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  height: 100%;
  top: 0;
  bottom: 0;
}
#header {
  height: 91px;
}
body {
  overflow: hidden;
}
.loggedIn {
  background-image: url(assets/basic-white-bg.jpg);
  box-shadow: inset 0 0 0 1000px rgba(0,0,0,.25);
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  /* position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0; */
  /* z-index: -3;
  position: relative; */
}
.sideBar {
  min-width: 270px;
  height: 860px;
  float: left;
  position: relative;
  z-index: 4;
}
.emailList {
  overflow-y: auto;
  padding-right: 5px;
  padding-bottom: 60px;
}
.termsUnderneath {
  color: white;
}
.notLoggedIn {
  height: 100%;
}
.mainView {
  margin-right: 50px;
  min-width: 770px;
}

/* Scroll Bar for EmailList */
/* width */
.emailList::-webkit-scrollbar {
  width: 12px;
}
/* Track */
.emailList::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
/* Handle */
.emailList::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
}
/* Handle on hover */
.emailList::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Scroll Bar for SideBar */
/* width */
.optionsA::-webkit-scrollbar {
  width: 6px;
}
/* Track */
.optionsA::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
/* Handle */
.optionsA::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5);
}
/* Handle on hover */
.optionsA::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Scroll Bar for Compose Window */
/* width */
/* .composeWindow::-webkit-scrollbar {
  width: 6px;
} */
/* Track */
.composeWindow::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
/* Handle */
.composeWindow::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.5); 
}
/* Handle on hover */
.composeWindow::-webkit-scrollbar-thumb:hover {
 background: rgba(255, 255, 255, 0.9);
}


.termsUnderneath a:link {
  text-decoration: none;
  color: white;
}
.termsUnderneath a:visited {
  text-decoration: none;
  color: white;
}
.termsUnderneath a:hover {
  text-decoration: none;
  color: white;
}
.termsUnderneath a:active {
  text-decoration: none;
  color: white;
}

/* Modal for onboarding */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  min-width: 500px;
  max-width: 900px;
  max-height: 600px;  
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: scroll;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
/* end modal onboarding */
.helpModal {
  text-align: left;
  line-height: 2em;
}

</style>