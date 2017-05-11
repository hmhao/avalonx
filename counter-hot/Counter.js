let template = `
  <div>
    Value: {{ count }}
    <button :click="increment">+</button>
    <button :click="decrement">-</button>
    <button :click="incrementIfOdd">Increment if odd</button>
    <button :click="incrementAsync">Increment async</button>
    <div>
      <div>Recent History (last 5 entries): {{ recentHistory }}</div>
    </div>
  </div>
`

import { mapGetters, mapActions } from 'avalonx'

export default {
  template,
  computed: mapGetters([
    'count',
    'recentHistory'
  ]),
  methods: mapActions([
    'increment',
    'decrement',
    'incrementIfOdd',
    'incrementAsync'
  ])
}
