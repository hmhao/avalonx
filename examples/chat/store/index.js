import Avalonx from 'avalonx'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import createLogger from '../../../src/plugins/logger'

const state = {
  currentThreadID: '',
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  }
}

export default new Avalonx.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
