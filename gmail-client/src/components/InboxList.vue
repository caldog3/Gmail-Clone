
/* eslint-disable */
<template>
  <div id="setWidth">
    <b-tabs>
      <b-tab icon='inbox' title="Primary">
        <email-list labelId="CATEGORY_PRIMARY"/>
      </b-tab>
      <b-tab title="Social">
        <email-list labelId="CATEGORY_SOCIAL"/>
      </b-tab>
      <b-tab title="Promotions">
        <email-list labelId="CATEGORY_PROMOTIONS"/>      
      </b-tab>
    </b-tabs>
  </div>
</template>

<style scoped>
/* #setWidth {
  min-width: 400px;
  overflow: hidden;
} */

.nav {
  flex-wrap: nowrap;
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
  }
}
</script>