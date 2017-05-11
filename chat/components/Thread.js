let template = `
  <li
    class="thread-list-item"
    :class="{ active: active }"
    :click="emit(thread.id)">
    <h5 class="thread-name">{{ thread.name }}</h5>
    <div class="thread-time">
      {{ thread.lastMessage.timestamp | time }}
    </div>
    <div class="thread-last-message">
      {{ thread.lastMessage.text }}
    </div>
  </li>
`

export default {
  name: 'thread',
  template,
  props: {
    thread: {},
    active: false
  },
  methods: {
    emit (id) {
      this.switchThread && this.switchThread(id)
    }
  },
  events: ['switchThread']
}
