<template>
  <div>
    <table>
      <tr><td>My Timezone</td><td>{{ tz }}</td></tr>
      <tr><td>Local Time</td><td>{{ now }}</td></tr>
      <tr><td>New York</td><td>{{ getOtherTime('America/New_York') }}</td></tr>
      <tr><td>London</td><td>{{ getOtherTime('Europe/London') }}</td></tr>
      <tr><td>Tokyo</td><td>{{ getOtherTime('Asia/Tokyo') }}</td></tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  data() {
    return {
      tz: moment.tz.guess(),
      now: new Date()
    }
  },
  created () {
    setInterval(() => this.now = new Date, 1000)
  },
  methods: {
    getOtherTime(tz) {
      return moment.tz(this.now, tz)
    }
  }
}
</script>
