// Name of this file is subject to chage
<template>
  <thread-list :labelId="getFolder()"/>
</template>

<style scoped>
ul > .nav {
  display: flex;
  flex-wrap: nowrap !important;
}
</style>

<script>
import ThreadList from './ThreadList';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'FolderEmailList',
  components: {
    ThreadList,
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
      console.log("getting folder: " + folder);
      return folder;
    },
  },
}
</script>