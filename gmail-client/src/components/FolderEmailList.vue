// Name of this file is subject to chage


/* eslint-disable */
<template>
  <div id="setWidth">
      <email-list :labelId="labelId">
    <b-tabs>
      <b-tab icon='inbox' title="Primary">
        <email-list labelId="PRIMARY"/>
      </b-tab>
      <b-tab title="Social">
        <email-list labelId="SOCIAL"/>
      </b-tab>

      <b-tab title="Promotions" >
        <email-list labelId="PROMOTIONS"/>      
      </b-tab>
    </b-tabs>
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
    //MOVED TO LoadingScreen.vue Created
  },
}
</script>