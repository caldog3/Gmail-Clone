// Name of this file is subject to chage


/* eslint-disable */
<template>
  <div id="setWidth">
    <!-- <email-list :labelId="labelId"> -->
    <email-list :labelId="this.other"/>

  </div>
</template>

<style scoped>
#setWidth {
  background: rgba(255, 255, 255, 0.6);
}
ul > .nav {
  display: flex;
  flex-wrap: nowrap !important;
}
</style>

<script>
import eventBus from '../event_bus'
import EmailList from './EmailList';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'InboxList',
  components: {
    EmailList,
    FontAwesomeIcon
  },
  data() {
    return {
      labelId: '',
      other: '',
    }
  },
  created(){
    eventBus.$on("FOLDER_EMAIL_LIST", folder => {
      this.other = folder;
      console.log("arriving?" + this.other);
    });
    // let draftMessages = this.$store.getters.getLabelMessages["DRAFT"];
    // if(draftMessages === undefined){
    //   this.$store.dispatch("getFolderListOfMessages", "DRAFT");
    // }
  },
}
</script>