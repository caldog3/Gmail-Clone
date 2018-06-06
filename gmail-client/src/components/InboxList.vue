/* eslint-disable */
<template>
  <div>
    <b-tabs>
      <b-tab title="Primary">
        <email-list labelId="INBOX"/>
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
</style>

<script>
import EmailList from './EmailList';

export default {
  name: 'InboxList',
  components: {
    EmailList
  }
}
</script>