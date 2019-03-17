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
  async LOAD({ commit }) {
    const { data } = await axios.get(process.env.JSON_SERVER + '/timezones')
    commit('set', data)
  }
}
