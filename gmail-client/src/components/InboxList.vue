
/* eslint-disable */
<template>
  <div id="setWidth">
    <b-tabs>
      <b-tab icon='inbox' title="Primary">
        <email-list labelId="PRIMARY"/>
      </b-tab>
      <b-tab title="Social">
        <delay :wait="5000">
          <email-list labelId="SOCIAL"/>
        </delay>
      </b-tab>

      <b-tab title="Promotions" >
        <delay :wait="5000">
          <email-list labelId="PROMOTIONS"/> 
        </delay>
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
      labelId: '',
    }
  },
  beforeCreate(){
    //MOVED TO LoadingScreen.vue Created
  },
}
</script>