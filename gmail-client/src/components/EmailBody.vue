/* eslint-disable */
<template>
  <div>
    <h1>Email Body</h1>
    <p>{{ body }}</p>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: 'EmailBody',
  props: ['body']
}
</script>