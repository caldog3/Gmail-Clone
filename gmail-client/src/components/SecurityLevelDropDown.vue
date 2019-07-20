/*This is here for the meantime */
<template>
  <dropdown ref="dropdown">
    <template slot="btn">
      <small v-bind:class="passwordTextClass()">
        <font-awesome-icon style="color:black;" class="Icon" icon="lock" v-if="lockActive" />
        {{selection}}
        <font-awesome-icon style="color:black;" class="Icon" icon="caret-down" />
      </small>
    </template>
    <template slot="body" v-if="rightDomain">
      <div class="listedItems" @click="setSecurity('encryption')"> 
        <font-awesome-icon style="color:black;" class="Icon" icon="lock" />
        Encryption
      </div>
    </template>
    <template slot="body" v-if="!rightDomain">
      <div class="listedItems" @click="setSecurity('password')">
        <font-awesome-icon style="color:black;" class="Icon" icon="lock" />
        Password Protection
      </div>
    </template>
    <template slot="body">
      <div class="listedItems" @click="setSecurity('noSecurity')"> No Encryption </div>
    </template>
  </dropdown>

</template>

<script>
import Dropdown from "bp-vuejs-dropdown";
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import eventBus from '../event_bus.js';

export default {
  name: "SecurityLevelDropDown",
  components: {
    Dropdown,
    FontAwesomeIcon,
  },
  data() {
    return {
      selection: "Non-Encrypted",
      lockActive: false,
      hasPassword: false,
      isEncrypted: false,
      rightDomain: true,
    };
  },
  methods: {
    setSecurity(option) {
      console.log("setting security");
      if (option === "password") {
        this.selection = "Password";
        this.lockActive = true;
        this.hasPassword = true;
        this.isEncrypted = false;
      }
      else if (option === "encryption") {
        this.selection = "Encrypted";
        this.lockActive = true;
        this.hasPassword = false;
        this.isEncrypted = true;
      }
      else if (option === "noSecurity") {
        this.selection = "Non-Encrypted"
        this.lockActive = false;
        this.hasPassword = false;
        this.isEncrypted = false;
      }
      eventBus.$emit("COMPOSE_SECURITY", {hasPassword: this.hasPassword, isEncrypted: this.isEncrypted});
      this.$refs.dropdown.isHidden = true;
    },
    preSetSecurity() {
      this.setSecurity("noSecurity");
    },
    passwordTextClass() {
      let passwordClass = "passwordText";
      // passwordClass = "threadPasswordText";
      return passwordClass;
    },
  },
  created() {
    eventBus.$on("SWAP_SECURITY", payload => {
      this.rightDomain = payload.rightDomain;
      console.log("dropdown getting the domain", this.rightDomain);
      if (this.lockActive) {
        console.log("actively swapping");
        if (this.rightDomain) {
          this.selection = "Encrypted";
          this.hasPassword = false;
          this.isEncrypted = true;
        }
        else {
          this.selection = "Password";
          this.hasPassword = true;
          this.isEncrypted = false;
        }
        eventBus.$emit("COMPOSE_SECURITY", {hasPassword: this.hasPassword, isEncrypted: this.isEncrypted});
        return;
      }
      else {
        if (this.rightDomain) {
          console.log("hitting this");
          this.selection = "Encrypted";
          this.hasPassword = false;
          this.isEncrypted = true;
        }
        else {
          console.log("Getting used"); 
          this.selection = "Non-Encrypted";
          this.hasPassword = false;
          this.isEncrypted = false;
        }
        eventBus.$emit("COMPOSE_SECURITY", {hasPassword: this.hasPassword, isEncrypted: this.isEncrypted});
      }
    });
    // eventBus.$on("RESET_SECURITY", this.preSetSecurity);
  },
};
</script>

<style>
.passwordText {
  color: black;
  font-size: 1em;
}
.threadPasswordText {
  color: black;
  font-size: .8em;
}
.listedItems:hover{
  background-color: rgb(168, 168, 168);
  cursor: pointer;
}
/* .bp-dropdown__btn--active {
  background-color: #404040 !important;
}
.bp-dropdown__btn {
  border: 1px solid #404040 !important;
  padding: 0px 0px !important;
  color: white;
}
.bp-dropdown--sub:hover {
  background-color: rgb(168, 168, 168);
}
.bp-dropdown__body {
  min-width: 120px !important;
}
.smallHover:hover {
  background-color: rgb(168, 168, 168);
  color: white;
} */
</style>