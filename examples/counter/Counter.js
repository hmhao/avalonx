let template = `
  <div id="app">
    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.
    <button :click="increment">+</button>
    <button :click="decrement">-</button>
    <button :click="incrementIfOdd">Increment if odd</button>
    <button :click="incrementAsync">Increment async</button>
  </div>
`

import { mapGetters, mapActions } from 'avalonx'

export default {
  template,
  computed: mapGetters([
    'evenOrOdd'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
