
/* eslint-disable */
<template>
  <div id="setWidth">
    <b-tabs>
      <b-tab icon='inbox' title="Primary (personal)">
        <email-list labelId="CATEGORY_PERSONAL"/>
      </b-tab>
      <b-tab title="Social">
        <email-list labelId="CATEGORY_SOCIAL"/>
      </b-tab>

      <b-tab title="Promotions" >
        <email-list labelId="CATEGORY_PROMOTIONS"/>      
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
      let promoMessages = this.$store.getters.getLabelMessages["CATEGORY_PROMOTIONS"];
      if(promoMessages === undefined){
        this.$store.dispatch("getListOfMessages", "CATEGORY_PROMOTIONS");
      }
      let socialMessages = this.$store.getters.getLabelMessages["CATEGORY_SOCIAL"];
      if(socialMessages === undefined){
        this.$store.dispatch("getListOfMessages", "CATEGORY_SOCIAL");
      }
      let personalMessages = this.$store.getters.getLabelMessages["CATEGORY_PERSONAL"];
      if(personalMessages === undefined){
        this.$store.dispatch("getListOfMessages", "CATEGORY_PERSONAL");
      }
  },
}
</script>