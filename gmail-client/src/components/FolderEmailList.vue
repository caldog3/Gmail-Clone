// Name of this file is subject to chage


/* eslint-disable */
<template>
  <div id="setWidth">
    <!-- <email-list :labelId="labelId"> -->
    <email-list labelId="DRAFT"/>

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
      labelId: 'starred',

    }
  },
  beforeCreate(){
    let personalMessages = this.$store.getters.getLabelMessages["DRAFT"];
    if(personalMessages.length === 0){
      this.$store.dispatch("getFolderListOfMessages", "DRAFT");
    }
  },
}
</script>