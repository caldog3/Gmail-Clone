/*This is here for the meantime */
<template>
  <dropdown ref="dropdown">
    <template slot="btn">{{text}}</template>
    <template slot="body">
      <dropdown :trigger="'click'" :role="'sublist'" :align="'right'">
        <template slot="btn">Minutes</template>
        <template slot="body">
          <div
            v-for="minute in minutes"
            :key="minute"
            @click="setExpiryTime(minute, 'minute')"
          >{{minute | formatTimeUnit('Minute')}}</div>
        </template>
      </dropdown>

      <dropdown :trigger="'click'" :role="'sublist'" :align="'right'">
        <template slot="btn">Hours</template>
        <template slot="body">
          <div
            v-for="hour in hours"
            :key="hour"
            @click="setExpiryTime(hour, 'hour')"
          >{{hour | formatTimeUnit('Hour')}}</div>
        </template>
      </dropdown>

      <dropdown :trigger="'click'" :role="'sublist'" :align="'right'">
        <template slot="btn">Days</template>
        <template slot="body">
          <div
            v-for="day in days"
            :key="day"
            @click="setExpiryTime(day, 'day')"
          >{{day | formatTimeUnit('Day')}}</div>
        </template>
      </dropdown>
    </template>
  </dropdown>
</template>

<script>
import Dropdown from "bp-vuejs-dropdown";
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
      text: "Set Expiring Message",
      minutes: [1, 2, 4, 5, 10, 15, 20, 30, 45],
      hours: [1, 2, 4, 6, 12, 18],
      days: [1, 2, 3, 4, 5, 6, 7, 10, 14, 20, 21, 28]
    };
  },
  methods: {
    setExpiryTime(timeValue, timeUnit) {
      const time = this.$options.filters.formatTimeUnit(timeValue, timeUnit);
      this.$refs.dropdown.isHidden = true;
      this.text = `This message will expire in ${time}`;
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

      const unixTime = moment(date).unix();
    }
  }
};
</script>
