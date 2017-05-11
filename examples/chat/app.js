import avalon from '../avalon.extend.js'
import App from './components/App.js'
import store from './store'
import { getAllMessages } from './store/actions'

avalon.filters['time'] = timestamp => {
  return new Date(timestamp).toLocaleTimeString()
}

avalon.bootstrap({
  el: '#app',
  component: App
})

getAllMessages(store)
