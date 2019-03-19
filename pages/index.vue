<template>
    <div>
        <p>Team:</p>
        <select @change="onTeamSelect($event)">
            <option value default>[select a team]</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>
        <div v-if="myteam !== {}">
            <table>
                <tr v-for="(userId, index) in this.myteam.members" :key="index">
                    <td>{{ users[userId - 1].name }}</td>
                    <td>{{ showCity(users[userId - 1].tz) }}</td>
                    <td>{{ getOtherDate(users[userId - 1].tz) }}</td>
                    <td>
                        <time>{{ getOtherTime(users[userId - 1].tz) }}</time>
                    </td>
                </tr>
            </table>
        </div>
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
            selected: '',
            myteam: {},
            teams: this.$store.state.teams.list,
            users: this.$store.state.users.list
        }
    },
    async fetch({ store, params }) {
        await store.dispatch('timezones/LOAD')
        await store.dispatch('teams/LOAD', 1)
        await store.dispatch('users/LOAD')
    },
    created() {
        setInterval(() => (this.now = new Date()), 1000)
    },
    methods: {
        getOtherDate(tz) {
            return moment.tz(this.now, tz).format('YYYY-MM-DD dddd')
        },
        getOtherTime(tz) {
            return moment.tz(this.now, tz).format('hh:mm:ss A')
        },
        onTeamSelect(event) {
            this.myteam = this.$store.state.teams.list[
                parseInt(event.target.value) - 1
            ]
        },
        showCity(tz) {
            return tz
                .split('/')
                .pop()
                .replace('_', ' ')
        }
    }
}
</script>
<style>
td {
    padding: 0.5rem 0.75rem;
    border-top: 0.05rem dotted hsla(0, 0%, 80%, 1);
    font-size: 1.2rem;
}
td time {
    font-family: monospace;
}
</style>