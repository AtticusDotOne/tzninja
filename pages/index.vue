<template>
  <div>
    {{ tz }}
  </div>
</template>

<script>
import moment from 'moment-timezone'

export default {
  data() {
    return {
      tz: moment.tz.guess()
    }
  }
}
</script>
