import Avalonx from 'avalonx'
import { state, mutations } from './mutations'
import plugins from './plugins'

export default new Avalonx.Store({
  state,
  mutations,
  plugins
})
