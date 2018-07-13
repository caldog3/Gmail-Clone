// Name of this file is subject to chage


/* eslint-disable */
<template>
  <div id="setWidth">
    <!-- <email-list :labelId="labelId"> -->
    <email-list :labelId="getFolder()"/>

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
    }
  },
  methods: {
    getFolder() {
      let folder = this.$store.state.currentFolder;
      return folder;
    },
  },
  created(){
    // let draftMessages = this.$store.getters.getLabelMessages["DRAFT"];
    // if(draftMessages === undefined){
    //   this.$store.dispatch("getFolderListOfMessages", "DRAFT");
    // }
  },
}
</script>