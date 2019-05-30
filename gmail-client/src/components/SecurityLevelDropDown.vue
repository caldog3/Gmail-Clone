/*This is here for the meantime */
<template>
  <dropdown>
    <template slot="btn">
      <small class="passwordText">
        <font-awesome-icon style="color:black;" class="Icon" icon="lock" v-if="lockActive" />
        {{selection}}
      </small>
    </template>
    <template slot="body">
      <div class="listedItems" @click="setSecurity('encryption')"> 
        <font-awesome-icon style="color:black;" class="Icon" icon="lock" />
        Encryption
      </div>
    </template>
    <template slot="body" >
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

export default {
  name: "SecurityLevelDropDown",
  components: {
    Dropdown,
    FontAwesomeIcon
  },
  data() {
    return {
      selection: "No encryption",
      lockActive: false,
    };
  },
  methods: {
    setSecurity(option) {
      console.log("setting security");
      if (option === "password") {
        this.selection = "Password Protected";
        this.lockActive = true;
      }
      else if (option === "encryption") {
        this.selection = "Encrypted";
        this.lockActive = true;
      }
      else if (option === "noSecurity") {
        this.selection = "Non-Encrypted"
        this.lockActive = false;
      }
    },
  },
};
</script>

<style>
.passwordText {
  color: black;
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