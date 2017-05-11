import avalon from '../avalon.extend.js'
import App from './components/App.js'
import store from './store'
import { currency } from './currency'

avalon.filters['currency'] = currency

avalon.bootstrap({
  el: '#app',
  component: App
})