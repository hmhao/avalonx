import avalon from '../avalon.extend.js'
import store from './store'
import Counter from './Counter.js'

avalon.bootstrap({
  el: '#app',
  component: Counter
})