import axios from 'axios'

export const state = () => ({
  list: []
})

export const getters = {
  all: state => {
    return state.list
  }
}

export const mutations = {
  set(state, data) {
    state.list = data
  }
}

export const actions = {
  async LOAD({ commit }, userId) {
    const { data } = await axios.get(process.env.JSON_SERVER + '/teams')
    commit('set', data.filter(x => x.members.includes(userId)))
  }
}
