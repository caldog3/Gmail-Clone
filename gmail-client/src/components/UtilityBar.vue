<template>
  <div class="body">
    <input type="checkbox">
    Utility bar. To be filled
    <!-- <font-awesome-icon icon="angle-down" size="lg"/> -->
  </div>
</template>

<style scoped>
.body {
  background-color:white;
  height: 40px;
  border-bottom: 1px;
  border-bottom-style: solid;
  border-bottom-color: #d3d3d3;
} 
input {
  float: left;
}
</style>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'UtilityBar',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
