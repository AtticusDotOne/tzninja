<template>
  <div>
    <table>
      <tr><td>My Timezone</td><td>{{ tz }}</td></tr>
      <tr><td>Local Time</td><td>{{ now }}</td></tr>
      <tr><td>New York</td><td>{{ getOtherTime('America/New_York') }}</td></tr>
      <tr><td>London</td><td>{{ getOtherTime('Europe/London') }}</td></tr>
      <tr><td>Tokyo</td><td>{{ getOtherTime('Asia/Tokyo') }}</td></tr>
      <tr><td>
        <select @change="onSelect($event)">
          <option value="" default>GMT</option>
          <option v-for="tz in this.$store.state.timezones.list" :key="tz.id" :value="tz.tz">{{tz.tz}}</option>
      </select></td><td>{{ getOtherTime(selected) }}</td></tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  data() {
    return {
      tz: moment.tz.guess(),
      now: new Date(),
      selected: ""
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('timezones/LOAD')
  },
  created () {
    setInterval(() => this.now = new Date, 1000)
  },
  methods: {
    getOtherTime(tz) {
      return moment.tz(this.now, tz)
    },
    onSelect(event) {
      this.selected = event.target.value
    }
  }
}
</script>
