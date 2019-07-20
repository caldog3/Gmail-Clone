/*This is here for the meantime */
<template>
  <dropdown ref="dropdown" :class-name="'dropdown'">
    <template slot="btn">
      <small class="lightText">{{text}}</small>
    </template>
    <template slot="body">
      <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'">
        <template slot="btn"><small>Minutes</small></template>
        <template slot="body">
          <div
            v-for="minute in minutes"
            :key="minute"
            @click="setExpiryTime(minute, 'minute')"
            class="smallHover"
          ><small>{{minute | formatTimeUnit('Minute')}}</small></div>
        </template>
      </dropdown>

      <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'">
        <template slot="btn"><small>Hours</small></template>
        <template slot="body">
          <div
            v-for="hour in hours"
            :key="hour"
            @click="setExpiryTime(hour, 'hour')"
            class="smallHover"
          ><small>{{hour | formatTimeUnit('Hour')}}</small></div>
        </template>
      </dropdown>

      <dropdown :trigger="'hover'" :role="'sublist'" :align="'right'">
        <template slot="btn"><small>Days</small></template>
        <template slot="body">
          <div
            v-for="day in days"
            :key="day"
            @click="setExpiryTime(day, 'day')"
            class="smallHover"
          ><small>{{day | formatTimeUnit('Day')}}</small></div>
        </template>
      </dropdown>
    </template>
  </dropdown>
</template>

<script>
import Dropdown from "bp-vuejs-dropdown";
import eventBus from './../event_bus';
import moment from "moment";

export default {
  name: "CustomDropDown",
  components: {
    Dropdown
  },
  filters: {
    formatTimeUnit(timeValue, timeUnit) {
      if (timeValue > 1) {
        timeUnit = timeUnit.concat("s");
      }
      return `${timeValue} ${timeUnit}`;
    }
  },
  data() {
    return {
      text: "Set Self-Destructing Message",
      minutes: [1, 2, 4, 5, 10, 15, 20, 30, 45],
      hours: [1, 2, 4, 6, 12, 18],
      days: [1, 2, 3, 4, 5, 6, 7, 10, 14, 20, 21, 28]
    };
  },
  methods: {
    setExpiryTime(timeValue, timeUnit) {
      const time = this.$options.filters.formatTimeUnit(timeValue, timeUnit);
      this.$refs.dropdown.isHidden = true;
      this.text = `This message will self-destruct in ${time}`;
      this.getExpiryUnixTime(timeValue, timeUnit);
    },
    getExpiryUnixTime(timeValue, timeUnit) {
      const date = new Date();

      switch (timeUnit) {
        case "minute":
          const minute = date.getMinutes();
          date.setMinutes(minute + timeValue);
          break;
        case "hour":
          const hour = date.getHours();
          date.setHours(hour + timeValue);
          break;
        case "day":
          const day = date.getDate();
          date.setDate(day + timeValue);
          break;
      }

      var unixTime = moment(date).unix();
      var currentTime = moment().unix();
      console.log("CurrentTime: ", currentTime);
      let payload;
      eventBus.$emit("SET_EXPIRY_TIME", payload = {unixTime: unixTime, currentTime: currentTime});
      console.log("Past the emission");
    }
  }
};
</script>

<style>
.lightText {
  color: white;
}
.bp-dropdown__btn--active {
  background-color: #404040 !important;
}
.bp-dropdown__btn {
  /* border: 1px solid #404040 !important; */
  border: none !important;
  padding: 0px 0px !important;
  color: white;
}
.bp-dropdown--sub:hover {
  background-color: rgb(168, 168, 168);
}
.bp-dropdown__body {
  min-width: 120px !important;
}
.smallHover:hover {
  background-color: rgb(168, 168, 168);
  color: white;
}
.dropdown {
  position: fixed;
  z-index: 999;
}
</style>