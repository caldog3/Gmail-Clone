<template>
  <div class="body">
    <label class="container">Check All
        <input type="checkbox">
        <span class="checkmark"></span>
    </label>
    <font-awesome-icon icon="angle-down" size="lg"/>
    <!-- <h5>More Items here</h5> -->
  </div>
</template>

<style scoped>
.container {
    display: block;
    cursor: pointer;
    font-size: 22px;
    background-color: azure;
    width: 100px;
}
.body {
    background-color:rgb(98, 181, 184);
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
