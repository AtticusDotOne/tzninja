<template>
  <div>
    <table>
      <tr><td>My Timezone</td><td>{{ tz }}</td></tr>
      <tr><td>Local Time</td><td>{{ now }}</td></tr>
      <tr><td>New York</td><td>{{ getOtherTime('America/New_York') }}</td></tr>
      <tr><td>London</td><td>{{ getOtherTime('Europe/London') }}</td></tr>
      <tr><td>Tokyo</td><td>{{ getOtherTime('Asia/Tokyo') }}</td></tr>
      <tr><td>
        <autocomplete @selected="onSelect($event)"
          :source="this.$store.state.timezones.list" />
        </td><td>{{ getOtherTime(selected) }}</td></tr>
    </table>
  </div>
</template>

<script>
import moment from 'moment-timezone'
import Autocomplete from 'vuejs-auto-complete'

export default {
  components: {
    Autocomplete
  },
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
      this.selected = event.display
    }
  }
}
</script>
